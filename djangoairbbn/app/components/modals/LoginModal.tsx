'use client'

import modal from "./Modal";
import {useState} from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";

const LoginModal =()=>{
    const router =useRouter();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [errors,setErrors]=useState<string[]>([]);
    const loginModal=useLoginModal();

    const submitLogin=async()=>{
        const formData={
            email:email,
            password:password
        }
        const response=await apiService.postWithoutToken('/api/auth/login/',JSON.stringify(formData))

        if(response.access){
            handleLogin(response.user.pk,response.access,response.refresh);
            loginModal.close();
            router.push('/')
        }
        else{
            setErrors(response.non_field_errors);
        }
    }

    const content=(
        <>
            <h2 className="mb-6 text-2xl">Welcome to DjangoAirBnb, please login </h2>

            <form 
            action={submitLogin}
            className="space-y-4">
            <input onChange={(e)=>setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-13 px-4 border border-gray-300 rounded-xl"/>
            <input onChange={(e)=>setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-13 px-4 border border-gray-300 rounded-xl"/>

            {errors.map((error,index)=>{
                return(
                    <div
                    key={`error_${index}`} className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                                    {error}
                                </div>
                )
            })}

            <CustomButton
            label="Submit"
            onClick={submitLogin}/>
            </form>
        </>
    )

    return(
        <Modal

        isOpen={loginModal.isOpen}
        close={loginModal.close}
        lable="Login"
        content={content}

        />
    )
}

export default LoginModal