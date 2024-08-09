import React, { useEffect, useState } from 'react';
import Words from '../components/Words';
import InputArea from '../components/InputField';
import './MainPage.css';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

//icons 
import { FaArrowsRotate } from "react-icons/fa6";

const MainPage = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [inputError, setInputError] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [wordStatus, setWordStatus] = useState([]); 
  const [time, setTime] = useState(290);
  const [isTimerRunning, setIsTimerRunning] = useState(false); 

  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('data/words.json')
      .then((response) => response.json())
      .then((data) => {
        const shuffledWords = data.lowercase.sort(() => Math.random() - 0.5);
        setWords(shuffledWords);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  

  useEffect(() => {
    let timer;
    if (isTimerRunning && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      navigate('/timesup', { state: { wpm: 20} });
    }
    return () => clearTimeout(timer);
  }, [isTimerRunning, time, correctWords, incorrectWords, navigate]);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
  };

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
    setInputError(false);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setLetterIndex(0); 
  };

  const checkLetter = (inputLetter, isBackspace) => {

    startTimer(); 
    const input = document.getElementById('input');
    const inputValue = input.value;
    console.log(inputValue, words[currentIndex]);
    setInputError(!words[currentIndex].startsWith(inputValue));
    // let newLetterIndex = letterIndex;
    // console.log(inputLetter, currentIndex, newLetterIndex, words[currentIndex][newLetterIndex]);
    // if (isBackspace) {
    //   setLetterIndex((prevIndex) => prevIndex - 1);
    //   newLetterIndex--;
    //   return;
    // }
    // if (inputLetter === words[currentIndex][newLetterIndex]) {
    //   setLetterIndex((prevIndex) => prevIndex + 1);
    //   setInputError(false); 
    // } else {
    //   console.log("Incorrect letter");
    //   setInputError(true); 
    //   if (newLetterIndex === words[currentIndex].length - 1) {
    //     // setLetterIndex(0);
    //     // setInputError(false);
    //   } else {
    //     setLetterIndex((prevIndex) => prevIndex + 1);
    //   }
    // }
  };

  const restartFunc = () => {
    setWords([]);
    setCurrentIndex(0);
    setLetterIndex(0);
    setInputError(false);
    setCorrectWords(0);
    setIncorrectWords(0);
    setWordStatus([]);
    setTime(60);
    setIsTimerRunning(false);
    fetch('data/words.json')
      .then((response) => response.json())
      .then((data) => {
        const shuffledWords = data.lowercase.sort(() => Math.random() - 0.5);
        setWords(shuffledWords);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };
  return (
    <div className='main-page'>
      <Header />
        <div className="main-container">
          <Words
            words={words}
            currentIndex={currentIndex}
            letterIndex={letterIndex}
            inputError={inputError}
            wordStatus={wordStatus} 
          />
          <div className="input-area">
            <Timer time={time} />
            <div className="typing-area">
              <InputArea checkWord={checkWord} checkLetter={checkLetter} />
              <button className='restart-btn' onClick={restartFunc}><FaArrowsRotate /></button>
            </div>
            <div className="word-counter">
              <div className='correct-words'>Correct Words: {correctWords}</div>
              <div className='incorrect-words'>Incorrect Words: {incorrectWords}</div>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default MainPage;
