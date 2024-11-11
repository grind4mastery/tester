"use client"; // Mark this as a client-side component

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

// Define an expanded array of creative colors
const colorList = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ff7f00",
  "#800080",
  "#008000",
  "#ff1493",
  "#ff6347",
  "#7fff00",
  "#d2691e",
  "#000080",
  "#ff4500",
  "#1e90ff",
  "#ffd700",
  "#2e8b57",
  "#f0e68c",
  "#dda0dd",
  "#90ee90",
  "#ff8c00",
  "#4b0082",
  "#b22222",
  "#5f9ea0",
  "#8a2be2",
  "#a52a2a",
  "#deb887",
  "#bc8f8f",
  "#f4a460",
  "#00bfff",
  "#c71585",
  "#9932cc",
  "#ff69b4",
  "#32cd32",
  "#ffb6c1",
  "#48d1cc",
  "#cd5c5c",
  "#7b68ee",
  "#ffdead",
  "#8fbc8f",
  "#dda0dd",
  "#ffdab9",
  "#f5f5f5",
  "#ff8c69",
  "#d3d3d3",
  "#ff0000",
  "#b0e0e6",
  "#f08080",
  "#adff2f",
];

function getRandomColors(colors, count) {
  const shuffled = [...colors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function ConfettiComponent() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [colors, setColors] = useState(getRandomColors(colorList, 5));

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        numberOfPieces={500}
        recycle={false}
        colors={colors} // Pass the randomly selected colors here
      />
    </div>
  );
}
