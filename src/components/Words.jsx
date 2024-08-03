import React from 'react';

const Words = ({ words, currentIndex, letterIndex, inputError }) => {
  return (
    <div>
      <h1>Words List</h1>
      <div className="word-list">
        {words.map((word, index) => (
          <span
            key={index}
            style={{
              backgroundColor: index === currentIndex ? (inputError ? 'red' : 'green') : 'white',
              fontWeight: index === currentIndex ? 'bold' : 'normal',
            }}
          >
            {word.split('').map((letter, i) => (
              <span
                key={i}
              >
                {letter}
              </span>
            ))}
            {' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Words;
