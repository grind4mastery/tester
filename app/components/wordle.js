"use client"; // Mark this file as client-side

import React, { useState } from "react";
import ConfettiComponent from "./confetti";
import Keyboard from "./keyboard"; // Import the Keyboard component

const WordleGame = () => {
  const words = ["apple", "stone"]; // Words array with only "apple" and "stone"

  const [guess, setGuess] = useState(""); // Current input guess
  const [attempts, setAttempts] = useState([]); // Track all attempts made
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(null);
  const [targetWord, setTargetWord] = useState(
    words[Math.floor(Math.random() * words.length)].toUpperCase()
  );
  const [triggerConfetti, setTriggerConfetti] = useState(false); // State to trigger confetti
  const [keyboardMode, setKeyboardMode] = useState(false); // Toggle between keyboard and input mode

  // Handle input change for text input mode
  const handleInputChange = (e) => {
    setGuess(e.target.value.toUpperCase().slice(0, 5)); // Limit input to 5 characters and convert to uppercase
  };

  // Handle key presses in keyboard mode
  const handleKeyPress = (key) => {
    if (key === "Enter") {
      submitGuess();
    } else if (key === "Backspace") {
      setGuess(guess.slice(0, -1)); // Remove the last character
    } else if (guess.length < 5) {
      setGuess(guess + key); // Add the letter to the guess
    }
  };

  const submitGuess = () => {
    if (guess.length !== 5) {
      setMessage("Please enter a 5-letter word");
      return;
    }

    let result = Array(5).fill("wrong"); // Start with all letters as wrong
    let targetWordArr = targetWord.split(""); // Copy of the target word to track usage

    // First pass: Identify correct (green) positions
    guess.split("").forEach((char, i) => {
      if (char === targetWordArr[i]) {
        result[i] = "correct"; // Correct match (correct position)
        targetWordArr[i] = null; // Mark this letter as used
      }
    });

    // Second pass: Identify close (yellow) positions, excluding already correct ones
    guess.split("").forEach((char, i) => {
      if (result[i] === "correct") return; // Skip already correct letters

      const indexInTarget = targetWordArr.indexOf(char); // Find the letter in the target word
      if (indexInTarget !== -1) {
        result[i] = "close"; // Close match (wrong position)
        targetWordArr[indexInTarget] = null; // Mark this letter as used
      }
    });

    // Store the result in attempts
    setAttempts([...attempts, { guess, result }]);
    setGuess(""); // Reset input field after submitting guess

    if (guess === targetWord) {
      setScore(6 - attempts.length); // Score based on how many attempts it took
      setMessage("Congratulations!");
      setGameOver(true);
      setTriggerConfetti(true); // Trigger confetti on correct guess
    } else if (attempts.length >= 5) {
      setMessage(`Game over! The word was ${targetWord}.`);
      setGameOver(true);
    } else {
      setMessage("Try again!");
    }
  };

  const resetGame = () => {
    setAttempts([]);
    setGuess("");
    setMessage("");
    setScore(null);
    setGameOver(false);
    setTargetWord(
      words[Math.floor(Math.random() * words.length)].toUpperCase()
    );
    setTriggerConfetti(false); // Reset confetti trigger
  };

  return (
    <div className="relative bg-gray-900 py-8 px-4 min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
        {/* Wordle Game Board Container */}
        {/* <h1 className="text-2xl font-bold mb-4 text-white">Wordle Game</h1> */}

        <div className="grid grid-rows-6 gap-2 mb-4 justify-center">
          {Array.from({ length: 6 }).map((_, attemptIndex) => (
            <div key={attemptIndex} className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, charIndex) => {
                const attempt = attempts[attemptIndex];
                const char = attempt
                  ? attempt.guess[charIndex]
                  : attemptIndex === attempts.length
                  ? guess[charIndex]
                  : ""; // Render input letters dynamically
                const result = attempt ? attempt.result[charIndex] : null;

                return (
                  <div
                    key={charIndex}
                    className={`w-12 h-12 flex items-center justify-center border-2 border-gray-700 text-lg font-bold 
                      ${result === "correct" ? "bg-green-500 text-white" : ""}
                      ${result === "close" ? "bg-yellow-300 text-black" : ""}
                      ${result === "wrong" ? "bg-gray-500 text-white" : ""}`}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Toggle between text input and on-screen keyboard */}
        {!keyboardMode ? (
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            maxLength="5"
            placeholder="Enter 5-letter word"
            className="border p-2 mb-2 text-center text-lg uppercase text-black w-full"
            disabled={gameOver}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitGuess();
              }
            }}
          />
        ) : (
          <Keyboard onKeyPress={handleKeyPress} disabled={gameOver} />
        )}

        <button
          onClick={submitGuess}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4"
          disabled={gameOver}
        >
          Submit
        </button>

        <button
          onClick={() => setKeyboardMode(!keyboardMode)}
          className="bg-gray-500 text-white py-2 px-4 rounded mt-2 w-full"
        >
          Switch to {keyboardMode ? "Text Input" : "Keyboard"}
        </button>

        <p className="mt-4 text-lg text-white">{message}</p>

        {gameOver && (
          <div className="mt-4">
            <p className="text-2xl font-bold text-white">Your Score: {score}</p>
            <button
              onClick={resetGame}
              className="bg-green-500 text-white py-2 px-4 rounded mt-2"
            >
              Go again!
            </button>
          </div>
        )}
      </div>

      {/* Trigger Confetti when the player wins */}
      {triggerConfetti && <ConfettiComponent />}
    </div>
  );
};

export default WordleGame;
