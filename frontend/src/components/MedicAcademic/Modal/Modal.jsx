import React from "react";
import { useTheme } from "../../../context/useTheme";

const Modal = ({ isOpen, onClose, title, children }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const backdropClass =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  const modalBoxClass = `rounded-lg shadow-lg p-6 w-full max-w-md relative ${
    isDark
      ? "bg-[#1e1e1e] text-white border border-gray-700"
      : "bg-white text-black border border-gray-200"
  }`;
  const headerClass = `flex justify-between items-center text-sm border border-gray-700 font-semibold p-2 rounded ${
    isDark ? "bg-[#094857] text-white" : "bg-[#0c6b80] text-white"
  }`;
  const closeBtnClass = `absolute top-2 right-2 ${
    isDark
      ? "text-gray-300 hover:text-white"
      : "text-gray-500 hover:text-gray-700"
  }`;

  return (
    <div className={backdropClass} onClick={handleBackdropClick}>
      <div className={modalBoxClass} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={headerClass}>
          <div className="w-full text-center">{title}</div>
        </div>

        {/* Content */}
        <div>{children}</div>

        {/* Close Button */}
        <button onClick={onClose} className={closeBtnClass}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
