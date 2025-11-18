import React, { useEffect, useState } from "react";
import { updateResearch, deleteResearch } from "../../api/research.js";
import { getDepartments } from "../../api/departments.js";
import { getLocations } from "../../api/locations.js";
import {
  addDepartmentResearch,
  deleteDepartmentResearch,
} from "../../api/departmentResearch.js";
import {
  addLocationResearch,
  deleteLocationResearch,
} from "../../api/locationResearch.js";
import { FaEdit, FaCheck } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";

export default function ResearchContainer({
  researches,
  setResearches,
  isDark,
}) {
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    field: "",
    start_date: "",
    end_date: "",
    description: "",
    department_id: "",
    location_id: "",
  });

  useEffect(() => {
    fetchFilters();
  }, []);

  async function fetchFilters() {
    const [deps, locs] = await Promise.all([getDepartments(), getLocations()]);
    setDepartments(deps);
    setLocations(locs);
  }

  async function handleDelete(id) {
    await deleteResearch(id);
    setResearches((prev) => prev.filter((r) => r.research_id !== id));
  }

  function startEdit(r) {
    setEditingId(r.research_id);
    setEditForm({
      title: r.title || "",
      field: r.field || "",
      start_date: r.start_date || "",
      end_date: r.end_date || "",
      description: r.description || "",
      department_id: r.departments?.[0]?.department_id || "",
      location_id: r.locations?.[0]?.location_id || "",
    });
  }

  async function handleUpdate(id) {
    // 1) Research’in temel alanlarını güncelle
    await updateResearch(id, {
      title: editForm.title,
      field: editForm.field,
      start_date: editForm.start_date || null,
      end_date: editForm.end_date || null,
      description: editForm.description || null,
    });

    // 2) Departman ilişkisini güncelle (önce sil, sonra ekle)
    const existingDeps =
      researches.find((r) => r.research_id === id)?.departments || [];
    for (const dep of existingDeps) {
      await deleteDepartmentResearch(dep.department_id, id);
    }
    if (editForm.department_id) {
      await addDepartmentResearch(editForm.department_id, id);
    }

    // 3) Lokasyon ilişkisini güncelle (önce sil, sonra ekle)
    const existingLocs =
      researches.find((r) => r.research_id === id)?.locations || [];
    for (const loc of existingLocs) {
      await deleteLocationResearch(loc.location_id, id);
    }
    if (editForm.location_id) {
      await addLocationResearch(editForm.location_id, id);
    }

    // 4) State güncelle
    setResearches((prev) =>
      prev.map((r) => (r.research_id === id ? { ...r, ...editForm } : r))
    );

    setEditingId(null);
    setEditForm({
      title: "",
      field: "",
      start_date: "",
      end_date: "",
      description: "",
      department_id: "",
      location_id: "",
    });
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
        <span>Researches</span>
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

      {/* Listeleme */}
      {researches.length === 0 ? (
        <p className="text-gray-500">No research found.</p>
      ) : (
        <ul className="list-none !pl-0">
          {researches.map((r) => (
            <li key={r.research_id} className="flex flex-col p-2 border-b">
              {editingId === r.research_id ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                    placeholder="Title"
                  />
                  <input
                    value={editForm.field}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        field: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                    placeholder="Field"
                  />
                  <input
                    type="date"
                    value={editForm.start_date}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        start_date: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                  />
                  <input
                    type="date"
                    value={editForm.end_date}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        end_date: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                    rows={3}
                    placeholder="Description"
                  />
                  <select
                    value={editForm.department_id}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        department_id: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dep) => (
                      <option key={dep.department_id} value={dep.department_id}>
                        {dep.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={editForm.location_id}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        location_id: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                  >
                    <option value="">Select Location</option>
                    {locations.map((loc) => (
                      <option key={loc.location_id} value={loc.location_id}>
                        {loc.hospital_name} ({loc.city})
                      </option>
                    ))}
                  </select>

                  <div className="flex justify-end gap-2 mt-2">
                    <FaCheck
                      className="text-green-600 cursor-pointer"
                      onClick={() => handleUpdate(r.research_id)}
                    />
                    <button
                      className="px-2 text-gray-600 border rounded"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="font-semibold text-lg">{r.title}</span>
                  <span className="text-sm text-gray-600 pl-2 mb-1">
                    {r.field} | {r.start_date} - {r.end_date}
                  </span>
                  <p className="text-gray-700 mb-1">{r.description}</p>
                  <p className="text-sm text-gray-500">
                    Departments:{" "}
                    {r.departments?.map((d) => d.department_name).join(", ") ||
                      "-"}{" "}
                    | Locations:{" "}
                    {r.locations?.map((l) => l.location_name).join(", ") || "-"}
                  </p>

                  <div className="flex justify-end gap-2 mt-2">
                    <FaEdit
                      className="text-[#094857] cursor-pointer"
                      onClick={() => startEdit(r)}
                    />
                    <IoMdRemoveCircle
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(r.research_id)}
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
