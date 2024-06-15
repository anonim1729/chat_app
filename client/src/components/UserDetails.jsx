import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

const UserDetails = () => {
    const { otherUser } = useContext(UsersContext);
    return (
        <div className="flex items-center space-x-4 ">
            <div>
                <h2 className="text-xl font-semibold">{otherUser?.email.slice(0, otherUser.email.indexOf('@'))}</h2>
                {/* <p className="text-sm text-gray-400">Online</p> */}
            </div>
        </div>
    );
};

export default UserDetails;
