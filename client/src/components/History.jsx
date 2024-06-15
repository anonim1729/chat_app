import { useContext, useEffect, useRef } from "react";
import { UsersContext } from "../context/UsersContext";
import Message from "./Message";

const History = () => {
    const { currentChat, msgList } = useContext(UsersContext);
    const chatHistoryRef = useRef(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [msgList]);

    return (
        <>
            {currentChat ? (
                <div
                    className="chat-history space-y-4 p-4 max-h-[80vh] overflow-y-auto"
                    ref={chatHistoryRef}
                >
                    {msgList && msgList.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-4 p-4 max-h-[80vh] overflow-y-auto">
                    Open the chat to see messages
                </div>
            )}
        </>
    );
};

export default History;
