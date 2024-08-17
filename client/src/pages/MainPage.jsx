import React, { useEffect, useState } from 'react';
import Words from '../components/Words';
import InputArea from '../components/InputField';
import './MainPage.css';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

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
  const [wordTopPosition, setWordTopPosition] = useState(0);
  const [mode, setMode] = useState('hard');
  const [timeLimit, setTimeLimit] = useState(60);
  const [contentType, setContentType] = useState('default');
  const [divisionVar, setDivisionVar] = useState(1);
  const [resetWords, setResetWords] = useState(false);

  const navigate = useNavigate(); 

  const handleSetMode = (mode) => {
    setMode(mode);
    console.log(mode)
    restartFunc(); // Restart game with new mode
  };

  const handleSetTime = (time) => {
    setTimeLimit(time);
    setTime(time);
    if(time === 15) {
      setDivisionVar(.25);
    } else if(time === 30) {
      setDivisionVar(.5);
    } else if(time === 60) {
      setDivisionVar(1);
    }
    restartFunc(); // Restart game with new time limit
  };

  const handleSetContentType = (type) => {
    setContentType(type);
    restartFunc(); // Restart game with new content type
  };

  const handleWordPositionChange = (top) => {
    setWordTopPosition(top);
  };

  useEffect(() => {
    fetchWords();
  }, [contentType, mode]);
  

  
  const fetchWords = () => {
    fetch('data/words.json')
      .then((response) => response.json())
      .then((data) => {
        let wordList = [];
        if (mode === 'easy') {
          wordList = data.easyWords;
        } else if (mode === 'normal') {
          wordList = data.normalWords;
        } else if (mode === 'hard') {
          wordList = data.hardWords;
        } else if (contentType === 'punctuation') {
          wordList = data.punctuation;
        } else if (contentType === 'numbers') {
          // wordList = numberMix;
        }
        const shuffledWords = wordList.sort(() => Math.random() - 0.5);
        setWords(shuffledWords);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    setTime(timeLimit); // Reset time to timeLimit when timeLimit changes
  }, [timeLimit]);

  useEffect(() => {
    let timer;
    if (isTimerRunning && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      navigate('/timesup', { state: { wpm: Math.round(correctWords / divisionVar)} });
    }
    return () => clearTimeout(timer);
  }, [isTimerRunning, time, navigate, timeLimit]);

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
    const input = document.getElementById('input');
    if(input.value.length > 0) {
      setIsTimerRunning(true);
    }
      console.log("timer"+isTimerRunning)
      const inputValue = input.value;
    setInputError(!words[currentIndex].startsWith(inputValue));
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
    setTime(timeLimit);
    setIsTimerRunning(false);
    setResetWords(true);
    fetchWords();
  };

  useEffect(() => {
    setResetWords(false); // Reset the flag after restart
  }, [resetWords]);
  
  const comparisonResults = compareWords(correctWordList, incorrectWordList);
  
  return (
    <div className='main-page'>
      <Header />
        <div className="main-container">
        <NavBar 
          defualt={() => handleSetContentType('default')} 
          punctuation={() => handleSetContentType('punctuation')} 
          numbers={() => handleSetContentType('numbers')}
          timeFifteen={() => handleSetTime(15)}
          timeThirty={() => handleSetTime(30)}
          timeMinute={() => handleSetTime(60)}
          easy={() => handleSetMode('easy')}
          normal={() => handleSetMode('normal')}
          hard={() => handleSetMode('hard')}
        />
          <Words
            words={words}
            currentIndex={currentIndex}
            letterIndex={letterIndex}
            inputError={inputError}
            wordStatus={wordStatus} 
            onWordPositionChange={handleWordPositionChange} 
            reset={resetWords}
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
