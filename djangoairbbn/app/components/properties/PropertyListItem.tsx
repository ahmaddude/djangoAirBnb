import Image from "next/image";
const PropertyListItem = () => {
    return (
        <div>
            <div className=" cursor-pointer relative  mt-5 overflow-hidden aspect-square rounded-xl">
                <Image
                fill
                src="/beach1.avif" alt="beach house"
                sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                className="hover:scale-110 object-cover transition h-full w-full " />
                
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">Property Name</p>
            </div>
            <div className="mt-2">
                <p className="text-sm text-gray-700 ">200$ <strong>per night</strong></p>
            </div>
        </div>
    )
}

export default PropertyListItem;