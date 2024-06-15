import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";
import { format } from 'timeago.js';

const Message = ({ message }) => {
    const { currentUser } = useContext(UsersContext);

    const isSender = message.senderId === currentUser?._id;

    return (
        <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} mb-4`}>
            <div
                className={`p-3 max-w-xs rounded-lg ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                style={{
                    borderTopRightRadius: isSender ? '0px' : '8px',
                    borderTopLeftRadius: isSender ? '8px' : '0px',
                    marginLeft: isSender ? 'auto' : '0',
                    marginRight: isSender ? '0' : 'auto',
                }}
            >
                <p>{message.text}</p>
            </div>
            <p className="text-xs text-white mt-1">{format(message.createdAt)}</p>
        </div>
    );
};

export default Message;

