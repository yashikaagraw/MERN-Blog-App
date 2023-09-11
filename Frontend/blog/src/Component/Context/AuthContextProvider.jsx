import { createContext } from "react";
import { useState } from "react";
export const MyAuthContext = createContext(); //box

function AuthContextProvider({children}) {
 const[isAuth, setIsAuth] = useState(false)
//  const[token, setToken] = useState("")
console.log(isAuth);

 const login = () => {
 setIsAuth(true);
 
 }
// console.log(token);
 const logout = () => {
 setIsAuth(false);
 }
    return(
        // value is used for send info
     <MyAuthContext.Provider value = {{isAuth, login, logout}}>{children}</MyAuthContext.Provider>
    )
}

export default AuthContextProvider;