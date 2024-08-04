import React from 'react';

const Words = ({ words, currentIndex, letterIndex, inputError, wordStatus }) => {
  return (
    <div>
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
            <span
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
