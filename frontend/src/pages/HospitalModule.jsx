import React from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "../context/useTheme.js";

// Yeni modüller
import AdminModule from "../components/HospitalModule/AdminModule.jsx";
import DoctorList from "../components/HospitalModule/DoctorList.jsx";
import ResearchModule from "../components/HospitalModule/ResearchModule.jsx";

export default function HospitalModule() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageBg = isDark ? "bg-[#242424] text-white" : "bg-[#ecf3f4] text-black";
  const cardBg = isDark
    ? "bg-[#1e1e1e] border-gray-700"
    : "bg-gray-50 border-gray-200";
  const titleBg = isDark
    ? "bg-[#0a3c4a] text-white"
    : "bg-[#094857] text-white";
  const pageClass = `min-h-screen md:px-8 lg:px-16 ${pageBg}`;
  const activeLinkBg = isDark ? "bg-[#1e1e1e]" : "bg-gray-50";

  const getLinkClass = (isActive) => {
    return isActive
      ? `block px-3 py-2 transition-all duration-200 ease-in-out border-l-8 ${activeLinkBg} border-[#0a3c4a] font-semibold rounded-l-none rounded-r-md shadow-md scale-[1.02]`
      : `block px-3 py-2 transition-all duration-200 ease-in-out border-l-4 ${
          isDark
            ? "hover:bg-[#333] text-gray-300"
            : "hover:bg-gray-200 text-gray-700"
        } rounded-md hover:scale-[1.01]`;
  };

  const navItems = [
    { id: 1, title: "Yönetici Modül", path: "admin" },
    { id: 2, title: "Doktor Listesi", path: "doctors" },
    { id: 3, title: "Araştırma Listesi", path: "researchs" },
  ];

  return (
    <div className={pageClass}>
      {/* Üst başlık barı */}
      <div className={`text-lg text-center p-2 rounded-lg mb-4 ${titleBg}`}>
        Hospital Module
      </div>

      <div className="flex sm:flex-row gap-4 sm:gap-8">
        {/* Sidebar */}
        <div className="hidden sm:block w-64">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id} className="mb-2">
                <NavLink
                  to={`/hospital/${item.path}`}
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Navigate to="admin" />} />
            <Route
              path="admin"
              element={
                <AdminModule sectionTitleClass="text-2xl font-semibold mb-4" />
              }
            />
            <Route
              path="doctors"
              element={
                <DoctorList sectionTitleClass="text-2xl font-semibold mb-4" />
              }
            />
            <Route
              path="researchs"
              element={
                <ResearchModule sectionTitleClass="text-2xl font-semibold mb-4" />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
