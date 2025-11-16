import React from "react";
import { useTheme } from "../../../context/useTheme.js";
const CalcButton = (props) => {
  const { value, onClick = () => {}, size = 4, className = "" } = props;
  const { theme } = useTheme();

  const getWidthClass = () => {
    switch (size) {
      case 12:
        return "w-full";
      case 6:
        return "w-1/2";
      case 4:
        return "w-1/3";
      case 3:
        return "w-1/4";
      default:
        return "w-1/3";
    }
  };

  const baseClass = `
    w-full h-8 flex items-center justify-center 
    font-bold text-sm rounded transition-colors duration-200 mx-0.5
  `;

  const themeClass = theme === "dark" ? "text-white" : "text-white";

  return (
    <div className={getWidthClass()}>
      <button
        value={value}
        type="button"
        onClick={onClick}
        className={`${baseClass} ${themeClass} ${className}`}
      >
        {value}
      </button>
    </div>
  );
};

export default CalcButton;
