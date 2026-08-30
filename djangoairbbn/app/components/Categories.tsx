import Image from "next/image"
const Categories=()=>{
    return(
        <div className="pt-3 currsor-pointer pb-6 flex items-center space-x-12">
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-70 hover:border-gray-200 hover:opacity-100">
                <Image className="object-contain" alt="category" src="/cat-beach.png" width={30} height={30}
                />
                <span className="text-xs">Beach</span>
            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-70 hover:border-gray-200 hover:opacity-100">
                <Image className="object-contain" alt="category" src="/cat-villas.png" width={30} height={30}
                />
                <span className="text-xs">Villas</span>
            </div>


            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-70 hover:border-gray-200 hover:opacity-100">
                <Image className="object-contain" alt="category" src="/cat-cabins.webp" width={30} height={30}
                />
                <span className="text-xs">Cabins</span>
            </div>


            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-70 hover:border-gray-200 hover:opacity-100">
                <Image className="object-contain" alt="category" src="/cat-tiny.png" width={30} height={30}
                />
                <span className="text-xs">Tiny homes</span>
            </div>
        </div>
    )
}
export default Categories 