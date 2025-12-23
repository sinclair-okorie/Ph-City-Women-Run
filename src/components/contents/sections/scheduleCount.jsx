import React, { useState, useEffect } from "react";
import "../styles/countdown.css";
import { useLocation } from "react-router-dom";
import Button from "../Button";

const ScheduleCountdown = ({ startDate, endDate, subtext, openOverlay }) => {
  const { pathname } = useLocation();

  const [phase, setPhase] = useState("before"); // before | open | ended
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T23:59:59`);
    if (isNaN(start) || isNaN(end)) return;

    const calculateTime = () => {
      const now = new Date();

      if (now < start) {
        setPhase("before");
        const diff = start - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else if (now >= start && now <= end) {
        setPhase("open");
        const diff = end - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setPhase("ended");
        setTimeLeft({});
      }
    };

    calculateTime(); // initial calculation
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const isButtonDisabled = phase !== "open";

  return (
    <>
      <div className="flex gap-[20px] flex-col silver:flex-row justify-center items-start rounded-[16px] silver:py-[4px] w-full max-w-[685px]">
        {subtext && (
          <span className="font-Geist text-[#FFFFFF] font-extrabold text-[24px] leading-[32px] silver:w-[386px]">
            {subtext}
          </span>
        )}

        <div className="countdown-container flex-col silver:flex-row gap-[20px]">
          {phase !== "ended" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-[20px] gap-y-3 w-full">
              {["days", "hours", "minutes", "seconds"].map((unit) => (
                <div
                  key={unit}
                  className="w-full flex flex-col-reverse items-center border-x-[2px] silver:border-x-0 silver:border-r-[2px] border-[#C8D2DF]"
                >
                  <span className="text-[14px] leading-[24px]">
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </span>
                  <h3 className="font-Geist text-[#FFFFFF] font-extrabold text-[24px] leading-[32px]">
                    {timeLeft[unit] ?? "00"}
                  </h3>
                </div>
              ))}
            </div>
          )}

          {phase === "ended" && (
            <p className="text-center text-[14px] text-white">
              Event has ended!
            </p>
          )}
        </div>
      </div>

      <div
        data-aos="zoom-in"
        className="flex justify-start w-full at500:w-[201px]"
      >
        <Button
          onClick={openOverlay}
          size="play"
          disabled={isButtonDisabled}
          className={`${
            isButtonDisabled ? "opacity-50 cursor-not-allowed !text-[12px]" : ""
          }`}
        >
          {phase === "before" && "Registration not started"}
          {phase === "open" &&
            (pathname === "/volunteer" ? "Volunteer Now" : "Register Now")}
          {phase === "ended" && "Registration closed"}
        </Button>
      </div>
    </>
  );
};

export default ScheduleCountdown;
