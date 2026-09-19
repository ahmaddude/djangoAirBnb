import Image from "next/image";

interface CategoriesProps{
    dataCategory:string;
    setCategory:(category:string)=>void;
}

const Categories: React.FC<CategoriesProps> =({
    dataCategory,
    setCategory
})=>{
    return(
        <>
            <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
                <div
                onClick={()=>setCategory('beach')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory=='beach'?'border-gray-800': ' border-white'} opacity-70 hover:border-gray-200 hover:opacity-100`}>
                                <Image className="object-contain" alt="category" src="/cat-beach.png" width={30} height={30}
                                />
                                <span className="text-xs">Beach</span>
                            </div>
                
                            <div
                onClick={()=>setCategory('villas')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory=='villas'?'border-gray-800': ' border-white'} opacity-70 hover:border-gray-200 hover:opacity-100`}>                                <Image className="object-contain" alt="category" src="/cat-villas.png" width={30} height={30}
                                />
                                <span className="text-xs">Villas</span>
                            </div>
                
                
                            <div
                onClick={()=>setCategory('cabins')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory=='cabins'?'border-gray-800': ' border-white'} opacity-70 hover:border-gray-200 hover:opacity-100`}>                                <Image className="object-contain" alt="category" src="/cat-cabins.webp" width={30} height={30}
                                />
                                <span className="text-xs">Cabins</span>
                            </div>
                
                
                            <div
                onClick={()=>setCategory('tiny homes')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory=='tiny homes'?'border-gray-800': ' border-white'} opacity-70 hover:border-gray-200 hover:opacity-100`}>                                <Image className="object-contain" alt="category" src="/cat-tiny.png" width={30} height={30}
                                />
                                <span className="text-xs">Tiny homes</span>
                            </div>
            </div>
        </>
    )
}
export default Categories;