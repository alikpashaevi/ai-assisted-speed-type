import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const TimesUpPage = () => {
  const location = useLocation();
  const { wpm } = location.state || {}; 

  const sendWpmToServer = async () => {
    try {
      const response = await fetch('http://localhost:3000/wpm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      <h1>Time's Up!</h1>
      <p>Your typing session has ended.</p>
      <p>Your WPM (Words Per Minute): {wpm}</p>
    </div>
  );
};

export default TimesUpPage;
