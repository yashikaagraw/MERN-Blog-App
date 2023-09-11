import { useContext } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
//import { myAuthContext } from '../Context/AuthContextProvider'
import { MyAuthContext } from './Context/AuthContextProvider'
const initialState = {email : "", 
password : ""
}
const Login = () => {
    const[state, setState] = useState(initialState)
    console.log(state);

    const { login, logout, isAuth } = useContext(MyAuthContext)
    const handleinput = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }

    const handleSubmit=()=>{
        fetch("http://localhost:8000/login",{ 
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(state)
        })
        
        //.then(res => console.log(res));
        .then((res) => res.json())
        .then((res) => login(res.token));
         //alert("logged in")
     }
    
     if(isAuth){
        return <Navigate to="/dashboard"/>
     }

  return (
    <div>
      <h1>Login</h1>
      <input name='email' placeholder='email' onChange={handleinput}></input>
      <input name='password' placeholder='password' onChange={handleinput}></input>
      <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login
