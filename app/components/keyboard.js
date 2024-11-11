import React from "react";

const Keyboard = ({ onKeyPress, disabled }) => {
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
          }`}
        >
          {row.map((key, index) => (
            <button
              key={index}
              onClick={() => onKeyPress(key)}
              className="w-10 h-10 bg-gray-700 text-white rounded m-1 text-lg font-bold disabled:opacity-50"
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
