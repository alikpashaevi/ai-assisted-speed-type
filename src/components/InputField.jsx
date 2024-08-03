import React, { useState } from 'react';

function InputArea({ checkWord, checkLetter }) {
  const [inputText, setInputText] = useState('');

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);

    if (newValue.length > 0) {
      checkLetter(newValue[newValue.length - 1]);
    }

    if (newValue.slice(-1) === ' ') {
      checkWord(newValue.trim());
      setInputText('');
    }
  }

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
    </div>
  );
}

export default InputArea;
