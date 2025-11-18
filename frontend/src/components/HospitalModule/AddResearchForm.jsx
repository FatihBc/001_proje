import React, { useState, useEffect } from "react";
import { addResearch } from "../../api/research.js";
import { getDepartments } from "../../api/departments.js";
import { getLocations } from "../../api/locations.js";
import { addDepartmentResearch } from "../../api/departmentResearch.js";
import { addLocationResearch } from "../../api/locationResearch.js";

export default function AddResearchForm({ onResearchAdded, isDark }) {
  const [form, setForm] = useState({
    title: "",
    field: "",
    start_date: "",
    end_date: "",
    description: "",
    department_id: "",
    location_id: "",
  });

  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchFilters() {
      const [deps, locs] = await Promise.all([
        getDepartments(),
        getLocations(),
      ]);
      setDepartments(deps);
      setLocations(locs);
    }
    fetchFilters();
  }, []);

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 1) Research ekle
    const newResearch = await addResearch({
      title: form.title,
      field: form.field,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      description: form.description || null,
    });

    // 2) Departman ilişkisi ekle
    if (form.department_id) {
      await addDepartmentResearch(form.department_id, newResearch.research_id);
    }

    // 3) Lokasyon ilişkisi ekle
    if (form.location_id) {
      await addLocationResearch(form.location_id, newResearch.research_id);
    }

    onResearchAdded(newResearch);

    // Formu sıfırla
    setForm({
      title: "",
      field: "",
      start_date: "",
      end_date: "",
      description: "",
      department_id: "",
      location_id: "",
    });
  };

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
        <span>Add Research</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Research Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="field"
          placeholder="Field (e.g. Cardiology)"
          value={form.field}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          rows={4}
        />

        {/* Departman seçimi */}
        <select
          name="department_id"
          value={form.department_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep.department_id} value={dep.department_id}>
              {dep.name}
            </option>
          ))}
        </select>

        {/* Lokasyon seçimi */}
        <select
          name="location_id"
          value={form.location_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc.location_id} value={loc.location_id}>
              {loc.hospital_name} ({loc.city})
            </option>
          ))}
        </select>

        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-[#094857] text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
