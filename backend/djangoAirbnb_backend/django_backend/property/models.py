from django.db import models
import uuid
from django.conf import settings
from useraccount.models import User

class Property(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    title= models.CharField(max_length=225)
    description=models.TextField()
    price_per_night=models.IntegerField()
    bedrooms=models.IntegerField()
    guests=models.IntegerField()
    country=models.CharField(max_length=225)
    country_code=models.CharField(max_length=10)
    country_code=models.CharField(max_length=225)
    image=models.ImageField(upload_to='uploads/properties')
    landlord=models.ForeignKey(User, related_name='properties', on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

    @property
    def image_url(self):
        if self.image:
            # self.image.name gives the relative path within the bucket, e.g. "uploads/properties/beach1.avif"
            return f"https://npqwruxizyiyrjentlpi.supabase.co/storage/v1/object/public/{settings.AWS_STORAGE_BUCKET_NAME}/{self.image.name}"
        return None