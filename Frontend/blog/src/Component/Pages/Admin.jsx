import React from 'react'
import {useState, useEffect} from 'react'

const Admin = () => {
    
    const [state, setState] = useState([]);
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useState(false)

    console.log(state);

    let url = `http://localhost:8000/admincontact`;

    const DisplayPaint = async() =>{
        const res = await fetch(url);
        const data = await res.json();
        setState(data);
        console.log(data.data);
    }

    useEffect(() =>{
        DisplayPaint();
    },[]);
   
    const handleSubmit = ((e)=> {
        if(id=="admin" && password=="admin123"){
            setAuth(true)
            alert("login successfull")
        }
    })
   
    if(auth){
return (
    <div>
         <div style = {{display: "grid", gridTemplateColumns: "repeat(2,1fr"}}>
        {state?.map((e) => {
          return (
            <div key={e}>
    <h1>Name:-{e.name}</h1>
    <h2>Email:-{e.email}</h2>
    <h3>Message:-{e.message}</h3>
    <h4>time:-{e.createdAt}</h4>            
    </div>
          )
        })
       }
        </div>
    </div>
  )
    }
    return(
        <div>
            <h1>Admin login</h1>
          
<input placeholder="id" onChange={(e) => { setId(e.target.value) }} />
        
<input placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />

<button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Admin