import React from "react";
import AddResearchForm from "./AddResearchForm.jsx";
import ResearchContainer from "./ResearchContainer.jsx";

export default function ResearchModule({ sectionTitleClass }) {
  return (
    <div>
      <h2 className={sectionTitleClass}>Research Modülü</h2>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Solda ekleme */}
        <div className="sm:w-[40%] w-full">
          <h3 className="text-lg font-semibold mb-2">Araştırma Ekle</h3>
          <AddResearchForm />
        </div>
        {/* Sağda listeleme */}
        <div className="sm:w-[60%] w-full">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Araştırma Listesi
          </h3>
          <ResearchContainer />
        </div>
      </div>
    </div>
  );
}
