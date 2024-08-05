import React, { useEffect, useState } from 'react';
import Words from '../components/Words';
import InputArea from '../components/InputField';
import  './MainPage.css';

const MainPage = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [inputError, setInputError] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [wordStatus, setWordStatus] = useState([]); // Array to track correctness of words

  useEffect(() => {
    fetch('data/words.json')
      .then((response) => response.json())
      .then((data) => setWords(data.lowercase))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const checkWord = (inputWord) => {
    if (words[currentIndex] === inputWord.trim()) {
      setCorrectWords((prevCount) => prevCount + 1);
      setInputError(false);
      setWordStatus((prevStatus) => [...prevStatus, 'correct']);
    } else {
      setIncorrectWords((prevCount) => prevCount + 1);
      setInputError(true);
      setWordStatus((prevStatus) => [...prevStatus, 'incorrect']);
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setLetterIndex(0); // Reset letter index for next word

  };

  const checkLetter = (inputLetter) => {
    if (inputLetter === words[currentIndex][letterIndex]) {
      setLetterIndex((prevIndex) => prevIndex + 1);
      setInputError(false); // Correct letter, no error
    } else {
      setInputError(true); // Incorrect letter, set error state
      if (letterIndex === words[currentIndex].length - 1) {
        setLetterIndex(0); // Reset letter index for next word
        setInputError(false);
      } else {
        setLetterIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  return (
    <div className='main-page'>
      <Words
        words={words}
        currentIndex={currentIndex}
        letterIndex={letterIndex}
        inputError={inputError}
        wordStatus={wordStatus} // Pass the wordStatus to Words component
      />
      <InputArea checkWord={checkWord} checkLetter={checkLetter} />
      <div>Correct Words: {correctWords}</div>
      <div>Incorrect Words: {incorrectWords}</div>
    </div>
  );
}

export default MainPage;
