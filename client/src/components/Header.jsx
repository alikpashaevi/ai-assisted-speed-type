import React, { useState, useEffect } from 'react';
import './Header.css';

// icons 
import { FaKeyboard, FaUser } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
 
  const showUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          return;
      }
      const response = await fetch('http://localhost:3000/users', {
  
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if(!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      console.log(data);
      setUsername(data.username);
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
        <Link to={username ? "/profile": "/login"} className="header-link"><FaUser/>{username}</Link>
        <button onClick={logout} className='log-out-btn'><FaArrowRightFromBracket /></button>
      </div>
    </header>
  );
}

export default Header;
