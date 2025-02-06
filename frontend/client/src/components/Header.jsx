import React, { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode"; // Corrected import

import hand from "../assets/hand.png"; // Corrected import

import { UserIcon } from '@heroicons/react/solid';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Do not render the header on the '/' route
  if (location.pathname === '/') {
    return null;
  }

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.username || 'User'); // Ensure a fallback username
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []); // Runs only once on component mount

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Token Display */}
        <div className="flex items-center text-white font-bold text-2xl">
  {user ? `Hi ${user} !` : "Not Logged In"}
  <img src={hand} alt="hand" className="ml-2 w-6 h-6" />
</div>

        {/* EME Journal Title */}
        <div className="text-3xl font-bold flex-grow text-center">EME Journal</div>

        {/* Profile Icon and Dropdown */}
        <div className="relative ml-auto">
          <div
            className="flex items-center p-2 border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition duration-200 cursor-pointer"
            onClick={toggleDropdown}
          >
            <UserIcon className="h-8 w-8 text-black" />
          </div>

          {/* Dropdown menu */}
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-blue-600 rounded-lg shadow-md">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/change-password')}>
                  Change Password
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/users-requests')}>
                  Users And Requests
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/approvals')}>
                  Approvals
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    localStorage.clear(); // Clear all stored data
                    window.location.href = '/'; // Redirect to login page
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
