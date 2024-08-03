import React from 'react';

const Words = ({ words, currentIndex }) => {
  return (
    <div>
      <h1>Words List</h1>
      <div className="word-list">
        {words.map((word, index) => (
          <span
            key={index}
            style={{
              color: index === currentIndex ? 'green' : 'black',
              fontWeight: index === currentIndex ? 'bold' : 'normal',
            }}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Words;
