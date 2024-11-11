import React from "react";
import { useMediaQuery } from "react-responsive";

const Keyboard = ({ onKeyPress, disabled }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Detect mobile screen

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], // First row
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"], // Second row
    ["Z", "X", "C", "V", "B", "N", "M", "Backspace", "Enter"], // Third row (special keys at the end)
  ];

  return (
    <div className="flex flex-col items-center w-full mt-4">
      {keyboardRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex justify-center w-full ${
            rowIndex === 1 ? "mb-2" : "mb-1"
          } ${isMobile ? "flex-wrap" : ""}`} // Enable wrapping on mobile
        >
          {row.map((key, index) => (
            <button
              key={index}
              onClick={() => onKeyPress(key)}
              className={`${
                isMobile ? "w-8 h-8 text-base" : "w-10 h-10 text-lg"
              } bg-gray-700 text-white rounded m-1 font-bold disabled:opacity-50`}
              disabled={disabled}
            >
              {key === "Backspace" ? "←" : key === "Enter" ? "⏎" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
