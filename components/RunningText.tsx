"use client";

import { useEffect, useState } from "react";

const texts = [
  "✨ AI-powered Summaries",
  "✍ Improve Writing Instantly",
  "🏷 Auto Generate Tags",
  "🔒 Secure Authentication",
];

export default function RunningText() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true); // fade in
      }, 300); // fade duration

    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 h-8 flex items-center justify-center">
      <p
        className={`text-lg font-medium text-indigo-600 dark:text-indigo-400 transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {texts[index]}
      </p>
    </div>
  );
}
