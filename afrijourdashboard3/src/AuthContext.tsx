import { createContext, useState,  ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
    user: any;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
    registerUser:(email: string,user_name:string, password: string) => Promise<void>;
    resetPassword:(email: string)=>Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authTokens, setAuthTokens] = useState<any>(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')!) : null
    );
    const [user, setUser] = useState<any>(() =>
        localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')!) : null
    );

    const loginUser = async (email: string, password: string) => {
        try {
            const response = await fetch('https://aphrc.site/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                console.log('authTokens',authTokens)
                localStorage.setItem('authTokens', JSON.stringify(data));
                window.location.href = '/upload';
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const registerUser = async (email: string,user_name:string, password: string) => {

        try {
            const response = await fetch('https://aphrc.site/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email,user_name,password }),
            });

            const data = await response.json();
            console.log('data',data)
            if (response.ok) {
                window.location.href = '/sign-in';
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetPassword = async (email: string) => {

        try {
            const response = await fetch('https://aphrc.site/api/reset_password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log('data',data)
            if (response.ok) {
                //window.location.href = '/sign-in';
                alert("Check Your Email for Password Reset Link")
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        window.location.href = '/sign-in';
    };

    const contextData: AuthContextType = {
        user,
        loginUser,
        logoutUser,
        registerUser,
        resetPassword
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
