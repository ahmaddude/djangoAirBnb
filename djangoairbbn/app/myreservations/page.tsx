import Image from "next/image"
import apiService from "../services/apiService"
import Link from "next/link"

const MyReservationsPage=async()=>{
    const reservations=await apiService.get('/api/auth/myreservations/')
    return(
        <main className="max-w-375 mx-auto px-6 pb-6">
                <h1 className="mt-6 mb-2 text-2xl">My Reservations</h1>
                <div className="space-y-4">
                    {reservations.map((reservation:any)=>{
                        return(
                            <div 
                            key={reservation.id}
                            className="p-5 mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                            <div className="col-span-1 ">
                                <div className="relative overflow-hidden aspect-square rounded-xl">
                                    <Image
                                    src={reservation.property.image_url}
                                    alt="property image"
                                    fill
                                    className="hover:scale-110 object-cover transition "
                                    />
                                </div>
                            </div>

                            <div className="col-span-3 space-y-2">
                                <h2 className="mb-4 text-xl">{reservation.property.title}</h2>
                                <p><strong>Check in date:</strong> {reservation.start_date}</p>
                                <p><strong>Check out date:</strong> {reservation.end_date}</p>
                                <p><strong>Number of Nights:</strong> {reservation.number_of_nights}</p>
                                <p><strong>Total Price:</strong> {reservation.total_price}</p>

                            </div>
                            <Link
                                href={`properties/${reservation.property.id}`}
                                className="mt-5 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl ">
                                Go to property page
                                </Link>
                        </div>
                        )
                    })}
                </div>
        
        </main>
    )
}

export default MyReservationsPage