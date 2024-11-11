// app/page.js or app/home/page.js

import WordleGame from "./components/wordle";

export const metadata = {
  title: "Wordle Game",
  description:
    "Play the popular Wordle game online. Guess the 5-letter word and challenge your vocabulary!",
  openGraph: {
    type: "website",
    url: "https://yourdomain.com", // Adjust to the actual URL
    title: "Wordle Game",
    description: "Play the Wordle game online, and improve your word skills!",
    images: [
      {
        url: "https://yourdomain.com/path-to-image.jpg", // Optional image for social sharing
        width: 1200,
        height: 630,
        alt: "Wordle Game",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function Home() {
  return (
    <div>
      {/* Render WordleGame component */}
      <WordleGame />
    </div>
  );
}
