import React, { useState } from "react";
import { useTheme } from "../../../context/useTheme";

function FactorialNumber() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  function factorial(n) {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
      fact *= i;
    }
    return fact;
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num) && num > 0) {
      setResult(factorial(num));
    } else {
      setResult(null);
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
      <h4 className="font-bold mb-2">Factorial Number Calculation</h4>
      <p className="mb-2 text-sm">
        In mathematics, the factorial of a number n is the product of all
        positive integers less than or equal to n.
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter number"
          className={`min-w-[100px] p-1 rounded-lg text-center text-sm w-2/10 ${inputBg}`}
        />

        <button
          onClick={handleClick}
          className="bg-[#0c6b80] hover:bg-[#0e7a92] text-white p-1 font-semibold text-sm rounded-lg! transition-colors duration-200 w-1/10 focus:outline-none min-w-[80px]"
        >
          Go...
        </button>

        <input
          type="text"
          value={result !== null ? result : ""}
          readOnly
          placeholder="Result"
          className={`flex-1 rounded text-sm h-auto p-1 w-7/10 ${resultBg}`}
        />
      </div>
    </div>
  );
}

export default FactorialNumber;
