import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

const TimesUpPage = () => {
  const location = useLocation();
  const { wpm } = location.state || {}; 

  console.log('WPM:', typeof(wpm));
  const sendWpmToServer = async () => {
    try {
      console.log(JSON.stringify({ wpm })); // Log what you're sending to the server
      const response = await fetch('http://localhost:3000/wpm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ wpm }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send WPM to server');
      }
      
      console.log('WPM sent successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    if (wpm) {
      sendWpmToServer();
    }
  }, [wpm]);

  return (
    <div>
      <Header />
      <h1>Time's Up!</h1>
      <p>Your typing session has ended.</p>
      <p>Your WPM (Words Per Minute): {wpm}</p>
    </div>
  );
};

export default TimesUpPage;
