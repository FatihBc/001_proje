import React from "react";
import { useTheme } from "../context/useTheme";

import ResearchAdd from "../components/MedicAcademic/Researchs/ResearchAdd";
import ResearchContainer from "../components/MedicAcademic/Researchs/ResearchContainer";

function Researchs() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerClass = `mx-auto flex gap-2 ${
    isDark ? "bg-[#242424] text-white" : "bg-[#ecf3f4] text-black"
  }`;
  const sectionTitleClass = `text-2xl font-semibold mb-4 ${
    isDark ? "text-white" : "text-[#094857]"
  }`;

  return (
    <div className={containerClass}>
      <ResearchAdd className={`hidden sm:block w-[40%] ${sectionTitleClass}`} />
      <ResearchContainer
        className={`w-[60%] ${sectionTitleClass} text-center`}
      />
    </div>
  );
}

export default Researchs;
