import React from "react";
import { useTheme } from "../context/useTheme";
import PersonalHistory from "../components/MedicAcademic/AboutPage/personalHistory";
import EducationHistory from "../components/MedicAcademic/AboutPage/educationHistory";
import WorkExperience from "../components/MedicAcademic/AboutPage/workExperience";
import PublicationsList from "../components/MedicAcademic/AboutPage/publicationsList";

function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const titleBg = isDark
    ? "bg-[#0a3c4a] text-white"
    : "bg-[#094857] text-white";
  const pageClass = `min-h-screen md:px-8 lg:px-16 ${
    isDark ? "bg-[#242424] text-white" : "bg-gray-50 text-black"
  }`;
  const containerClass = `flex flex-col items-center justify-center px-6! py-12 border border-[#094857]! rounded-lg shadow-md ${
    isDark ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-800"
  }`;

  return (
    <div className={pageClass}>
      <div className={containerClass}>
        <div
          className={`w-full text-lg text-center font-semibold p-2 rounded-lg my-2 ${titleBg}`}
        >
          My Professional Journey
        </div>
        <PersonalHistory />
        <EducationHistory />
        <WorkExperience />
        <PublicationsList />
      </div>
    </div>
  );
}

export default About;
