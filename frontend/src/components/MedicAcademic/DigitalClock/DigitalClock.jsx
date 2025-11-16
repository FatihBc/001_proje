import React, { useEffect, useState } from "react";
import "./clock.css";
import { useTheme } from "../../../context/useTheme";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const clockBg = isDark
    ? "bg-[#242424] border-gray-200 text-transparent"
    : "bg-[#ecf3f4] border-gray-200 text-transparent";

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const zero = (n) => (n < 10 ? "0" + n : n);

  const getDots = (count, activeIndex, step) => {
    const dots = [];
    for (let i = 1; i <= count; i++) {
      const rotation = i * step;
      dots.push(
        <div
          key={i}
          className={`dot ${i === activeIndex ? "active" : ""}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
      );
    }
    return dots;
  };

  const hoursRaw = time.getHours();
  const hours = hoursRaw % 12 === 0 ? 12 : hoursRaw % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const amPm = hoursRaw >= 12 ? "PM" : "AM";

  return (
    <div className={`clock-wrapper w-full py-16 rounded-lg ${clockBg}`}>
      <div id="clock">
        <div id="hrDots" style={{ "--clr": "#107e9a" }}>
          {getDots(12, hours, 30)}
          <b className="text-[#107e9a]">{amPm}</b>
          <h2>
            {zero(hours)}
            <br />
            <span>Hours</span>
          </h2>
        </div>
        <div id="minDots" style={{ "--clr": "#16a8cd" }}>
          {getDots(60, minutes, 6)}
          <h2>
            {zero(minutes)}
            <br />
            <span>Minutes</span>
          </h2>
        </div>
        <div id="secDots" style={{ "--clr": "#32c5e9" }}>
          {getDots(60, seconds, 6)}
          <h2>
            {zero(seconds)}
            <br />
            <span>Seconds</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
