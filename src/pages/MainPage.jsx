import React, {useEffect, useState} from 'react'
import Words from '../components/Words';
import InputArea from '../components/InputField';

const MainPage = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    fetch('data/words.json')
      .then((response) => response.json())
      .then((data) => setWords(data.lowercase))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const checkWord = (inputWord) => {
    if (words[currentIndex] === inputWord.trim()) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setLetterIndex(0); // Reset letter index for next word
      setInputError(false);
    }
  };


  const checkLetter = (inputLetter) => {
    if (inputLetter === words[currentIndex][letterIndex]) {
      setLetterIndex((prevIndex) => prevIndex + 1);
      setInputError(false); // Correct letter, no error
    } else {
      setInputError(true); // Incorrect letter, set error state
    }
  };

  return (
    <div>
      <Words
        words={words}
        currentIndex={currentIndex}
        letterIndex={letterIndex}
        inputError={inputError}
      />
      <InputArea checkWord={checkWord} checkLetter={checkLetter} />
    </div>
  );

}

export default MainPage