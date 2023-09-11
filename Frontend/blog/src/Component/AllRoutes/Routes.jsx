import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import Dashboard from '../Pages/Dashboard'
import Login from '../Login'
import Signup from '../Signup'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      
    </div>
  )
}

export default AllRoutes