'use client'

import modal from "./Modal";
import {useState} from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";

const LoginModal =()=>{
    const loginModal=useLoginModal();

    const content=(
        <>
            <h2 className="mb-6 text-2xl">Welcome to DjangoAirBnb, please login </h2>

            <form className="space-y-4">
            <input placeholder="Your e-mail address" type="email" className="w-full h-13 px-4 border border-gray-300 rounded-xl"/>
            <input placeholder="Your password" type="password" className="w-full h-13 px-4 border border-gray-300 rounded-xl"/>

            <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                the error message
            </div>

            <CustomButton
            label="Submit"
            onClick={()=>console.log('submit clicked')}/>
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