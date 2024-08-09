import React from 'react';
import { useLocation } from 'react-router-dom';

const TimesUpPage = () => {
  const location = useLocation();
  const { wpm } = location.state || {}; 

  return (
    <div>
      <h1>Time's Up!</h1>
      <p>Your typing session has ended.</p>
      <p>Your WPM (Words Per Minute): {wpm}</p>
    </div>
  );
};

export default TimesUpPage;
