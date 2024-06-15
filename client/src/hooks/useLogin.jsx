import { useAuthcontext } from "./useAuthcontext";
import { useState } from "react";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthcontext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const user = await response.json();

            if (!response.ok) {
                throw new Error(user.err || 'Login failed');
            }

            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: 'LOGIN', payload: user });
            setIsLoading(false);
            return { ok: true };
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            return { ok: false };
        }
    }
    return { login, error, isLoading };
}
