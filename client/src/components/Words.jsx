import React, { useRef, useEffect, useState } from 'react';
import './Words.css';
import { FaLessThanEqual } from 'react-icons/fa';

const Words = ({ words, currentIndex, inputError, wordStatus, onWordPositionChange }) => {
  const [newLine, setNewLine] = useState(false);
  const currentWordRef = useRef(null);
  const parentRef = useRef(null);
  const [firstWordTop, setFirstWordTop] = useState(null);
  const [numberOfLines, setNumberOfLines] = useState(0);

  useEffect(() => {
    if (currentWordRef.current && parentRef.current) {
      const wordRect = currentWordRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      const relativeTop = wordRect.top - parentRect.top;
      let lineNumber = 0;
      // Capture the top position of the first word 
      if (currentIndex === 0 && firstWordTop === null) {
        setFirstWordTop(relativeTop);
      }
      if (relativeTop > 40) {
        lineNumber++;
        setNumberOfLines(lineNumber);
        setNewLine(true);
      } else {
        setNewLine(false);
      }
      if (currentIndex === 0) {
        setNewLine(false)
      }
      // if (relativeTop > 78) {
      //   setNewLine(true)
      // }

      // Determine if the word has moved to the third line
      if (firstWordTop !== null && relativeTop > firstWordTop + wordRect.height) {
        setNewLine(true);
        if (firstWordTop < 0) {
          setNewLine(false)
        }
      }
      console.log(relativeTop)
      console.log(firstWordTop)
      console.log(newLine)
      onWordPositionChange(relativeTop);
    }
  }, [currentIndex, firstWordTop, onWordPositionChange]);

  return (
    <div className='words-component'>
      <div className="type-box" ref={parentRef}>
        <div className='word-list' style={newLine ? { transform: `translateY(-${numberOfLines * 38}px)` } : {}}> 
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
