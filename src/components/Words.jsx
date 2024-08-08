import React from 'react';
import { useEffect, useRef, useState } from 'react';
import './Words.css';

const Words = ({ words, currentIndex, inputError, wordStatus }) => {
  const [firstRowWords, setFirstRowWords] = useState([]);

  
return (
  <div className='words-component'>
      <h1>Words List</h1>
      <div className="word-list">
        {words.map((word, index) => {
          let backgroundColor = 'transparent';
          let color = 'white';

          if (index === currentIndex) {
            backgroundColor = inputError ? 'red' : 'grey';
          } else if (index < currentIndex) {
            if (wordStatus[index] === 'correct') {
              color = 'green';
            } else if (wordStatus[index] === 'incorrect') {
              // Reset background color for incorrect words after moving to the next word
              color = 'red'
              backgroundColor = 'transparent';
            }
          }

          return (
            <span className='word'
              key={index}
              style={{
                backgroundColor,
                color,
                fontWeight: index === currentIndex ? 'bold' : 'normal',
              }}
            >
              {word.split('').map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
              {' '}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Words;
