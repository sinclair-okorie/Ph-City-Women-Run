import React, { useState, useEffect } from "react";
import Button from "../../contents/Button";

const Countdown = ({
  startDate,
  endDate,
  open,
  className,
  size,
  buttonText,
}) => {
  const calculateTimeLeft = (target) => {
    const now = new Date();
    const targetTime = new Date(target);
    const diff = targetTime - now;

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [phase, setPhase] = useState("before");
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
    <div>
      {/* {timeLeft && (
        <p className="mb-2 text-sm">
          {phase === "before" && "Registration starts in:"}
          {phase === "open" && "Registration ends in:"}{" "}
          <strong>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
            {timeLeft.seconds}s
          </strong>
        </p>
      )} */}

      {phase === "ended" && (
        <p className="mb-2 text-sm text-red-500">Registration has ended</p>
      )}

      <Button
        onClick={open}
        className={`${className} ${
          isDisabled ? "opacity-50 cursor-not-allowed !text-[12px]" : ""
        }`}
        size={size}
        disabled={isDisabled}
      >
        {phase === "before" && "Registration not started"}
        {phase === "open" && buttonText}
        {phase === "ended" && "Registration closed"}
      </Button>
    </div>
  );
};

export default Countdown;
