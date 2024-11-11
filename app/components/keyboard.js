import React from "react";
import { useMediaQuery } from "react-responsive";

const Keyboard = ({ onKeyPress, disabled }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], // First row
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"], // Second row
    ["Z", "X", "C", "V", "B", "N", "M", "Backspace", "Enter"], // Third row
  ];

  return (
    <div className="flex flex-col items-center w-full mt-4 px-2">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between w-full mb-2">
          {row.map((key, index) => (
            <button
              key={index}
              onClick={() => onKeyPress(key)}
              className={`${
                isMobile
                  ? "flex-1 mx-0.5 py-2 text-lg"
                  : "w-10 h-10 mx-1 text-base"
              } bg-gray-700 text-white rounded font-bold disabled:opacity-50`}
              disabled={disabled}
              style={{
                flexBasis: isMobile ? "10%" : "auto", // Each button takes up 10% width on mobile
              }}
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
