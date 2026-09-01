import Image from "next/image"


const MyReservationsPage=()=>{
    return(
        <main className="max-w-375 mx-auto px-6 pb-6">
            <div className="pt-6 pb-2 ">
                <h1 className="mt-6 mb-2 text-2xl">My Reservations</h1>

                <div>
                    <div className="p-5 mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                        <div className="col-span-1 ">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image
                                src="/beach1.avif"
                                alt="beach house"
                                fill
                                className="hover:scale-110 object-cover transition "
                                />
                            </div>
                        </div>

                        <div className="col-span-3 space-y-2">
                            <h2 className="mb-4 text-xl">Property name</h2>
                            <p><strong>Check in date:</strong> 13/3/2027</p>
                            <p><strong>Check out date:</strong> 20/3/2027</p>
                            <p><strong>Number of Nights:</strong> 7</p>
                            <p><strong>Total Price:</strong> $700</p>

                        </div>
                    </div>
                </div>

                <div>
                    <div className="p-5 mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                        <div className="col-span-1 ">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image
                                src="/beach1.avif"
                                alt="beach house"
                                fill
                                className="hover:scale-110 object-cover transition "
                                />
                            </div>
                        </div>

                        <div className="col-span-3 space-y-2">
                            <h2 className="mb-4 text-xl">Property name</h2>
                            <p><strong>Check in date:</strong> 13/3/2027</p>
                            <p><strong>Check out date:</strong> 20/3/2027</p>
                            <p><strong>Number of Nights:</strong> 7</p>
                            <p><strong>Total Price:</strong> $700</p>

                        </div>
                        <div className="mt-5 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl ">Go to property</div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MyReservationsPage