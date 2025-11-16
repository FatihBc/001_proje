import React from "react";
import { useTheme } from "../context/useTheme";
import FibonacciSeq from "../components/MedicAcademic/MathAlgorithms/FibonacciSeq.jsx";
import FactorialNumber from "../components/MedicAcademic/MathAlgorithms/FactorialNumber.jsx";
import PrimeNumber from "../components/MedicAcademic/MathAlgorithms/PrimeNumber.jsx";

function Algorithms() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Stil mantığı örnek dosyaya göre
  const titleBg = isDark
    ? "bg-[#0a3c4a] text-white"
    : "bg-[#094857] text-white";
  const pageClass = `min-h-screen md:px-8 lg:px-16 ${
    isDark ? "bg-[#242424] text-white" : "bg-[#ecf3f4] text-black"
  }`;
  const cardClass = `p-2 rounded-lg border-gray-200 ${
    isDark ? "bg-[#242424]" : "bg-gray-50"
  }`;

  return (
    <div className={pageClass}>
      <div>
        <div className={`text-lg text-center p-2 rounded-lg mb-2 ${titleBg}`}>
          Some Mathematical Algorithms
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className={cardClass}>
          <FibonacciSeq />
        </div>
        <div className={cardClass}>
          <FactorialNumber />
        </div>
        <div className={cardClass}>
          <PrimeNumber />
        </div>
      </div>
    </div>
  );
}

export default Algorithms;
