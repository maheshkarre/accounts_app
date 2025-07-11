"use client";

import { useEffect, useState } from "react";

const images = [
  "/college1.jpg",
  "/college2.jpg",
  "/college3.jpg"
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      {/* Background slideshow */}
      {images.map((src, index) => (
        <img
          key={src + index}
          src={src}
          alt=""
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

      {/* Navigation arrows */}
      <div className="absolute inset-0 flex justify-between items-center px-6 z-20">
        <button
          onClick={goPrev}
          className="bg-white hover:bg-gray-200 text-black rounded-full w-12 h-12 flex items-center justify-center shadow-md transition"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="bg-white hover:bg-gray-200 text-black rounded-full w-12 h-12 flex items-center justify-center shadow-md transition"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center items-center px-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10 rounded-xl shadow-2xl border border-white/10 max-w-lg w-full text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-wide">
            Welcome to CJITS
          </h1>
          <p className="text-md text-gray-300 mb-6">
            Empowering education through smart digital access.
          </p>
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-full transition"
          >
            Login to Continue
          </a>
        </div>
      </div>
    </div>
  );
}
