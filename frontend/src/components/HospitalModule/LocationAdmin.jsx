import React, { useState } from "react";
import {
  addLocation,
  updateLocation,
  deleteLocation,
} from "../../api/locations.js";
import { FaEdit, FaCheck } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";

export default function LocationAdmin({
  isDark,
  locations,
  onLocationAdded,
  onLocationDeleted, // 🔧 eksik props eklendi
  onLocationUpdated, // 🔧 eksik props eklendi
}) {
  const [editableId, setEditableId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHospital, setNewHospital] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newAddress, setNewAddress] = useState("");

  async function handleAdd() {
    if (newHospital.trim() && newCity.trim()) {
      const newLoc = await addLocation({
        hospital_name: newHospital,
        city: newCity,
        address: newAddress || null,
      });
      onLocationAdded?.(newLoc); // ✅ parent state
      setNewHospital("");
      setNewCity("");
      setNewAddress("");
      setIsModalOpen(false);
    }
  }

  async function handleDelete(id) {
    await deleteLocation(id);
    onLocationDeleted?.(id); // ✅ parent state
    // editable moddan çıkmayı garanti et
    if (editableId === id) {
      setEditableId(null);
      setEditValue("");
    }
  }

  async function handleUpdate(id) {
    if (!editValue.trim()) return;

    // API’nin dönüşü: updated entity (önerilen) — değilse optimistic fallback
    const updatedLoc = await updateLocation(id, { hospital_name: editValue });

    if (updatedLoc && updatedLoc.location_id) {
      onLocationUpdated?.(updatedLoc); // ✅ parent state
    } else {
      // 🔁 Optimistic fallback: API sadece status dönerse local olarak compose et
      const existing = locations.find((l) => l.location_id === id);
      if (existing) {
        onLocationUpdated?.({ ...existing, hospital_name: editValue });
      }
    }

    setEditableId(null);
    setEditValue("");
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
        className={`flex items-center justify-between text-lg p-2 rounded-lg mb-4 ${titleBg}`}
      >
        <span>Locations</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#094857] text-white px-3 rounded"
        >
          + New
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div
            className={`text-lg p-4 rounded-lg mb-4 ${cardClass} 
                  w-[90%] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl`}
          >
            <div
              className={`text-2xl font-semibold mb-4 p-3 ${titleBg} text-white rounded`}
            >
              New Location
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Hospital Name"
                value={newHospital}
                onChange={(e) => setNewHospital(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="City (required)"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Address (optional)"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 rounded border border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-[#094857] text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="list-none !pl-0">
        {locations.map((loc) => (
          <li
            key={loc.location_id}
            className="flex justify-between items-start p-2 border-b"
          >
            <div className="flex flex-col flex-1">
              {editableId === loc.location_id ? (
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
              ) : (
                <>
                  <span>{loc.hospital_name}</span>
                  <span className="text-sm text-gray-600 pl-2">
                    {loc.address ? loc.address : "No address"}, {loc.city}
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-2">
              {editableId === loc.location_id ? (
                <>
                  <FaCheck
                    className="text-green-600 cursor-pointer"
                    onClick={() => handleUpdate(loc.location_id)}
                  />
                  <button
                    className="text-gray-600"
                    onClick={() => {
                      setEditableId(null);
                      setEditValue("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <FaEdit
                    className="text-[#094857] cursor-pointer"
                    onClick={() => {
                      setEditableId(loc.location_id);
                      setEditValue(loc.hospital_name);
                    }}
                  />
                  <IoMdRemoveCircle
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(loc.location_id)}
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
