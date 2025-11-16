import React from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../context/useTheme";
import ReseachPreview from "./ReseachPreview";

function ResearchDetailPage() {
  const { id } = useParams(); // URL'den gelen researchId
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const titleBg = isDark
    ? "bg-[#0a3c4a] text-white"
    : "bg-[#094857] text-white";
  const pageClass = `w-full min-h-screen md:px-8 lg:px-16 ${
    isDark ? "bg-[#242424] text-white" : "bg-gray-50 text-black"
  }`;
  const containerClass = `flex flex-col items-center justify-center px-6 py-8 border border-[#094857] rounded-lg shadow-md ${
    isDark ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-800"
  }`;

  return (
    <div className={pageClass}>
      <div className={containerClass}>
        <div className="w-full p-3">
          <div
            className={`w-full text-lg text-center font-semibold p-2 rounded-lg ${titleBg}`}
          >
            Research Detail
          </div>
        </div>
        {/* Preview bileşeni sadece geçerli id varsa render edilir */}
        {id ? (
          <ReseachPreview id={id} />
        ) : (
          <div className="text-center text-sm text-red-500">
            Makale ID'si bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}

export default ResearchDetailPage;
