import React, { useState } from "react";
import { useTheme } from "../../../context/useTheme";

function PrimeNumber() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const number = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === "") {
      setResult(null);
    }
  };

  const handleClick = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num) && num > 0) {
      setResult(number(num) ? "Prime" : "Not Prime");
    } else {
      setResult("Invalid input");
    }
  };

  const cardBg = isDark
    ? "bg-[#242424] text-white border-gray-200"
    : "bg-[#ecf3f4] text-black border-gray-200";
  const inputBg = isDark
    ? "bg-[#2a2a2a] text-white border-[1px] border-[#d3d3d3]"
    : "bg-white text-black border border-gray-300";
  const resultBg = isDark
    ? "bg-[#2a2a2a] text-white border-[1px] border-[#d3d3d3]"
    : "bg-gray-50 text-black border border-gray-300";

  return (
    <div className={`w-full h-full rounded-lg border p-2 ${cardBg}`}>
      <h4 className="font-bold mb-2">Prime Number Checker</h4>
      <p className="mb-2 text-sm">
        Prime numbers are natural numbers that are divisible by only 1 and the
        number itself.
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter number"
          className={`min-w-[100px] p-2 rounded-lg text-center text-sm w-[20%] ${inputBg}`}
        />

        <button
          onClick={handleClick}
          className="bg-[#0c6b80] hover:bg-[#0e7a92] text-white p-2 font-semibold text-sm transition-colors duration-200 rounded-lg! w-[15%] focus:outline-none min-w-[80px]"
        >
          Go...
        </button>

        <input
          type="text"
          value={result !== null ? result : ""}
          readOnly
          placeholder="Result"
          className={`flex-1 rounded text-sm h-auto p-2 w-[65%] ${resultBg}`}
        />
      </div>
    </div>
  );
}

export default PrimeNumber;
