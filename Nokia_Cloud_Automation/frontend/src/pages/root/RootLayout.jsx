import React from 'react'
import Navbar from '../../components/shared/NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import AuthService from "../../api/authService"

const RootLayout = () => {
  const access_token = AuthService.getAccessToken();

  return (
    access_token ?  
      <>
        <Navbar />
        <div className="bg-darkBackground w-full min-h-screen" >
          <Outlet/>
        </div>
      </>
    : <Navigate to='/auth/login'/>
  )
}

export default RootLayout