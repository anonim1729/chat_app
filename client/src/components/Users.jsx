import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";
import User from "./User";

const Users = () => {
    const { conversations, setCurrentChat, currentChat, currentUser } = useContext(UsersContext);

    if (!conversations || !currentUser) {
        return <div className="flex justify-center">Loading...</div>;
    }
    console.log(conversations);
    return (
        <div className="p-4 space-y-4 overflow-y-auto">
            {conversations.length > 0 ? conversations.map((c) => (
                // Use the key prop to provide a unique identifier for each Conversation component
                <div key={c._id} onClick={() => {
                    setCurrentChat(c);
                }}>
                    {/* Use Conversation component as a function */}
                    <User
                        conversation={c}
                        currentUser={currentUser}
                    />
                </div>
            )) : <div>No conversations to show</div>}
        </div>
    );
};

export default Users;
