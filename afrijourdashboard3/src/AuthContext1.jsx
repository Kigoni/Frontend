import {createContext,useState,useEffect} from 'react'
import { jwtDecode } from "jwt-decode";
const AuthContext=createContext()

export default AuthContext;


export const AuthProvider=({children})=>{
    
    let [authTokens,setAuthTokens]=useState(()=>localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')):null)
    let [user,setUser]=useState(()=>localStorage.getItem('authTokens')? jwtDecode(localStorage.getItem('authTokens')):null)

    let loginUser = async (email, password) => {
        try {
            let response = await fetch('https://aphrc.site/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'email': email, 'password': password })
            });
    
            // if (!response.ok) {
            //     throw new Error('Failed to authenticate');
            // }else{
            //     alert('Authenticated!')
            // }
    
            let data = await response.json();
            console.log('data:',data);
            console.log('response:',response);
            console.log('user',user)
            console.log('decoded:',jwtDecode(data.access))
            if (response.ok){
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authTokens',JSON.stringify(data))
                alert('everything is alright')
                window.location.href = '/upload';
            }else{
                alert('Something went wrong')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
     
    let logoutUser=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        window.location.href = '/sign-in';
    }

    let contextData={
        user:user,
        loginUser:loginUser,
    }
    
    return(
    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>)
} 