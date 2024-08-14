import React, { useState, useEffect } from 'react';
import './Header.css';

// icons 
import { FaKeyboard, FaUser } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Header = () => {
  const [username, setUsername] = useState('');

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/profile', {
  //         method: 'GET',
  //         credentials: 'include', // Include credentials (cookies) with the request
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setUsername(data.username);
  //       } else {
  //         console.log('Failed to fetch profile');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching profile:', error);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  return (
    <header>
      <h1><a href="/">EleTypes</a><FaKeyboard /></h1>
      <div className="header-logs">
        <a href="/login"><FaUser /> {username ? username : 'Login'}</a>
        <button className='log-out-btn'><FaArrowRightFromBracket /></button>
      </div>
    </header>
  );
}

export default Header;
