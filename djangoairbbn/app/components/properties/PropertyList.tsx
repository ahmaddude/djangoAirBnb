'use client';
import apiService from "@/app/services/apiService";
import {format} from 'date-fns';
import { useSearchParams } from "next/navigation";
import { useEffect,useState } from "react";
import PropertyListItem from "./PropertyListItem"
import useSearchModal from "@/app/hooks/useSearchModal";

export type PropertyType = {
    id:string;
    title:string;
    price_per_night:number;
    image_url:string;
    is_favorite:boolean
}

interface PropertyListProps{
    landlord_id?: string | null;
    favorites?: boolean | null;

}
const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites
}) => {
    const params=useSearchParams();
    const searchModal= useSearchModal();
    const country=searchModal.query.country;
    const guests=searchModal.query.guests;
    const bathrooms=searchModal.query.bathrooms;
    const bedrooms=searchModal.query.bedrooms;
    const checkIn=searchModal.query.checkIn;
    const checkOut=searchModal.query.checkOut;
    const category=searchModal.query.category;
    const [properties,setProperties]=useState<PropertyType[]>([]);

    const markFavorite= (id: string, is_favorite:boolean)=>{

        const tmpProperties=properties.map((property:PropertyType)=>{
            if (property.id==id){
                property.is_favorite= is_favorite
                if(is_favorite){
                    console.log('added to favorite proeprties list')
                }else{
                    console.log('removed from favorite properties list')
                }
            }
            return property;
        } )
        setProperties(tmpProperties);
    }
    
    useEffect(()=>{

        const getProperties=async()=>{
            let url='/api/properties/';
            if (landlord_id){
                url +=`?landlord_id=${landlord_id}`
            }else if(favorites){
                url+='?is_favorites=true'
            }else{
                let urlQuery='';
                if(country){
                    urlQuery+='&country='+ country
                }
                if(guests){
                    urlQuery+='&guests='+ guests
                }
                if(bathrooms){
                    urlQuery+='&bathrooms='+ bathrooms
                }
                if(bedrooms){
                    urlQuery+='&bedrooms='+ bedrooms
                }
                if(category){
                    urlQuery+='&category='+ category
                }
                if(checkIn){
                    urlQuery+='&checkIn='+ format(checkIn, 'yyyy-MM-dd')
                }
                if(checkOut){
                    urlQuery+='&checkOut='+ format(checkOut, 'yyyy-MM-dd')
                }

                if(urlQuery.length){
                    console.log('Query:', urlQuery);

                    urlQuery='?'+ urlQuery.substring(1);
                    url+= urlQuery;
                }
            }
        const tmpProperties=await apiService.get(url)

        setProperties(tmpProperties.data.map((property:PropertyType)=>{
            if(tmpProperties.favorites.includes(property.id)){
                property.is_favorite=true
            }else{
                property.is_favorite=false
            }
            return property
        }));
    };

        getProperties();
    },[category, searchModal.query,params]);

    return (
        <>
        {properties.map((property)=>{
            return(
                <PropertyListItem
                key={property.id}
                property={property}
                markFavorite={(is_favorite:any)=> markFavorite(property.id,is_favorite)}
                />
            )
        })}
        
        </>
    )
}

export default PropertyList;