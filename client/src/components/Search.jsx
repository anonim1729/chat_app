const Search = () => {
    return (
        <div className="flex items-center bg-zinc-700 p-2 rounded-lg">
            <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
        </div>
    );
};

export default Search;
