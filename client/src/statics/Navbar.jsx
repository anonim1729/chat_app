import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthcontext } from '../hooks/useAuthcontext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
    const { user } = useAuthcontext();
    const { logout } = useLogout();
    return (
        <div className="bg-zinc-800 text-white p-4 flex justify-between items-center min-h-[10vh] h-[10vh] shadow-lg">
            <Link to='/' className="text-2xl font-bold">Chat App</Link>
            <div className="flex space-x-4">
                {user ? (
                    <>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors duration-300">
                            Account
                        </button>
                        <button className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg transition-colors duration-300"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/signup' className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors duration-300">
                            Signup
                        </Link>
                        <Link to='/login' className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg transition-colors duration-300">
                            Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
