"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "No Small Bites. Only Boss Bites",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "Taste Like a Boss",
    image: "/temporary/p9.png",
  },
  {
    id: 3,
    title: "The Burger That Calls the Shots",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] bg-zinc-950 overflow-hidden">
      {/* LEFT */}
      <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-8 lg:px-20 py-12">
        <span className="uppercase tracking-[8px] text-yellow-500 text-sm">
          Boss Burger
        </span>

        <h1 className="mt-6 text-5xl md:text-6xl xl:text-7xl font-black text-white leading-tight">
          {slides[currentSlide].title}
        </h1>

        <p className="mt-6 text-zinc-400 text-lg leading-8 max-w-xl">
          Fresh beef, melted cheddar cheese, crispy fries, and handcrafted
          burgers made with premium ingredients for true burger lovers.
        </p>

        <button className="mt-10 rounded-full bg-yellow-500 px-10 py-4 text-lg font-bold text-black transition duration-300 hover:scale-105 hover:bg-yellow-400">
          Order Now
        </button>

        {/* Dots */}
        <div className="mt-10 flex gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                currentSlide === index
                  ? "w-10 h-3 rounded-full bg-yellow-500"
                  : "w-3 h-3 rounded-full bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex-1 flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <Image
          key={slides[currentSlide].id}
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          fill
          priority
          className="object-contain p-8 lg:p-12 animate-fade"
        />
      </div>
    </section>
  );
};

export default Slider;