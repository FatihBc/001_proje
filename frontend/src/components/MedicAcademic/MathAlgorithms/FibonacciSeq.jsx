import React, { useState } from "react";
import { useTheme } from "../../../context/useTheme";

function FibonacciSeq() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  function fibonacci(n) {
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, n);
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num) && num > 0) {
      setResult(fibonacci(num));
    } else {
      setResult([]);
    }
  };

  // 🎨 Tema bazlı stiller
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
      <h4 className="font-bold mb-2">Fibonacci Sequence</h4>
      <p className="text-sm">
        In mathematics, the Fibonacci sequence is a sequence in which each
        element is the sum of the two elements that precede it.
      </p>

      {/* Satır içi alanlar */}
      <div className="flex items-center gap-2">
        {/* Input */}
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter number"
          className={`w-2/10 p-2 rounded-lg text-center text-sm ${inputBg}`}
        />

        {/* Button */}
        <button
          onClick={handleClick}
          className="bg-[#0c6b80] hover:bg-[#0e7a92] text-white p-1 font-semibold text-sm rounded-lg! transition-colors duration-200 w-1/10 focus:outline-none min-w-[80px]"
        >
          Go...
        </button>

        {/* Result */}
        <textarea
          value={result.length > 0 ? result.join(", ") : ""}
          readOnly
          placeholder="Result"
          className={`flex-1 rounded text-sm h-auto p-1 w-7/10 ${resultBg}`}
        />
      </div>
    </div>
  );
}

export default FibonacciSeq;
