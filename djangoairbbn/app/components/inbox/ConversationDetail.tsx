'use client'
import useWebSocket, {ReadyState} from "react-use-websocket";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import { useEffect,useState,useRef } from "react";
import { MessageType } from "./[id]/page";
import { UserType } from "@/app/inbox/page";

interface ConversationDetailProps{
conversation: ConversationType;
userId:string;
token:string;
}

const ConversationDetail:React.FC<ConversationDetailProps>=({
    conversation,
    userId,
    token
})=>{
        const myUser=conversation.users?.find((user)=> user.id== userId)
        const otherUser=conversation.users?.find((user)=> user.id!= userId)

        const {sendJsonMessage, lastJsonMesage, readyState} = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`,{
            share: false,
            shouldReconnect:()=> true,
        },)

        useEffect(()=>{
            console.log("Connection state changed", ReadyState);
        },[readyState])

    return(
        <><div className="max-h-100 overflow-auto flex flex-col sapace-y-4">
            <div className="w-[80%] mb-5 py-4 px-6 rounded-xl bg-gray-200">
                <p className="font-bold text-gray-500">John Doe</p>
                <p>yooo thats some random info ig </p>
            </div>

            <div className="w-[80%] mb-5 ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
                <p className="font-bold text-gray-500">The one who knocks</p>
                <p>knock knock knock knock knock knock knock knock knock</p>
            </div>
        </div>
        <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
            <input
            type="text"
            placeholder="Type a message"
            className="w-full p-2 bg-gray-200 rounded-xl"/>

            <CustomButton
            label={"Send"}
            onClick={()=>console.log("clicked send")}
            className="w-25"
            />
        </div>
        </>
    )
}
export default ConversationDetail;