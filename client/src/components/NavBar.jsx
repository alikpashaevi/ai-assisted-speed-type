import React from 'react';
import './NavBar.css';
import { FaAt, FaHashtag, FaChalkboard, FaRegFaceSmile , FaRegFaceMeh , FaRegFaceAngry   } from "react-icons/fa6";
import { FaMeh, FaSmile } from 'react-icons/fa';

const NavBar = ({ punctuation, defualt, numbers, timeFifteen, timeThirty, timeMinute, hard, easy, normal }) => {
  return (
    <nav>
      <div className="nav-buttons">
        <div className="punc-buttons">
          <button className='nav-btn' onClick={defualt}><FaChalkboard/>default</button>
          <button className='nav-btn' onClick={punctuation}><FaAt/>punctuation</button>
          <button className='nav-btn' onClick={numbers}><FaHashtag />numbers</button>
        </div>
        <div className="mode-buttons">
          <button className='nav-btn' onClick={easy}><FaRegFaceSmile />easy</button>
          <button className='nav-btn' onClick={normal}><FaRegFaceMeh/>normal</button>
          <button className='nav-btn' onClick={hard}><FaRegFaceAngry />hard</button>
        </div>
        <div className="time-buttons">
          <button className='nav-btn' onClick={timeFifteen}>15</button>
          <button className='nav-btn' onClick={timeThirty}>30</button>
          <button className='nav-btn' onClick={timeMinute}>60</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
