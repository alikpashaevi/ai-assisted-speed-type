import React, { useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import './UserCard.css'

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
        <h3 className="username">alik{username}</h3>        
      </div>
      <h3 className='highest-wpm-h3'>Your highest WPM</h3>
      <div className='top-score-div'>
        <div className="top-score"><span className='top-score-time'>15 seconds</span><span className='top-score-score'>60</span></div>
        <div className="top-score"><span className='top-score-time'>30 seconds</span><span className='top-score-score'>60</span></div>
        <div className="top-score"><span className='top-score-time'>60 seconds</span><span className='top-score-score'>60</span></div>
      </div>
    </div>
  )
}

export default Usercard