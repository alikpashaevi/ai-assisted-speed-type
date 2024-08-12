import React, { useState } from 'react';
import './InputField.css';

function InputArea({ checkWord, checkLetter }) {
  const [inputText, setInputText] = useState('');

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);

    const isBackspace = event.nativeEvent.inputType === 'deleteContentBackward';

    
    checkLetter(newValue[newValue.length - 1], isBackspace);

    if (newValue.slice(-1) === ' ') {
      checkWord(newValue.trim());
      setInputText('');
    }
  }

  return (
    <div className="form">
      <input id='input' onChange={handleChange} type="text" value={inputText} autoComplete="off" autofocus="autofocus" />
    </div>
  );
}

export default InputArea;
