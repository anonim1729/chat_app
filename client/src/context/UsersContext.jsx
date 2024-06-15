import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [msgList, setMsgList] = useState(messages);
    const [otherUser, setOtherUser] = useState(null);

    // console.log(user);
    // console.log(currentUser);
    // console.log(conversations);
    // console.log(messages);
    // console.log(currentChat);

    const fetchConversations = async (cuser) => {
        if (!cuser) return;

        // console.log(cuser);
        try {
            const response = await fetch(`http://localhost:3000/api/users/conversations/${cuser._id}`);
            const data = await response.json();
            console.log(data);
            setConversations(data.conversations);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchMessages = async (conId) => {
        if (!currentChat) return;
        console.log(conId);
        try {
            const response = await fetch(`http://localhost:3000/api/users/messages/${conId}`);
            const data = await response.json();
            // console.log(data);
            setMessages(data.messages);
            setMsgList(data.messages);
        } catch (err) {
            console.log(err.message);
        }
    }

    const fetchUser = async (email) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${email}`);
            const FoundUser = await response.json();
            // console.log(FoundUser);
            setCurrentUser(FoundUser);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchOtherUser = async (otherUserId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${otherUserId}`);
            const FoundUser = await response.json();
            console.log(FoundUser);
            setOtherUser(FoundUser);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (user) {
            // console.log(user.email);
            fetchUser(user.email);
        } else {
            setCurrentUser(null);
        }
    }, [user]);

    useEffect(() => {
        if (currentUser) {
            fetchConversations(currentUser);
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentChat) {
            fetchMessages(currentChat._id);
        } else {
            setMessages([]);
        }
    }, [currentChat]);

    useEffect(() => {
        if (currentChat) {
            const otherUserId = currentChat.members.find((m) => m != currentUser._id);
            fetchOtherUser(otherUserId);
        }
        else {
            setOtherUser(null);
        }
    }, [currentChat])
    return (
        <UsersContext.Provider value={{ setCurrentChat, currentUser, conversations, currentChat, messages, msgList, setMsgList, otherUser }}>
            {children}
        </UsersContext.Provider>
    );
}
