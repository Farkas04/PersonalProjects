import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import nokia_logo from "../../../public/nokia-logo.png"; // Ensure path is correct
import AuthService from "../../api/authService"

const AuthLayout = () => {
  const access_token = AuthService.getAccessToken();

  return ( 
    access_token ? 
      <Navigate to="/" /> 
    :
      <div className='flex justify-center items-center flex-row w-full'>
        <div className="flex justify-center items-center h-screen w-screen" style={{ backgroundImage: `url(${nokia_logo})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
          <div className="w-full max-w-md items-center flex justify-center flex-col bg-white bg-opacity-80 shadow-md rounded px-2 pt-6 pb-8 mb-4">
            <Outlet />
          </div>
        </div>
      </div>
  );
};

export default AuthLayout;