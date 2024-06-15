import { useState } from "react"
import { useAuthcontext } from "./useAuthcontext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthcontext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const user = await response.json();
            if (!response.ok) {
                setIsLoading(false);
                setError(user.err);
            }
            // console.log(user);
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({ type: 'SIGNUP', payload: user });
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
        }

    }
    return { signup, error, isLoading };
}