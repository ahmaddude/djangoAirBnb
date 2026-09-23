'use client';
import apiService from "@/app/services/apiService";
import { useEffect,useState } from "react";
import PropertyListItem from "./PropertyListItem"

export type PropertyType = {
    id:string;
    title:string;
    price_per_night:number;
    image_url:string;
}

interface PropertyListProps{
    landlord_id?: string | null;

}
const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id
}) => {
    const [properties,setProperties]=useState<PropertyType[]>([]);
    
    useEffect(()=>{

        const getProperties=async()=>{
            let url='/api/properties/';
            if (landlord_id){
                url +=`?landlord_id=${landlord_id}`
            }
        const tmpProperties=await apiService.get(url)

        setProperties(tmpProperties.data);
    };

        apiService.get('/api/properties')

        getProperties();
    },[]);

    return (
        <>
        {properties.map((property)=>{
            return(
                <PropertyListItem
                key={property.id}
                property={property}
                />
            )
        })}
        
        </>
    )
}

export default PropertyList;