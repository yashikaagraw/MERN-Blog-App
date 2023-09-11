import React from 'react'
import { useState } from 'react'
  
const initialvalue = {
    name : "",
    email : "",
    password : ""
}
const Signup = () => {
    const[state, setState] = useState(initialvalue)
    console.log(state);

    const handleinput = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }

    
        const handleSubmit =()=> {
          const requestOptions = {
           method: "POST",
           headers: {"Content-Type":"application/json"},
           body: JSON.stringify(state),
          };
          fetch("http://localhost:8000/signup", requestOptions)
          .then((response)=> response.json())
          .then((data)=> console.log(data));
          alert("post successfully")
        }
    
  return (
    <div>
      <h1>Signup</h1>
      <input name='name' placeholder='name' onChange={handleinput}></input>
      <input name='email' placeholder='email' onChange={handleinput}></input>
      <input name='password' placeholder='password' onChange={handleinput}></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Signup
