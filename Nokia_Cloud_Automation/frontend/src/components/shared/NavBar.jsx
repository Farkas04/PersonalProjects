import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle } from 'react-icons/fa';  // Import icons
import AuthService from '../../api/authService';
import logo from "../../../public/logo_navbar.jpg"

const Navbar = () => {

    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    return (
        <div className="fixed w-full font-poppins font-semibold bg-white text-nokiaBlue flex justify-between items-center p-4">
            <div>
                <Link to="/">
                    <img src= { logo } alt="Placeholder" className="w-32" />
                </Link>
            </div>
            <div className="flex items-center">
                <Link to="/profile" className="flex items-center mr-4">
                    <FaUser className="h-6 w-6" /> {/* User icon */}
                    <span className="ml-2">Profile</span>
                </Link>
                {/* <Link to="/settings" className="flex items-center mr-4">
                    <FaCog className="h-6 w-6" /> Settings icon
                    <span className="ml-2">Settings</span>
                </Link> */}
                <Link to="/help" className="flex items-center">
                    <FaQuestionCircle className="h-6 w-6" /> {/* Help icon */}
                    <span className="ml-2">Help</span>
                </Link>
                <button className="flex items-center mx-3 px-2 border rounded-md border-nokiaBlue" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Navbar;