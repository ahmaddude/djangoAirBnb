'use client'
import Image from "next/image";
import { useState,ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";


const MyDetails=({myId}:{myId:string | null})=>{
    const [me, setMe]=useState<any>(null);
    const [avatar,setAvatar]=useState<string | null>(null)
    const router=useRouter();
    
    useEffect(()=>{
        if(!myId) return;
        apiService.get(`/api/auth/${myId}/`).then((res) => {
        setMe(res.data ?? res);
});
    },[myId])
    const handleAvatarChange=async (event:ChangeEvent<HTMLInputElement>)=>{
        const file = event.currentTarget.files?.[0];
        if(!file)return;
        const preview=URL.createObjectURL(file)
        setAvatar(preview);

        try{
        const formData=new FormData();
        formData.append('avatar',file);

        const res=await apiService.post(`/api/auth/me/${myId}/`,formData)

        setMe((prev: any) => ({ ...prev, avatar_url: res.avatar_url ?? res.data?.avatar_url }));
        setAvatar(null);
        }
        catch {
        setAvatar(null);                        
        }
        finally {
            URL.revokeObjectURL(preview);
        }
    }
    if (!me) return <div>Loading...</div>;
    return(
        <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl ">
                    <div className="relative">
                        <Image
                    src={me.avatar_url?me.avatar_url:'/profile-pic.jpg'}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    className="rounded-full"
                    />
                    <label
                        htmlFor="avatar-upload" 
                        className="absolute bottom-0 right-0 cursor-pointer bg-airbnb text-white px-3 py-1 rounded-full text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                        <circle cx="12" cy="13" r="3"/>
                        </svg>
                        <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    />
                    </label>
                    </div>
                    <div><h1 className="mt-6 text-2xl">{me.name}</h1> <h2>{me.properties_count} properties</h2></div>

                    <div className="mt-6 flex flex-row items-center gap-3 w-full max-w-sm">
                        <button
                            onClick={()=>router.push('/myfavorites')}
                            className="flex-1 cursor-pointer bg-airbnb hover:bg-airbnbDark transition text-white rounded-xl py-3 px-4 font-semibold"
                        >
                            My favorites
                        </button>
                        <button
                            onClick={()=>router.push('/myreservations')}
                            className="flex-1 cursor-pointer border border-gray-400 hover:bg-gray-100 transition rounded-xl py-3 px-4 font-semibold"
                        >
                            My reservations
                        </button>
                    </div>

                </div>
    )
}
export default MyDetails