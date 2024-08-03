import React, { useEffect, useState } from 'react';
import Words from './components/Words';
import InputArea from './components/InputField';

const App = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('data/words.json')
      .then((response) => response.json())
      .then((data) => setWords(data.lowercase))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const checkWord = (inputWord) => {
    if (words[currentIndex] === inputWord.trim()) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      <Words words={words} currentIndex={currentIndex} />
      <InputArea checkWord={checkWord} />
    </div>
  );
};

export default App;
