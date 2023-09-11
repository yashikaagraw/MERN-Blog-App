import React, { useEffect } from 'react'
import { useState } from 'react'
import { MyAuthContext } from '../Context/AuthContextProvider'
import { useContext } from 'react'
const Dashboard = () => {

    const[state, setState] = useState([])
    const[filter, setFilter] = useState("")
    console.log(filter)
   // console.log(state)
    const { login, logout, isAuth } = useContext(MyAuthContext)
    
    const fetchdata= async() => {
        let url= `https://jsonplaceholder.typicode.com/todos`
        if(filter==="yes"){
            url+="?completed=true"
        }
        if(filter==="no"){
            url+="?completed=false"
        }
        const response = await fetch(url)
        const data= await response.json();
        console.log(data);
        setState(data)
    }

    useEffect(()=> {
        fetchdata()
    }, [filter])

    const handlelogout= () => {
        logout()
 
    }
    useEffect(()=> {
        fetchdata()
    }, [])

  

    
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handlelogout}>Log Out</button>
      <select onChange={(e)=>setFilter(e.target.value)}>
        <option>filtering</option>
        <option value="yes">completed</option>
        <option value="no">incompleted</option>
      </select>
      
      {
        state?.map((e)=> {
            return(
                <div>
                    <h2>title: {e.title}</h2>
                    <h3>userId : {e.userId}</h3>
                    <h4>completed: {e.completed ? "YES" : "NO"}</h4>
                </div>
            )

        })
      }
    </div>
  )
}

export default Dashboard
