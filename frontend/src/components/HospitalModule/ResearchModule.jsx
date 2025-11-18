import React, { useState, useEffect } from "react";
import { getResearches } from "../../api/research.js";
import AddResearchForm from "./AddResearchForm.jsx";
import ResearchContainer from "./ResearchContainer.jsx";

export default function ResearchModule({ sectionTitleClass, isDark }) {
  const [researches, setResearches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getResearches();
      setResearches(data);
    }
    fetchData();
  }, []);

  const handleResearchAdded = (newResearch) => {
    setResearches((prev) => [...prev, newResearch]);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Solda ekleme */}
        <div className="sm:w-[30%] w-full">
          <AddResearchForm
            onResearchAdded={handleResearchAdded}
            isDark={isDark}
          />
        </div>
        {/* Sağda listeleme */}
        <div className="sm:w-[70%] w-full">
          <ResearchContainer
            researches={researches}
            setResearches={setResearches}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
}
