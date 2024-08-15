import React, { useState, useEffect } from 'react';
import './Header.css';

// icons 
import { FaKeyboard, FaUser } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Header = () => {
  const [username, setUsername] = useState('');

 
  const showUsername = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setUsername(data[0].username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  useEffect(() => {
    showUsername();
  })
  
  return (
    <header>
      <h1><a href="/">EleTypes</a><FaKeyboard /></h1>
      <div className="header-logs">
        <a href="/login"><FaUser /></a>
        <button className='log-out-btn'><FaArrowRightFromBracket /></button>
      </div>
    </header>
  );
}

export default Header;
