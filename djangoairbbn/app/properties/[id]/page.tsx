import Image from "next/image";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
const PropertyDetailPage=()=>{
    return(
        <main className="max-w-375 mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] overflow-hidden mb-4 rounded-xl relative">
                <Image 
                fill
                src="/beach1.avif" alt="beach house"
                className="object-cover w-full h-full"/>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">Property Name</h1>
                    <span className="mb-6 block text-lg text-gray-600">
                        4 guests - 2 bedrooms - 2 beds - 2 baths
                    </span>
                    <hr/>
                    <div className="py-6 flex items-center space-x-4">
                        <Image
                        src="/profile-pic.jpg"
                        alt="profile picture"
                        width={50}
                        height={50}
                        className="rounded-full"
                        />

                        <p><strong>John Doe</strong> is your host </p>
                    </div>
                    <hr/>

                    <p className="mt-6 text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>

                </div>


                <ReservationSidebar/>
            </div>
        </main>
        
    )
}
export default PropertyDetailPage;