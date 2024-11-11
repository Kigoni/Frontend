import { createContext, useState, ReactNode} from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    user: any;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
    registerUser: (email: string, user_name: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
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
    const [loading, setLoading] = useState(true);

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
            console.log(loading)
            console.log(authTokens)
            if (response.ok) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                window.location.href = '/upload'; // Redirect to upload page
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
        }finally {
            setLoading(false);
        }
    };

    const registerUser = async (email: string, user_name: string, password: string) => {
        try {
            const response = await fetch('https://aphrc.site/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, user_name, password }),
            });

            if (response.ok) {
                window.location.href = '/sign-in'; // Redirect to sign-in on successful registration
            } else {
                alert('Registration failed.');
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

            if (response.ok) {
                alert("Check your email for the password reset link.");
            } else {
                alert('Password reset failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        window.location.href = '/sign-in'; // Redirect to sign-in on logout
    };

    // const updateToken = async () => {
    //     if (!authTokens?.refresh) {
    //         logoutUser();
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         const response = await fetch('https://aphrc.site/api/token/refresh', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ refresh: authTokens.refresh }),
    //         });

    //         const data = await response.json();
    //         if (response.ok) {
    //             setAuthTokens(data);
    //             setUser(jwtDecode(data.access));
    //             localStorage.setItem('authTokens', JSON.stringify(data));
    //         } else {
    //             logoutUser();
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         logoutUser();
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     const initializeAuth = async () => {
    //         if (authTokens) {
    //             await updateToken();
    //         }
    //         setLoading(false);
    //     };

    //     initializeAuth();

    //     const interval = setInterval(() => {
    //         if (authTokens) {
    //             updateToken();
    //         }
    //     }, 1000 * 60 * 2); // Refresh every 2 minutes

    //     return () => clearInterval(interval);
    // }, [authTokens]);

    const contextData: AuthContextType = {
        user,
        loginUser,
        logoutUser,
        registerUser,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {/* {!loading && children} */}
            {children}
        </AuthContext.Provider>
    );
};
