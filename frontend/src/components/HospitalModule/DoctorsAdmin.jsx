import React, { useEffect, useState } from "react";
import {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../api/doctors.js";
import { FaEdit, FaCheck } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";

export default function DoctorsAdmin({
  isDark,
  doctors,
  setDoctors,
  departments,
  locations,
}) {
  const [editableId, setEditableId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSurname, setEditSurname] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Doktorları sadece burada fetch ediyoruz
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const docs = await getDoctors();
    setDoctors(docs);
  }

  async function handleAdd() {
    if (newName.trim() && newSurname.trim()) {
      await addDoctor({
        name: newName,
        surname: newSurname,
        birth_date: newBirthDate || null,
        department_id: selectedDepartment || null,
        location_id: selectedLocation || null,
      });
      setNewName("");
      setNewSurname("");
      setNewBirthDate("");
      setSelectedDepartment("");
      setSelectedLocation("");
      setIsModalOpen(false);
      fetchData();
    }
  }

  async function handleUpdate(id) {
    if (editName.trim() && editSurname.trim()) {
      await updateDoctor(id, {
        name: editName,
        surname: editSurname,
      });
      setEditableId(null);
      setEditName("");
      setEditSurname("");
      fetchData();
    }
  }

  async function handleDelete(id) {
    await deleteDoctor(id);
    fetchData();
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
        <span>Doctors</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#094857] text-white px-3 rounded"
        >
          + New
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div
            className={`text-lg p-4 rounded-lg mb-4 ${cardClass} 
                  w-[90%] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl`}
          >
            <div
              className={`text-2xl font-semibold mb-4 p-3 ${titleBg} text-white rounded`}
            >
              New Doctor
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Surname"
                value={newSurname}
                onChange={(e) => setNewSurname(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="date"
                placeholder="Birth Date"
                value={newBirthDate}
                onChange={(e) => setNewBirthDate(e.target.value)}
                className="border p-2 rounded"
              />

              {/* Department dropdown */}
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select Department</option>
                {(departments || []).map((dep) => (
                  <option key={dep.department_id} value={dep.department_id}>
                    {dep.name}
                  </option>
                ))}
              </select>

              {/* Location dropdown */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select Location</option>
                {(locations || []).map((loc) => (
                  <option key={loc.location_id} value={loc.location_id}>
                    {loc.hospital_name} ({loc.city})
                  </option>
                ))}
              </select>
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
        {doctors.map((doc) => (
          <li
            key={doc.doctor_id}
            className="flex justify-between items-start p-2 border-b"
          >
            <div className="flex flex-col flex-1">
              {editableId === doc.doctor_id ? (
                <div className="flex gap-2">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-1 rounded flex-1"
                  />
                  <input
                    value={editSurname}
                    onChange={(e) => setEditSurname(e.target.value)}
                    className="border p-1 rounded flex-1"
                  />
                </div>
              ) : (
                <>
                  <span>
                    {doc.name} {doc.surname}
                  </span>
                  <span className="text-sm text-gray-600 pl-2">
                    {doc.birth_date || "No birth date"} |{" "}
                    {doc.department?.name || "No Department"} |{" "}
                    {doc.location?.hospital_name || "No Location"}
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-2">
              {editableId === doc.doctor_id ? (
                <>
                  <FaCheck
                    className="text-green-600 cursor-pointer"
                    onClick={() => handleUpdate(doc.doctor_id)}
                  />
                  <button
                    className="text-gray-600"
                    onClick={() => setEditableId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <FaEdit
                    className="text-[#094857] cursor-pointer"
                    onClick={() => {
                      setEditableId(doc.doctor_id);
                      setEditName(doc.name);
                      setEditSurname(doc.surname);
                    }}
                  />
                  <IoMdRemoveCircle
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(doc.doctor_id)}
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
