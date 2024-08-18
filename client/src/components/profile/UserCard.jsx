import React, { useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import './UserCard.css'

const Usercard = () => {
  const [username, setUsername] = useState('');
  const [topScore, setTopScore] = useState([]);

  const showUsername = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add "Bearer" before the token
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const data = await response.json();
      console.log(data);
      setUsername(data.username); // Set the fetched username
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const showTopScore = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await fetch('http://localhost:3000/wpm', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add "Bearer" before the token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log(data);
      setTopScore(data); // Set the fetched username
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };
  
  useEffect(() => {
    showTopScore();
  }, []); // Add empty dependency array to avoid infinite loop

  useEffect(() => {
    showUsername();
  }, []); // Add empty dependency array to avoid infinite loop

  return (
    <div className='user-info'>
      <div className='img-username'>
        <FaUserCircle className='user-icon' />
        <h3 className="username">{username}</h3>        
      </div>
      <h3 className='highest-wpm-h3'>Your highest WPM</h3>
      <div className='top-score-div'>
        <div className="top-score"><span className='top-score-time'>15 seconds</span><span className='top-score-score'>{topScore}</span></div>
        <div className="top-score"><span className='top-score-time'>30 seconds</span><span className='top-score-score'>{topScore}</span></div>
        <div className="top-score"><span className='top-score-time'>60 seconds</span><span className='top-score-score'>{topScore}</span></div>
      </div>
    </div>
  )
}

export default Usercard;
