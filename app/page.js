"use client"; // Mark this as a client-side component

import { useState, useEffect } from "react";
import Confetti from "react-confetti";

// Helper function to randomly select n unique colors from a list
const getRandomColors = (colorList, num = 5) => {
  const shuffled = [...colorList].sort(() => 0.5 - Math.random()); // Shuffle the color list
  return shuffled.slice(0, num); // Select the first 'num' colors from the shuffled list
};

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });
  const [confettiColors, setConfettiColors] = useState([]);

  // Predefined set of creative colors
  const allColors = [
    "#FF5733", // Vivid Orange
    "#33FF57", // Lime Green
    "#5733FF", // Purple
    "#FF33A8", // Hot Pink
    "#33FFF7", // Cyan
    "#FF6F61", // Coral
    "#5B2C6F", // Dark Purple
    "#F39C12", // Golden Yellow
    "#1F77B4", // Bright Blue
    "#E74C3C", // Red
    "#8E44AD", // Lavender Purple
    "#F1C40F", // Sunflower Yellow
    "#1ABC9C", // Turquoise
    "#D35400", // Dark Orange
    "#3498DB", // Blue
    "#2ECC71", // Green
  ];

  useEffect(() => {
    // Ensure this runs on the client-side after mount
    setDimensions({
      width: window.innerWidth || 300,
      height: window.innerHeight || 200,
    });
    setConfettiColors(getRandomColors(allColors)); // Set initial random colors
  }, []); // Empty dependency array to run only once after the initial render

  const handleClick = () => {
    setShowConfetti(false); // Hide confetti first
    setTimeout(() => {
      setConfettiColors(getRandomColors(allColors)); // Set new random colors each click
      setShowConfetti(true); // Show confetti again, causing re-render
    }, 0); // Trigger re-render immediately
  };

  // Confetti props
  const confettiProps = {
    width: dimensions.width,
    height: dimensions.height,
    numberOfPieces: 200,
    confettiSource: { x: 0, y: 0, w: dimensions.width, h: 0 },
    friction: 0.99,
    wind: 0,
    gravity: 0.1,
    initialVelocityX: { min: -4, max: 4 }, // Horizontal range of confetti velocity
    initialVelocityY: { min: -10, max: 10 }, // Vertical range of confetti velocity
    colors: confettiColors, // Use the random colors
    opacity: 1.0,
    recycle: false, // Confetti won't keep spawning after the number of pieces is shown
    run: true, // Run the animation
    tweenDuration: 5000, // Duration of the animation (how long confetti lasts)
    tweenFunction: (currentTime, currentValue, targetValue, duration) => {
      return (
        currentValue + (targetValue - currentValue) * (currentTime / duration)
      ); // Default ease function
    },
    // Removed the drawShape to avoid overriding the color
    onConfettiComplete: (confetti) => {
      console.log("Confetti animation completed!");
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handleClick}
        style={{ padding: "20px", fontSize: "18px" }}
      >
        Celebrate!
      </button>
      {showConfetti && <Confetti {...confettiProps} />}
    </div>
  );
}
