import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import Dashboard from '../Pages/Dashboard'
import Login from '../Login'
import Signup from '../Signup'
import PrivateRout from './PrivateRoute'
import Contact from '../Pages/Contact'
import Admin from '../Pages/Admin'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Signup />}></Route>
            <Route path='/dashboard' element={<PrivateRout ><Dashboard /></PrivateRout>}></Route>

            <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={<HomePage />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
        </Routes>
      
    </div>
  )
}

export default AllRoutes
