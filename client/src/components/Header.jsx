import React, { useState, useEffect } from 'react';
import './Header.css';

// icons 
import { FaKeyboard, FaUser } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('/users') // Fetch from the correct endpoint
      .then(response => {
        if (!response.ok) { // Check if the response is OK (status 200-299)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          setUsername(data[0].username);
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  
  return (
    <header>
      <h1><a href="/">EleTypes</a><FaKeyboard /></h1>
      <div className="header-logs">
        <a href="/profile"><FaUser />{username}</a>
        <button className='log-out-btn'><FaArrowRightFromBracket /></button>
      </div>
    </header>
  );
}

export default Header;
