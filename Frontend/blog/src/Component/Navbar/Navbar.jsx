import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    let myLink = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "Dashboard",
            path: "/dashboard"
        },
        {
            title: "Login",
            path: "/login"
        },
        {
            title: "Signup",
            path: "/signup"
        }
    ]
    let navStyle={
        backgroundColor: "blue",
        padding:"20px"
    
    }
    let linkStyle={
        color:"white",
        textDecoration:"none",
        marginRight: "400px"
        
    }
  return (
    <div style={navStyle}>
      {
        myLink.map((e) => (<Link to={e.path} style={linkStyle}>{e.title}</Link>))
      }
    </div>
  )
}

export default Navbar
