import React from "react";
import { useTheme } from "../../../context/useTheme";

const TotalDisplay = ({ value }) => {
  const { theme } = useTheme();

  const baseClasses =
    "w-full h-8 px-2 py-1 border-2 rounded-lg text-right text-base font-bold focus:outline-none focus:border-[#0c6b80] resize-none";
  const lightClasses = "bg-white text-[#094857] border-[#0a5c6e]";
  const darkClasses = "bg-[#1e1e1e] text-white border-[#217c93]";

  return (
    <div className="w-full mb-1">
      <div className="w-full">
        <textarea
          className={`${baseClasses} ${
            theme === "dark" ? darkClasses : lightClasses
          }`}
          readOnly
          value={value}
          rows="1"
          id="total"
          name="ans"
        ></textarea>
      </div>
    </div>
  );
};

export default TotalDisplay;
