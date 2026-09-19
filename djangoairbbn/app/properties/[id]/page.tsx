import Image from "next/image";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import apiService from "@/app/services/apiService";





const PropertyDetailPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const property = await apiService.get(`/api/properties/${id}`)
    return(
        <main className="max-w-375 mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] overflow-hidden mb-4 rounded-xl relative">
                <Image 
                fill
                src={property.image_url} alt="beach house"
                className="object-cover w-full h-full"/>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>
                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
                    </span>
                    <hr/>
                    <div className="py-6 flex items-center space-x-4">
                        {property.landlord.avatar_url && (
                        <Image
                        src={property.landlord.avatar_url}
                        alt="profile picture"
                        width={50}
                        height={50}
                        className="rounded-full"
                        />
                        )}

                        <p><strong>{property.landlord.name}</strong> is your host </p>
                    </div>
                    <hr/>

                    <p className="mt-6 text-lg">
                    {property.description}
                    </p>

                </div>


                <ReservationSidebar
                property={property}
                />
            </div>
        </main>
        
    )
}
export default PropertyDetailPage;