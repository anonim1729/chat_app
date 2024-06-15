import { useAuthcontext } from "../hooks/useAuthcontext";
import ChatArea from "../components/ChatArea";
import UserSection from "../components/UserSection";

const ChatLayout = () => {
    const { user } = useAuthcontext();
    return (
        <div className="main-container w-[80%] max-w-[80vw] h-[90vh] bg-gray-500 rounded-lg shadow-black shadow-2xl m-5">
            {user ?
                <div className="flex h-full">
                    <UserSection />
                    <ChatArea />
                </div> :
                <p className="text-black text-3xl">Please Login to continue</p>
            }
        </div>
    )
}
export default ChatLayout