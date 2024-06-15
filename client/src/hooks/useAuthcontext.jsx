import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useAuthcontext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('authContext can only be used inside app');
    }

    return context;
}