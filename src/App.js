import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/Popup";

import { useState, useEffect } from "react";
import {showNotification as show} from './helpers/helpers'
const words = [
  "development",
  "movies",
  "advertisement",
  "weather",
  "theater",
  "football",
  "example"
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setplayable] = useState(true);
  const [correctLetters, setcorrectLetters] = useState([]);
  const [wrongLetters, setworngLetters] = useState([]);
  const [showNotification, setshowNotification] = useState(false) 

  useEffect(() => {
    const handleKeyDown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setcorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setshowNotification)
          }
        } else {
          //not exist in selected word
          if (!wrongLetters.includes(letter)) {
            setworngLetters(wrongLetters => [...wrongLetters, letter]);
          } else {
            show(setshowNotification)
          }
        }
      }
    };
    window.addEventListener('keydown',handleKeyDown);
    return () => {
      window.removeEventListener('keydown',handleKeyDown);
    };
  }, [correctLetters,wrongLetters,playable]);

  function playAgain(){
    setplayable(true);

    //Empty Arrays
    setcorrectLetters([])
    setworngLetters([])
    
    const random=Math.floor(Math.random()*words.length)
    selectedWord=words[random]
  }
  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord}  
      setPlayable={setplayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
