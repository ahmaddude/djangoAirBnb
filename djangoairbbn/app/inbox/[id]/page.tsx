import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import apiService from "@/app/services/apiService";
import { getAccessToken, getUserId } from "@/app/lib/actions";

const ConversationPage = async ({params}: {params: Promise<{id:string}>}) => {
    const {id} = await params;
    const userId = await getUserId();
    const token = await getAccessToken();

    if (!userId) {
        return (
            <main className="max-w-375 mx-auto px-6 py-12">
                <p>You need to be authenticated</p>
            </main>
        )
    }

    const res = await apiService.get(`/api/chat/${id}/`);
    const conversation = res.conversation;
    const messages = res.messages;

    return(
        <main className="max-w-375 mx-auto px-6 pb-6 space-y-4">
        <ConversationDetail
            userId={userId}
            messages={messages}
            token={token}
            conversation={conversation}/>
        </main>
    )
}

export default ConversationPage;