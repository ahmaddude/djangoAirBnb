'use client'
import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";
import CustomButton from "../forms/CustomButton";
import Image from "next/image";


interface ConversationProps{
    conversation: ConversationType;
    userId:string;
}



const Conversation:React.FC<ConversationProps>=({
    conversation,
    userId
})=>{
    const router=useRouter();
    const otherUser=conversation.users.find((user)=> user.id!= userId)
    return(
        <div className="px-6 py-4 border cursor-pointer border-gray-300 rounded-xl">
            <div className="flex items-center ">
                <Image
                                    src={otherUser?.avatar_url?otherUser.avatar_url:'/profile-pic.jpg'}
                                    width={40}
                                    height={40}
                                    alt="profile-pic"
                                    className="rounded-full"
                                    />
                <p className="ml-2 text-xl ">{otherUser?.name}</p>
            </div>

            <p 
                onClick={()=>router.push(`/inbox/${conversation.id}`)}
                className="text-airbnbDark">Go to the conversation</p>
        </div>
    )
}
export default Conversation;