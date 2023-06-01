import React, { useState } from 'react'

const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})
  
const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token')
    const [token,setToken]=useState(null)
    const userLoggedIn=!!token; 
    const logoutHandler=()=>{
        setToken(null)
      
    }
    const loginHandler=(token,expirationTime)=>{

        setToken(token)
  
    }
    const contextValue={
        token:token,
        isLoggedIn:userLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>
    {props.children}
    </AuthContext.Provider>
}
export { AuthContext,AuthContextProvider}