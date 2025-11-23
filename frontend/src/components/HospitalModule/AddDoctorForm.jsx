import React, { useState } from "react";
import { addDoctor } from "../../api/doctors";
import DepartmentDropdown from "./DepartmentDropdown";
import LocationDropdown from "./LocationDropdown";

// Normalize helper
const normalizeDoctor = (raw) => ({
  id: raw.id,
  name: raw.name ?? raw.first_name ?? raw.doctor_name ?? "",
  surname: raw.surname ?? raw.last_name ?? raw.doctor_surname ?? "",
  department: raw.department ?? null,
  location: raw.location ?? null,
});

function AddDoctorForm({ onDoctorAdded, departments, locations }) {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    department_id: "",
    location_id: "",
  });

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDoctor = await addDoctor(form);
    onDoctorAdded(normalizeDoctor(newDoctor));
    setForm({ name: "", surname: "", department_id: "", location_id: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Ad"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="surname"
        placeholder="Soyad"
        value={form.surname}
        onChange={handleChange}
        required
      />

      <DepartmentDropdown
        departments={departments} // 🔑 güncel liste props’tan
        selectedDepartment={form.department_id}
        onSelect={(id) => setForm((prev) => ({ ...prev, department_id: id }))}
      />

      <LocationDropdown
        locations={locations} // 🔑 güncel liste props’tan
        selectedLocation={form.location_id}
        onSelect={(id) => setForm((prev) => ({ ...prev, location_id: id }))}
      />

      <button type="submit">Doktor Ekle</button>
    </form>
  );
}

export default AddDoctorForm;
