import React, { useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";

const Usercard = () => {
  const [username, setUsername] = useState('');
  const [topScore, setTopScore] = useState([]);

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
    <div className='user-info'>
      <div className='img-username'>
        <FaUserCircle className='user-icon' />
        <h3 className="username">{username}</h3>        
      </div>
      <div className='top-score-div'>
        <div className="top-score"><span>15 seconds</span><span>60wpm</span></div>
        <div className="top-score"><span>30 seconds</span><span>60wpm</span></div>
        <div className="top-score"><span>60 seconds</span><span>60wpm</span></div>
      </div>
    </div>
  )
}

export default Usercard