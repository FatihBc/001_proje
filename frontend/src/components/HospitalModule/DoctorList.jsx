import React, { useEffect, useState } from "react";
import { getDoctors } from "../../api/doctors.js";
import { getDepartments } from "../../api/departments.js";
import { getLocations } from "../../api/locations.js";

export default function DoctorList({ isDark }) {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [selectedDepartment, selectedLocation]);

  async function fetchFilters() {
    const [deps, locs] = await Promise.all([getDepartments(), getLocations()]);
    setDepartments(deps);
    setLocations(locs);
  }

  async function fetchDoctors() {
    const data = await getDoctors(selectedDepartment, selectedLocation);
    setDoctors(Array.isArray(data) ? data : []);
  }

  const cardClass = `p-4 rounded-lg border ${
    isDark ? "bg-[#242424] border-gray-700" : "bg-gray-50 border-gray-200"
  }`;
  const titleBg = isDark
    ? "bg-[#0a3c4a] text-white"
    : "bg-[#094857] text-white";

  return (
    <div className={cardClass}>
      <div
        className={`text-lg p-2 rounded-lg mb-4 ${titleBg} flex justify-between items-center`}
      >
        <span>Doctors</span>
      </div>

      {/* Filtreler */}
      <div className="flex gap-4 mb-4">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border p-2 rounded flex-1"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.location_id} value={loc.location_id}>
              {loc.hospital_name} ({loc.city})
            </option>
          ))}
        </select>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border p-2 rounded flex-1"
        >
          <option value="">All Departments</option>
          {departments.map((dep) => (
            <option key={dep.department_id} value={dep.department_id}>
              {dep.name}
            </option>
          ))}
        </select>
      </div>

      {/* Liste */}
      {doctors.length === 0 ? (
        <p className="text-gray-500">No doctors found.</p>
      ) : (
        <ul className="list-none !pl-0">
          {doctors.map((doc) => (
            <li key={doc.doctor_id} className="flex flex-col p-2 border-b">
              <span className="font-medium">
                {doc.name} {doc.surname}
              </span>
              <span className="text-sm text-gray-600 pl-2">
                {doc.birth_date || "No birth date"} |{" "}
                {doc.department?.name || "No Department"} |{" "}
                {doc.location?.hospital_name || "No Location"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
