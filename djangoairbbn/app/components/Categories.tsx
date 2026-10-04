'use client'
import Image from "next/image"
import { useState } from "react"
import useSearchModal,{SearchQuery} from "../hooks/useSearchModal" 



const Categories=()=>{
    const searchModal=useSearchModal();
    const [category,setCategory]=useState('');

    const _setCategory=(_category: string)=>{
        setCategory(_category);

        const query: SearchQuery={
            country:searchModal.query.country,
            checkIn:searchModal.query.checkIn,
            checkOut:searchModal.query.checkOut,
            guests:searchModal.query.guests,
            bedrooms:searchModal.query.bedrooms,
            bathrooms:searchModal.query.bathrooms,
            category:_category,
        }
        searchModal.setQuery(query);
    }

    return(
        <div className="pt-3 currsor-pointer pb-6 flex items-center space-x-12">
            <div 
                onClick={()=>_setCategory('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-70 ${category == ''?'border-black':'border-white'} hover:border-gray-200 hover:opacity-100`}>
                <Image className="object-contain" alt="category" src="/cat-beach.png" width={30} height={30}
                />
                <span className="text-xs">All</span>
            </div>

            <div 
                onClick={()=>_setCategory('beach')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-70 ${category == 'beach'?'border-black':'border-white'} hover:border-gray-200 hover:opacity-100`}>
                <Image className="object-contain" alt="category" src="/cat-beach.png" width={30} height={30}
                />
                <span className="text-xs">Beach</span>
            </div>

            <div onClick={()=>_setCategory('villas')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-70 ${category == 'villas'?'border-black':'border-white'} hover:border-gray-200 hover:opacity-100`}>
                <Image className="object-contain" alt="category" src="/cat-villas.png" width={30} height={30}
                />
                <span className="text-xs">Villas</span>
            </div>


            <div onClick={()=>_setCategory('cabins')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-70 ${category == 'cabins'?'border-black':'border-white'} hover:border-gray-200 hover:opacity-100`}>
                <Image className="object-contain" alt="category" src="/cat-cabins.webp" width={30} height={30}
                />
                <span className="text-xs">Cabins</span>
            </div>


            <div onClick={()=>_setCategory('tiny homes')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-70 ${category == 'tiny homes'?'border-black':'border-white'} hover:border-gray-200 hover:opacity-100`}>
                <Image className="object-contain" alt="category" src="/cat-tiny.png" width={30} height={30}
                />
                <span className="text-xs">Tiny homes</span>
            </div>
        </div>
    )
}
export default Categories 