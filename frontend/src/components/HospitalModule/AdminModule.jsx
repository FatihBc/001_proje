import React from "react";
import { useTheme } from "../../context/useTheme.js";
import LocationAdmin from "./LocationAdmin.jsx";
import DepartmentsAdmin from "./DepartmentsAdmin.jsx";
import DoctorsAdmin from "./DoctorsAdmin.jsx";

export default function AdminModule() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageClass = `min-h-screen md:px-8 lg:px-16 ${
    isDark ? "bg-[#242424] text-white" : "bg-[#ecf3f4] text-black"
  }`;

  return (
    <div className={pageClass}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <LocationAdmin isDark={isDark} />
        <DepartmentsAdmin isDark={isDark} />
        <DoctorsAdmin isDark={isDark} />
      </div>
    </div>
  );
}
