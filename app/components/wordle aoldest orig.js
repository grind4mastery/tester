"use client"; // Mark this file as client-side

import React, { useState } from "react";
import ConfettiComponent from "./confetti"; // Import the ConfettiComponent

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

  const handleInputChange = (e) => {
    // Limit input to 5 characters and convert to uppercase
    setGuess(e.target.value.toUpperCase().slice(0, 5));
  };

  const submitGuess = () => {
    if (guess.length !== 5) {
      setMessage("Please enter a 5-letter word");
      return;
    }

    // Check the guess result only after the player submits
    const result = guess.split("").map((char, i) => {
      if (char === targetWord[i]) return "correct";
      if (targetWord.includes(char)) return "close";
      return "wrong";
    });

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
    <div className="relative bg-gray-900 py-8">
      <div className="flex justify-center items-start w-full max-w-4xl mx-auto">
        {/* Wordle Game Board Container */}
        <div className="flex flex-col items-center max-w-sm">
          <h1 className="text-2xl font-bold mb-4">Wordle Game</h1>

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
                      className={`w-12 h-16 flex items-center justify-center border-2 border-gray-700 text-lg font-bold 
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

          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            maxLength="5"
            placeholder="Enter 5-letter word"
            className="border p-2 mb-2 text-center text-lg uppercase text-black"
            disabled={gameOver}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitGuess();
              }
            }}
          />
          <button
            onClick={submitGuess}
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={gameOver}
          >
            Submit
          </button>

          <p className="mt-4 text-lg">{message}</p>

          {gameOver && (
            <div className="mt-4">
              <p className="text-2xl font-bold">Your Score: {score}</p>
              <button
                onClick={resetGame}
                className="bg-green-500 text-white py-2 px-4 rounded mt-2"
              >
                Go again!
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trigger Confetti when the player wins */}
      {triggerConfetti && <ConfettiComponent />}
    </div>
  );
};

export default WordleGame;
