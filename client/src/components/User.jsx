import { useEffect, useState } from "react";
import pic from '../assets/pic.svg';

const User = ({ conversation, currentUser, setCurrentChat, currentChat }) => {
    const [user, setUser] = useState(null);
    // console.log(conversation);
    useEffect(() => {
        if (!conversation || !currentUser) return;

        const friendId = conversation.members.find((m) => m !== currentUser._id);
        if (!friendId) return;

        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${friendId}`);
                const data = await response.json();
                console.log(data);
                setUser(data);
            } catch (err) {
                console.log(err.message);
            }
        }

        getUser();
    }, [conversation, currentUser]);

    if (!user) return null;

    return (
        <div
            key={user._id}
            className={`flex items-center space-x-4 p-2 hover:bg-zinc-700 rounded-lg cursor-pointer ${user._id === currentChat?.members.find(m => m !== currentUser._id) ? 'bg-zinc-900' : ''}`}
        >
            <div className="flex justify-center items-center text-3xl w-12 h-12 rounded-full bg-gray-500 text-yellow-300 font-bold">
                <img src={pic} width={30} alt="Profile" />
            </div>
            <div>
                <h3 className="font-semibold">{user.email.slice(0, user.email.indexOf('@'))}</h3>
                <p className="text-sm text-gray-400">{user._id}</p>
            </div>
        </div>
    );
}

export default User;
