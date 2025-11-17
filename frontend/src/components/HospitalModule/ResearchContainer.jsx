import React, { useEffect, useState } from "react";
import { getResearches } from "../../api/research.js";

function ResearchContainer() {
  const [researches, setResearches] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getResearches();
        setResearches(data);
      } catch (err) {
        console.error("Researchleri çekerken hata:", err);
      }
    }
    loadData();
  }, []);

  // Filtreleme: başlık, doktor adı, departman veya lokasyona göre
  const filteredResearches = researches.filter((r) => {
    const search = filter.toLowerCase();
    return (
      r.title.toLowerCase().includes(search) ||
      (r.departments &&
        r.departments.some((d) =>
          d.department_name.toLowerCase().includes(search)
        )) ||
      (r.locations &&
        r.locations.some((l) =>
          l.location_name.toLowerCase().includes(search)
        )) ||
      (r.doctors &&
        r.doctors.some((d) => d.doctor_name.toLowerCase().includes(search)))
    );
  });

  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-bold mb-4">Researchs</h2>

      {/* Filtreleme inputu */}
      <input
        type="text"
        placeholder="Araştırma, doktor, departman veya lokasyon ara..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md"
      />

      {/* Listeleme */}
      {filteredResearches.length > 0 ? (
        filteredResearches.map((r) => (
          <div key={r.research_id} className="mb-6 p-3 border-b">
            <h3 className="font-bold text-xl mb-1">
              {r.title}{" "}
              <span className="text-sm text-gray-600">
                ({r.doctors?.map((d) => d.doctor_name).join(", ")})
              </span>
            </h3>
            <p className="text-gray-700 mb-1">{r.description}</p>
            <p className="text-sm text-gray-500">
              Departmanlar:{" "}
              {r.departments?.map((d) => d.department_name).join(", ")} |
              Lokasyonlar: {r.locations?.map((l) => l.location_name).join(", ")}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Hiç araştırma bulunamadı.</p>
      )}
    </div>
  );
}

export default ResearchContainer;
