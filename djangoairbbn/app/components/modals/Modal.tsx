'use client'

import {useCallback, useEffect, useState} from 'react';


interface ModalProps{
    lable:string;
    close:()=>void;
    content:React.ReactElement;
    isOpen:boolean;
}

const Modal: React.FC<ModalProps> = ({ lable, content,isOpen, close }) => {
    const [showModal,setShowModal]= useState(isOpen)

    useEffect(()=>{
        setShowModal(isOpen)
    },[isOpen] )

    const handleClose= useCallback(()=>{
        setShowModal(false);

        setTimeout(()=>{
            close();
        },300)
    },[close])

    if(!isOpen){
        return null;
    }
    return(
        <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
            <div className="relative w-[90%] md:w-[80%] lg:w-175 max-auto my-6 h-auto">
                <div className={`translate duration-600 h-full ${showModal ?  'translate-y-0 opacity-100' :'translate-y-full opacity-10'} `}>
                    <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
                        <header className=" flex items-center p-6 rounded-t justify-center relative border">
                            <div className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>

                            <h2 className="text-lg font-bold">{lable}</h2>
                        </header>

                        <section className="p-6">
                            {content}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;