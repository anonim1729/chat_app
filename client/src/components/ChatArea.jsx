import UserDetails from "./UserDetails";
import History from "./History";
import MessageArea from "./MessageArea";

const ChatArea = () => {
    return (
        <div className="chat-area flex flex-col flex-1 bg-zinc-700 h-full w-2/3 rounded-r-lg">
            <div className="user-details bg-zinc-800 text-white p-4 rounded-tr-lg">
                <UserDetails />
            </div>
            <div className="history flex-1 overflow-y-auto p-4">
                <History />
            </div>
            <div className="message-area bg-zinc-800 p-4 rounded-br-lg">
                <MessageArea />
            </div>
        </div>
    );
};

export default ChatArea;

