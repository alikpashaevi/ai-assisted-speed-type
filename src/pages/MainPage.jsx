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
  const [time, setTime] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false); 
  const [correctWordList, setCorrectWordList] = useState([]);
  const [incorrectWordList, setIncorrectWordList] = useState([]);


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
      let wpm = Math.round((correctWords / 5) * (60 / 5));
      navigate('/timesup', { state: { wpm: wpm} });
    }
    return () => clearTimeout(timer);
  }, [isTimerRunning, time, correctWords, incorrectWords, navigate]);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
  };

  const checkWord = (inputWord) => {
    const currentWord = words[currentIndex];
    
    if (currentWord === inputWord.trim()) {
      setCorrectWords((prevCount) => prevCount + 1);
      setInputError(false);
      setWordStatus((prevStatus) => [...prevStatus, 'correct']);
      setCorrectWordList((prevList) => [...prevList, inputWord.trim()]);
    } else {
      setIncorrectWords((prevCount) => prevCount + 1);
      setInputError(true);
      setWordStatus((prevStatus) => [...prevStatus, 'incorrect']);
      setIncorrectWordList((prevList) => [...prevList, inputWord.trim()]);
    }
  
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setLetterIndex(0); 
  };

  const compareWords = (correctList, incorrectList) => {
    let result = [];
  
    incorrectList.forEach((word, index) => {
      let correctWord = words[index];
      let matchingLetters = 0;
      let extraLetters = 0;
      let incorrectLetters = 0;
  
      word.split('').forEach((letter, i) => {
        if (correctWord[i] === letter) {
          matchingLetters++;
        } else if (!correctWord.includes(letter)) {
          extraLetters++;
        } else {
          incorrectLetters++;
        }
      });
  
      result.push({
        word: word,
        matchingLetters: matchingLetters,
        extraLetters: extraLetters,
        incorrectLetters: incorrectLetters
      });
    });
  
    return result;
  };
  

  const checkLetter = () => {
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
    setCorrectWordList([]);
    setIncorrectWordList([]);
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

  const comparisonResults = compareWords(correctWordList, incorrectWordList);

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
