import React, { useEffect, useState } from "react";
import {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../api/departments.js";
import { FaEdit, FaCheck } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";

export default function DepartmentsAdmin({ isDark }) {
  const [departments, setDepartments] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getDepartments();
    setDepartments(data);
  }

  async function handleAdd() {
    if (newName.trim()) {
      await addDepartment({
        name: newName,
        description: newDescription || null,
      });
      setNewName("");
      setNewDescription("");
      setIsModalOpen(false);
      fetchData();
    }
  }

  async function handleUpdate(id) {
    if (editValue.trim()) {
      await updateDepartment(id, { name: editValue });
      setEditableId(null);
      setEditValue("");
      fetchData();
    }
  }

  async function handleDelete(id) {
    await deleteDepartment(id);
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
        <span>Departments</span>
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
          <div className={`text-lg p-2 rounded-lg mb-4 ${cardClass}`}>
            <div
              className={`text-2xl font-semibold mb-4 p-3 bg-[#094857] text-white px-3 rounded w-[36rem] ${titleBg}`}
            >
              New Department
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Department Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
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
        {departments.map((dep) => (
          <li
            key={dep.department_id}
            className="flex justify-between items-start p-2 border-b"
          >
            <div className="flex flex-col flex-1">
              {editableId === dep.department_id ? (
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
              ) : (
                <>
                  <span>{dep.name}</span>
                  <span className="text-sm text-gray-600 pl-2">
                    {dep.description ? dep.description : "No description"}
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-2">
              {editableId === dep.department_id ? (
                <>
                  <FaCheck
                    className="text-green-600 cursor-pointer"
                    onClick={() => handleUpdate(dep.department_id)}
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
                      setEditableId(dep.department_id);
                      setEditValue(dep.name);
                    }}
                  />
                  <IoMdRemoveCircle
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(dep.department_id)}
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
