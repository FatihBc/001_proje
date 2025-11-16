import React, { useRef, useEffect, useState } from "react";
import "./password.css";
import { useTheme } from "../../../context/useTheme.js";

function PasswordStrength() {
  const { theme } = useTheme();
  const inputRef = useRef(null);
  const [strengthText, setStrengthText] = useState("Check");
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    const input = inputRef.current;
    const strengthBars = document.querySelectorAll(".password-strength");

    const handleInput = (e) => {
      const password = e.target.value;
      const strength = Math.min(password.length, 12);
      const degree = strength * 30;
      const gradientColor =
        strength <= 4 ? "#ff2c1c" : strength <= 8 ? "#ff9800" : "#12ff12";
      const text = strength <= 4 ? "Weak" : strength <= 8 ? "Medium" : "Strong";

      strengthBars.forEach((bar) => {
        bar.style.background = `conic-gradient(${gradientColor} ${degree}deg, #111 ${degree}deg)`;
      });

      setStrengthText(text);
      setColor(gradientColor);
    };

    input.addEventListener("input", handleInput);
    return () => input.removeEventListener("input", handleInput);
  }, []);

  const isDark = theme === "dark";
  const inputBg = isDark
    ? "bg-[#242424] border-gray-200 text-white"
    : "bg-[#ffffff] border-gray-200 text-black";
  const checkBg = isDark ? "text-white" : "text-black";
  return (
    <div
      className={`p-2 rounded-lg shadow-md border h-full w-full ${
        isDark
          ? "bg-[#2a2a2a] border-[#2a2a2a] text-white"
          : "bg-[#ecf3f4] border-gray-300 text-black"
      }`}
    >
      <div
        id="text"
        style={{ color }}
        className={`text-center text-2xl my-3 font-semibold ${checkBg}`}
      >
        {strengthText}
      </div>
      <div className="passwordStrengthChecker">
        <div className="box mx-auto max-w-2xl">
          <input
            type="password"
            id="password"
            ref={inputRef}
            placeholder="Enter your password"
            className={`w-full border rounded px-3 py-2 text-black dark:text-white ${inputBg}`}
          />
          <div className="password-strength h-2 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="password-strength text-sm font-medium"></div>
          <div className="password-strength"></div>
        </div>
      </div>
    </div>
  );
}

export default PasswordStrength;
