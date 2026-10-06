import random
from datetime import date, timedelta

from django.core.management.base import BaseCommand

from property.models import Property, Reservation
from useraccount.models import User


USERS = [
    ("ahmad@airbnb.com", "ahmad"),
    ("sara@airbnb.com", "sara"),
    ("omar@airbnb.com", "omar"),
    ("layla@airbnb.com", "layla"),
]

# Exactly the category values the frontend sends (components/Categories.tsx)
CATEGORIES = ["beach", "villas", "cabins", "tiny homes"]

# How each category looks inside a generated title.
CATEGORY_LABELS = {
    "beach": "Beach",
    "villas": "Villa",
    "cabins": "Cabin",
    "tiny homes": "Tiny Home",
}

LOCATIONS = [
    ("Palestine", "PS"), ("Jordan", "JO"), ("Lebanon", "LB"), ("Egypt", "EG"),
    ("Morocco", "MA"), ("Tunisia", "TN"), ("Turkey", "TR"), ("Greece", "GR"),
    ("Italy", "IT"), ("Spain", "ES"), ("France", "FR"), ("Portugal", "PT"),
    ("Germany", "DE"), ("Netherlands", "NL"), ("United Kingdom", "GB"),
    ("Ireland", "IE"), ("Iceland", "IS"), ("Norway", "NO"), ("Sweden", "SE"),
    ("Croatia", "HR"), ("Montenegro", "ME"), ("Albania", "AL"), ("Cyprus", "CY"),
    ("United States", "US"), ("Canada", "CA"), ("Mexico", "MX"), ("Brazil", "BR"),
    ("Argentina", "AR"), ("Chile", "CL"), ("Peru", "PE"), ("Colombia", "CO"),
    ("Japan", "JP"), ("South Korea", "KR"), ("Thailand", "TH"), ("Vietnam", "VN"),
    ("Indonesia", "ID"), ("Philippines", "PH"), ("Australia", "AU"),
    ("New Zealand", "NZ"), ("South Africa", "ZA"), ("Kenya", "KE"),
    ("Morocco", "MA"), ("Cape Verde", "CV"), ("Maldives", "MV"),
]

TITLE_WORDS = [
    "Sunny", "Cozy", "Modern", "Seaside", "Rustic", "Luxury", "Charming",
    "Minimalist", "Panoramic", "Private", "Garden", "Hillside", "Lakefront",
    "Desert", "Urban", "Countryside", "Oceanfront", "Historic", "Quiet", "Bright",
]

TITLE_SUFFIXES = [
    "Villa", "Cottage", "Retreat", "Loft", "Cabin", "Suite", "Bungalow",
    "Farmhouse", "Studio", "Residence", "Haven", "Nest", "Getaway",
]

DESCRIPTIONS = [
    "Escape to this beautiful place perfect for relaxing and exploring the surrounding area.",
    "A welcoming space with all modern amenities, ideal for families and long stays.",
    "Enjoy stunning views, quiet surroundings and easy access to local attractions.",
    "Recently renovated with a warm atmosphere, everything you need for a memorable trip.",
    "Charming and peaceful, with beautiful architecture and a private outdoor space.",
    "A great base for adventure, featuring comfortable rooms and excellent connectivity.",
]

# Placeholder images served from picsum.photos (https://picsum.photos/seed/<seed>/1024/768).
# Each seed string returns a stable image, so a property keeps the same picture on reload.
def seed_image(index):
    return f"https://picsum.photos/seed/airbnb-{index}/1024/768"


class Command(BaseCommand):
    help = "Seed the database with sample users, properties and reservations."

    def add_arguments(self, parser):
        parser.add_argument(
            "--properties",
            type=int,
            default=45,
            help="Number of properties to create (default: 45).",
        )
        parser.add_argument(
            "--reservations",
            type=int,
            default=20,
            help="Maximum number of reservations to create (default: 20).",
        )
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete all existing properties and reservations before seeding.",
        )

    def handle(self, *args, **options):
        random.seed()

        if options["reset"]:
            deleted_reservations = Reservation.objects.all().delete()[0]
            deleted_properties = Property.objects.all().delete()[0]
            self.stdout.write(
                self.style.WARNING(
                    f"Reset complete. Deleted {deleted_properties} properties "
                    f"and {deleted_reservations} reservations."
                )
            )

        users = []
        for index, (email, name) in enumerate(USERS):
            user, created = User.objects.get_or_create(
                email=email,
                defaults={"name": name},
            )
            if created:
                user.set_password("airbnb123")
                user.save()

            # Give every seeded user a profile picture if they don't have one yet.
            if not user.avatar.name:
                user.avatar = f"https://picsum.photos/seed/pfp-{index}/300/300"
                user.save()

            users.append(user)

        self.stdout.write(self.style.SUCCESS(f"Users ready: {len(users)}"))

        existing_titles = set(Property.objects.values_list("title", flat=True))
        created_count = 0

        for index in range(options["properties"]):
            country, country_code = random.choice(LOCATIONS)
            category = CATEGORIES[index % len(CATEGORIES)]
            title = f"{random.choice(TITLE_WORDS)} {CATEGORY_LABELS[category]} {random.choice(TITLE_SUFFIXES)}"

            if title in existing_titles:
                title = f"{title} {index + 1}"
            if Property.objects.filter(title=title).exists():
                continue

            property_obj = Property.objects.create(
                title=title,
                description=random.choice(DESCRIPTIONS),
                price_per_night=random.randint(35, 450),
                bedrooms=random.randint(1, 5),
                bathrooms=random.randint(1, 4),
                guests=random.randint(1, 10),
                country=country,
                country_code=country_code,
                category=category,
                image=seed_image(index),
                landlord=random.choice(users),
            )
            created_count += 1

        self.stdout.write(self.style.SUCCESS(f"Properties created: {created_count}"))

        all_properties = list(Property.objects.all())
        created_by_user = [u for u in users if u.properties.exists()]

        reservation_count = 0
        attempts = 0
        target = options["reservations"]

        while reservation_count < target and attempts < target * 10 and created_by_user:
            attempts += 1
            property_obj = random.choice(all_properties)
            guest = random.choice(created_by_user)

            start = date.today() + timedelta(days=random.randint(-60, 60))
            nights = random.randint(1, 10)
            end = start + timedelta(days=nights)

            if Reservation.objects.filter(
                property=property_obj,
                start_date__lte=end,
                end_date__gte=start,
            ).exists():
                continue

            Reservation.objects.create(
                property=property_obj,
                start_date=start,
                end_date=end,
                number_of_nights=nights,
                guests=random.randint(1, min(4, property_obj.guests)),
                total_price=float(property_obj.price_per_night * nights),
                created_by=guest,
            )
            reservation_count += 1

        self.stdout.write(self.style.SUCCESS(f"Reservations created: {reservation_count}"))
        self.stdout.write(self.style.SUCCESS("Seeding complete."))