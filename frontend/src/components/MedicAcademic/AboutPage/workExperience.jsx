import React from "react";
import educationWork from "../../../data/education.js";

function WorkExperience() {
  return (
    <div>
      <p className="border-t text-xl font-semibold pt-2">WORK EXPERIENCE</p>
      <div className="pt-1">
        {educationWork
          .filter((item) => item.type === "work")
          .map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-10 gap-4 mb-6 items-start"
            >
              {/* Sol sütun - Pozisyon */}
              <div className="col-span-3">
                <p className="text-base font-medium">{item.degree}</p>
              </div>

              {/* Orta sütun - Tarih aralığı */}
              <div className="col-span-2">
                <p className="text-sm text-gray-600">
                  {item.from} - {item.until}
                </p>
              </div>

              {/* Sağ sütun - Kurum ve detay bilgileri */}
              <div className="col-span-5">
                <p className="text-sm font-semibold">{item.institution}</p>
                {item.details.trim() && (
                  <p className="text-sm mt-1">- {item.details}</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WorkExperience;
