import React, { useState, useEffect } from "react";
import "../styles/countdown.css";
import Button from "../Button";

const Countdown = ({ startDate, endDate, openOverlay }) => {
  const calculateTimeLeft = (target) => {
    const now = new Date();
    const diff = new Date(target) - now;

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [phase, setPhase] = useState("before"); // before | open | ended
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      if (now < new Date(startDate)) {
        setPhase("before");
        setTimeLeft(calculateTimeLeft(startDate));
      } else if (now <= new Date(endDate)) {
        setPhase("open");
        setTimeLeft(calculateTimeLeft(endDate));
      } else {
        setPhase("ended");
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const isDisabled = phase !== "open";

  return (
    <div className="countdown-container flex-col gap-[30px] silver:flex-row">
      <div className="flex w-full max-w-[300px] silver:border-r-[2px] border-[#C8D2DF]">
        <span className="font-Geist font-extrabold text-[30px] leading-[48px]">
          Not Registered?
        </span>
      </div>

      <div className="grid justify-center items-center grid-cols-1 at500:grid-cols-2 silver:grid-cols-4 gap-x-[20px] gap-y-3 w-full">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div
            key={unit}
            className="time-box flex flex-col justify-center items-center at500:border-x-[2px] silver:border-x-0 silver:border-r-[2px] border-[#C8D2DF]"
          >
            <span className="text-[14px] leading-[24px] capitalize">
              {unit}
            </span>
            <h3 className="time-value">
              {timeLeft ? String(timeLeft[unit]).padStart(2, "0") : "00"}
            </h3>
          </div>
        ))}
      </div>

      <div
        data-aos="zoom-in"
        className="flex justify-start w-full silver:w-[331px] z-40"
      >
        <Button
          onClick={openOverlay}
          size="play"
          className={`!bg-[#5C176F] ${
            isDisabled ? "opacity-50 cursor-not-allowed !text-[14px] !px-2" : ""
          }`}
          disabled={isDisabled}
        >
          {phase === "before" && "Registration not started"}
          {phase === "open" && "Register"}
          {phase === "ended" && "Registration closed"}
        </Button>
      </div>
    </div>
  );
};

export default Countdown;
