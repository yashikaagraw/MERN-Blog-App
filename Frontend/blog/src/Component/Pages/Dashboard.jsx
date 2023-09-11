import React from 'react'
import { useState } from 'react'
import { MyAuthContext } from '../Context/AuthContextProvider'
import { useContext } from 'react'
const Dashboard = () => {

    const[state, setState] = useState(false)
     
    const { login, logout, isAuth } = useContext(MyAuthContext)

    const handlelogout= () => {
        logout()
 
    }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handlelogout}>Log Out</button>
    </div>
  )
}

export default Dashboard
