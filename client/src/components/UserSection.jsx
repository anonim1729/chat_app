import Search from "./Search";
import Users from "./Users";

const UserSection = () => {
    return (
        <div className="user-section flex flex-col w-1/3 bg-zinc-800 text-white h-full border-r-2 border-r-white rounded-l-lg">
            <div className="search-section p-4 border-b border-zinc-700">
                <Search />
            </div>
            <div className="users-section flex-1 overflow-y-auto">
                <Users />
            </div>
        </div>
    );
};

export default UserSection;
