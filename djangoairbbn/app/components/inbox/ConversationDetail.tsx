'use client'
import useWebSocket, {ReadyState} from "react-use-websocket";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import { useEffect,useState,useRef } from "react";
import { MessageType } from "./[id]/page";
import { UserType } from "@/app/inbox/page";

interface ConversationDetailProps{
conversation: ConversationType;
messages:MessageType[];
userId:string;
token:string;
}

const ConversationDetail:React.FC<ConversationDetailProps>=({
    conversation,
    userId,
    messages,
    token
})=>{
        const messagesDiv = useRef<HTMLDivElement>(null);
        const myUser=conversation.users?.find((user)=> user.id== userId)
        const otherUser=conversation.users?.find((user)=> user.id!= userId)
        const [newMessage,setNewMessage]=useState('');
        const [realtimeMessages,setRealtimeMessages]=useState<MessageType[]>([])
        const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`,{
            share: false,
            shouldReconnect:()=> true,
        },)

        const scrollToBottom=()=>{
            if(messagesDiv.current){
                messagesDiv.current.scrollTop=messagesDiv.current.scrollHeight;
            }
        }


        useEffect(()=>{
            console.log("Connection state changed", ReadyState);
        },[readyState])

        useEffect(()=>{
            if(lastJsonMessage && typeof lastJsonMessage==='object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage){
                const message:MessageType={
                    id:'',
                    name:lastJsonMessage.name as string,
                    body:lastJsonMessage.body as string,
                    sent_to:otherUser as UserType,
                    created_by:myUser as UserType,
                    conversationId:conversation.id
                }

                setRealtimeMessages((realtimeMessages)=>[...realtimeMessages, message]);
            }
            scrollToBottom();
        },[lastJsonMessage])

        const sendMessage=async()=>{
            sendJsonMessage({
                event:'chat_message',
                data:{
                    body:newMessage,
                    name:myUser?.name,
                    sent_to_id:otherUser?.id,
                    conversation_id:conversation.id
                }
            })
            setNewMessage('');

            setTimeout(()=>{
                scrollToBottom()
            },50);
        }


    return(
        <><div 
        ref={messagesDiv}
        className="max-h-100 overflow-auto flex flex-col sapace-y-4">
            {messages.map((message, index)=>(
                <div
                    key={index}
                    className={`w-[88%]  py-2 px-4 mb-3 rounded-xl ${message.created_by.name == myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                    >
                <p className="font-bold text-gray-500">{message.created_by.name}</p>
                <p>{message.body}</p>
                    </div>
            ))}
            {realtimeMessages.map((message, index)=>(
                <div
                    key={index}
                    className={`w-[88%]  py-2 px-4 rounded-xl ${message.name == myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                    >
                <p className="font-bold text-gray-500">{message.name}</p>
                <p>{message.body}</p>
                    </div>
            ))}
        </div>
        <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
            <input
            type="text"
            placeholder="Type a message"
            className="w-full p-2 bg-gray-200 rounded-xl"
            value={newMessage}
            onChange={(e)=> setNewMessage(e.target.value)}
            />

            <CustomButton
            label={"Send"}
            onClick={sendMessage}
            className="w-25"
            />
        </div>
        </>
    )
}
export default ConversationDetail;