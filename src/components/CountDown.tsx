"use client";

import React, { useEffect, useState } from "react";

const targetDate = new Date("2026-12-31T23:59:59").getTime();

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetDate - Date.now();

      if (difference <= 0) {
        setTimeLeft(0);
        return;
      }

      setTimeLeft(difference);
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <span className="font-bold text-5xl text-yellow-400">
      {days}d : {hours.toString().padStart(2, "0")}h :{" "}
      {minutes.toString().padStart(2, "0")}m :{" "}
      {seconds.toString().padStart(2, "0")}s
    </span>
  );
};

export default CountDown;