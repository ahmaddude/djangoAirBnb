'use client'

import modal from "./Modal";
import {useState} from "react";
import useSignupModal from "@/app/hooks/useSignupModal";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";

const SignupModal =()=>{
    const signupModal=useSignupModal();

    const content=(
        <>
            <h2 className="mb-6 text-2xl">Welcome to DjangoAirBnb, please sign up </h2>

            <form className="space-y-4">
            <input placeholder="Your e-mail address" type="email" className="w-full h-13 px-4 border border-gray-300 rounded-xl"/>
            <input placeholder="Your password" type="password" className="w-full h-13 px-4 border border-gray-300 rounded-xl"/>
            <input placeholder="repeat Your password" type="password" className="w-full h-13 px-4 border border-gray-300 rounded-xl"/>

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

        isOpen={signupModal.isOpen}
        close={signupModal.close}
        lable="Signup"
        content={content}

        />
    )
}

export default SignupModal