import React, { useState } from 'react';

function InputArea({ checkWord }) {
  const [inputText, setInputText] = useState('');

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);

    if (newValue.slice(-1) === ' ') {
      checkWord(newValue);
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
