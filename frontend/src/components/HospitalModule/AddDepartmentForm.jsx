import React, { useState } from "react";
import { addDepartment } from "../../api/departments";

function AddDepartmentForm({ onDepartmentAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDepartment = await addDepartment(form);
    onDepartmentAdded(newDepartment);
    setForm({ name: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Departman Adı"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Açıklama"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Departman Ekle</button>
    </form>
  );
}

export default AddDepartmentForm;
