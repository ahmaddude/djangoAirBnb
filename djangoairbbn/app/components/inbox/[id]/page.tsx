import { getUserId } from "@/app/lib/actions";
import ConversationDetail from "../ConversationDetail";
import React,{useState,useEffect} from "react";
import apiService from "@/app/services/apiService";
import { UserType } from "@/app/inbox/page";
import { getAccessToken } from "@/app/lib/actions";

export type MessageType= {
    id:string;
    name:string;
    body:string;
    conversationId:string;
    created_by:UserType;
    sent_to:UserType;
}


const ConversationPage=async({params}: {params:Promise<{id:string}>})=>{
    const {id}=await params;
    const userId=await getUserId();
    const token=await getAccessToken();
    
        if(!userId || !token){
            return(
                <main className="max-w-375 max-auto px-6 py-12">
                    <p>You need to be authenticated</p>
                </main>
            )
        }

        const conversation=await apiService.get(`/api/chat/${id}/`)
        console.log('convo',conversation)
        return(
            <main className="max-w-375 mx-auto px-6 pb-6">
                <ConversationDetail
                    userId={userId}
                    token={token}
                    conversation={conversation.conversation}/>
            </main>
        )
}
export default ConversationPage