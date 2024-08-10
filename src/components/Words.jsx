import React, { useRef, useEffect, useState } from 'react';
import './Words.css';
import { FaLessThanEqual } from 'react-icons/fa';

const Words = ({ words, currentIndex, inputError, wordStatus, onWordPositionChange }) => {
  const [newLine, setNewLine] = useState(false);
  const currentWordRef = useRef(null);
  const parentRef = useRef(null);
  const [firstWordTop, setFirstWordTop] = useState(null);

  useEffect(() => {
    if (currentWordRef.current && parentRef.current) {
      const wordRect = currentWordRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      const relativeTop = wordRect.top - parentRect.top;

      // Capture the top position of the first word 
      if (currentIndex === 0 && firstWordTop === null) {
        setFirstWordTop(relativeTop);
      }
      if (currentIndex === 0) {
        setNewLine(false)
      }
      // if (relativeTop > 78) {
      //   setNewLine(true)
      // }

      // Determine if the word has moved to the third line
      if (firstWordTop !== null && relativeTop > firstWordTop + 1 * wordRect.height) {
        setNewLine(true);
        if (firstWordTop < 0) {
          setNewLine(false)
        }
      }

      onWordPositionChange(relativeTop);
    }
  }, [currentIndex, firstWordTop, onWordPositionChange]);

  return (
    <div className='words-component'>
      <div className="type-box" ref={parentRef}>
        <div className={`word-list ${newLine ? 'moved-up': ''}`}  >
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
                ref={index === currentIndex ? currentWordRef : null} // Attach the ref to the current word
                style={{
                  backgroundColor,
                  color,
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
    </div>
  );
};

export default Words;
