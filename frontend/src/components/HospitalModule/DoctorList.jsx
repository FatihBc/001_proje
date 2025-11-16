import React, { useEffect, useState } from "react";
import { getDoctors, deleteDoctor, updateDoctor } from "../../api/doctors";

// Gelen veriyi normalize et
const normalizeDoctor = (raw) => ({
  id: raw.doctor_id,
  name: raw.name ?? raw.first_name ?? raw.doctor_name ?? "",
  surname: raw.surname ?? raw.last_name ?? raw.doctor_surname ?? "",
  department: raw.department ?? null,
  location: raw.location ?? null,
});

function DoctorList({ departmentId, locationId, refresh }) {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", surname: "" });

  // Doktor listesini backend’den çek
  useEffect(() => {
    getDoctors(departmentId, locationId)
      .then((data) => {
        const normalized = Array.isArray(data) ? data.map(normalizeDoctor) : [];
        setDoctors(normalized);
      })
      .catch(console.error);
  }, [departmentId, locationId, refresh]);

  // Silme işlemi
  const handleDelete = async (id) => {
    await deleteDoctor(id);
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  // Güncelleme formunu aç
  const startEdit = (doc) => {
    setEditingDoctor(doc.id);
    setEditForm({ name: doc.name, surname: doc.surname });
  };

  // Güncelleme işlemi
  const handleUpdate = async (id) => {
    const updated = await updateDoctor(id, editForm);
    const normalizedUpdated = normalizeDoctor(updated);

    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              name: normalizedUpdated.name,
              surname: normalizedUpdated.surname,
              department: normalizedUpdated.department ?? doc.department,
              location: normalizedUpdated.location ?? doc.location,
            }
          : doc
      )
    );

    setEditingDoctor(null);
    setEditForm({ name: "", surname: "" });
  };

  // Düzenleme formundaki input değerlerini yönetme
  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <h2>Doktorlar</h2>
      {doctors.length === 0 ? (
        <p>Doktor bulunamadı.</p>
      ) : (
        <ul>
          {doctors.map((doc) => (
            <li key={doc.id}>
              {editingDoctor === doc.id ? (
                <div>
                  <input
                    placeholder="Ad"
                    value={editForm.name}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                  />
                  <input
                    placeholder="Soyad"
                    value={editForm.surname}
                    onChange={(e) =>
                      handleEditChange("surname", e.target.value)
                    }
                  />
                  <button onClick={() => handleUpdate(doc.id)}>Kaydet</button>
                  <button
                    onClick={() => {
                      setEditingDoctor(null);
                      setEditForm({ name: "", surname: "" });
                    }}
                  >
                    İptal
                  </button>
                </div>
              ) : (
                <>
                  {doc.name || "(İsim yok)"} {doc.surname || "(Soyad yok)"} - (
                  {doc.department?.name ?? "Departman yok"},{" "}
                  {doc.location?.hospital_name ??
                    doc.location?.name ??
                    "Lokasyon yok"}
                  )<button onClick={() => handleDelete(doc.id)}>Sil</button>
                  <button onClick={() => startEdit(doc)}>Güncelle</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorList;
