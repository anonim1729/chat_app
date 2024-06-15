import io from 'socket.io-client';
import { useState, useEffect, useContext, useRef } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { UsersContext } from '../context/UsersContext';

const MessageArea = () => {
    const { currentUser, currentChat, msgList, setMsgList } = useContext(UsersContext);
    const socket = useRef(io('http://localhost:3000'));
    const [msg, setMsg] = useState('');
    const [arrivalMsg, setArrivalMsg] = useState(null);

    useEffect(() => {
        if (currentUser) {
            socket.current.emit('addUser', currentUser?._id);

            socket.current.on('getUsers', users => {
                console.log(users);
            });
        }
    }, [currentUser]);

    useEffect(() => {
        if (arrivalMsg && currentChat?.members.includes(arrivalMsg.senderId)) {
            setMsgList((prev) => [...prev, arrivalMsg]);
        }
    }, [arrivalMsg, currentChat]);

    const handleClick = async () => {
        if (!currentChat) return;

        const newMsg = {
            conversationId: currentChat._id,
            senderId: currentUser._id,
            text: msg,
        };

        const recieverId = currentChat.members.find(mem => mem !== currentUser._id);
        socket.current.emit('sendMessage', { senderId: currentUser._id, recieverId, text: msg });

        try {
            const response = await fetch('http://localhost:3000/api/users/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMsg),
            });
            const savedMsg = await response.json();
            setMsgList([...msgList, savedMsg]);
        } catch (err) {
            console.log(err.message);
        }
        setMsg('');
    };

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setArrivalMsg({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });

        return () => {
            socket.current.off('getMessage');
        };
    }, []);

    return (
        <div className="flex items-center space-x-4">
            <form onSubmit={(e) => { e.preventDefault(); handleClick(); }} className="flex items-center space-x-2 flex-1">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={msg}
                    onChange={(e) => { setMsg(e.target.value); }}
                    className="flex-1 p-2 rounded-lg bg-gray-200 focus:outline-none"
                />
                <button className="bg-transparent text-blue-500 hover:text-blue-700 transition-colors duration-300" type="submit">
                    <FaTelegramPlane size={20} />
                </button>
            </form>
        </div>
    );
};

export default MessageArea;
