import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/useTheme.js";
import { getLocations, addLocation } from "../../api/locations.js";
import { getDepartments, addDepartment } from "../../api/departments.js";
import { getDoctors, addDoctor } from "../../api/doctors.js";

export default function AdminModule() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const locs = await getLocations();
    setLocations(locs);
    const deps = await getDepartments();
    setDepartments(deps);
    const docs = await getDoctors();
    setDoctors(docs);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (modalType === "location") {
        await addLocation(formData);
      } else if (modalType === "department") {
        await addDepartment(formData);
      } else if (modalType === "doctor") {
        await addDoctor(formData);
      }
      setShowModal(false);
      setFormData({});
      fetchData(); // listeyi güncelle
    } catch (err) {
      console.error("Ekleme hatası:", err);
    }
  }

  const titleBg = isDark
    ? "bg-[#0a3c4a] text-white"
    : "bg-[#094857] text-white";
  const pageClass = `min-h-screen md:px-8 lg:px-16 ${
    isDark ? "bg-[#242424] text-white" : "bg-[#ecf3f4] text-black"
  }`;
  const cardClass = `p-4 rounded-lg border ${
    isDark ? "bg-[#242424] border-gray-700" : "bg-gray-50 border-gray-200"
  }`;
  const buttonClass = `ml-auto px-2 py-1 text-xs rounded-lg ${
    isDark
      ? "bg-[#242424] text-white border border-gray-600"
      : "bg-gray-50 text-black border border-gray-300"
  } hover:scale-105 transition-transform duration-200`;

  return (
    <div className={pageClass}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lokasyonlar */}
        <div className={cardClass}>
          <div
            className={`flex items-center justify-between text-lg p-2 rounded-lg mb-4 ${titleBg}`}
          >
            <span>Lokasyonlar</span>
            <button
              className={buttonClass}
              style={{
                fontSize: "12px",
                padding: "2px 4px",
                borderRadius: "6px",
              }}
              onClick={() => {
                setModalType("location");
                setShowModal(true);
              }}
            >
              Yeni Ekle
            </button>
          </div>
          <ul className="list-disc pl-5">
            {locations.map((loc) => (
              <li key={loc.location_id}>{loc.hospital_name}</li>
            ))}
          </ul>
        </div>

        {/* Departmanlar */}
        <div className={cardClass}>
          <div
            className={`flex items-center justify-between text-lg p-2 rounded-lg mb-4 ${titleBg}`}
          >
            <span>Departmanlar</span>
            <button
              className={buttonClass}
              style={{
                fontSize: "12px",
                padding: "2px 4px",
                borderRadius: "6px",
              }}
              onClick={() => {
                setModalType("department");
                setShowModal(true);
              }}
            >
              Yeni Ekle
            </button>
          </div>
          <ul className="list-disc pl-5">
            {departments.map((dep) => (
              <li key={dep.department_id}>{dep.name}</li>
            ))}
          </ul>
        </div>

        {/* Doktorlar */}
        <div className={cardClass}>
          <div
            className={`flex items-center justify-between text-lg p-2 rounded-lg mb-4 ${titleBg}`}
          >
            <span>Doktorlar</span>
            <button
              className={buttonClass}
              style={{
                fontSize: "12px",
                padding: "2px 4px",
                borderRadius: "6px",
              }}
              onClick={() => {
                setModalType("doctor");
                setShowModal(true);
              }}
            >
              Yeni Ekle
            </button>
          </div>
          <ul className="list-disc pl-5">
            {doctors.map((doc) => (
              <li key={doc.doctor_id}>
                {doc.name} {doc.surname} ({doc.location?.hospital_name},{" "}
                {doc.department?.name})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setShowModal(false)}
        >
          <div
            className={`p-6 rounded-lg shadow-lg ${
              isDark ? "bg-[#1e1e1e]" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-bold mb-4">
              {modalType === "location" && "Yeni Lokasyon"}
              {modalType === "department" && "Yeni Departman"}
              {modalType === "doctor" && "Yeni Doktor"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {modalType === "location" && (
                <input
                  type="text"
                  placeholder="Hospital Name"
                  className="border p-2 rounded w-full"
                  value={formData.hospital_name || ""}
                  onChange={(e) =>
                    setFormData({ hospital_name: e.target.value })
                  }
                />
              )}
              {modalType === "department" && (
                <input
                  type="text"
                  placeholder="Department Name"
                  className="border p-2 rounded w-full"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ name: e.target.value })}
                />
              )}
              {modalType === "doctor" && (
                <>
                  <input
                    type="text"
                    placeholder="Doctor Name"
                    className="border p-2 rounded w-full"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    className="border p-2 rounded w-full"
                    value={formData.surname || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, surname: e.target.value })
                    }
                  />
                  {/* İlişkili departman/lokasyon seçimi için dropdown eklenebilir */}
                </>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 rounded bg-gray-300"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-green-600 text-white"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
