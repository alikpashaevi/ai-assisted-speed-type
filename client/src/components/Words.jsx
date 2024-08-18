import React, { useRef, useEffect, useState } from 'react';
import './Words.css';

const Words = ({ words, currentIndex, inputError, wordStatus, onWordPositionChange, reset }) => {
  const currentWordRef = useRef(null);
  const parentRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    if (reset) {
      setTranslateY(0); // Reset the translation on restart
    }
  }, [reset]);

  useEffect(() => {
    if (currentWordRef.current && parentRef.current) {
      const wordRect = currentWordRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      const relativeBottom = wordRect.bottom - parentRect.bottom;

      if (relativeBottom > 0) {
        setTranslateY((prevTranslateY) => prevTranslateY - 38); // Move up by 38px
        onWordPositionChange(relativeBottom);
      }
    }
  }, [currentIndex, onWordPositionChange]);

  return (
    <div className='words-component'>
      <div className="type-box" ref={parentRef}>
        <div className='word-list' style={{ transform: `translateY(${translateY}px)` }}>
          {words.map((word, index) => {
            let backgroundColor = 'transparent';
            let color = 'white';

            if (index === currentIndex) {
              backgroundColor = inputError ? 'red' : 'grey';
            } else if (index < currentIndex) {
              if (wordStatus[index] === 'correct') {
                color = 'green';
              } else if (wordStatus[index] === 'incorrect') {
                color = 'red';
                backgroundColor = 'transparent';
              }
            }

            return (
              <span
                className='word'
                key={index}
                ref={index === currentIndex ? currentWordRef : null}
                style={{ backgroundColor, color }}
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
    </div>
  );
};

export default Words;
