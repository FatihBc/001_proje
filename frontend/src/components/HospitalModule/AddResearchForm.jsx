import React, { useState } from "react";
import { addResearch } from "../../api/research";

function AddResearchForm({ onResearchAdded }) {
  const [form, setForm] = useState({
    title: "",
    field: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResearch = await addResearch(form);
    onResearchAdded(newResearch);
    setForm({
      title: "",
      field: "",
      start_date: "",
      end_date: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Araştırma Başlığı"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="field"
        placeholder="Alan (örn. Kardiyoloji)"
        value={form.field}
        onChange={handleChange}
      />
      <input
        type="date"
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
      />
      <input
        type="date"
        name="end_date"
        value={form.end_date}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Açıklama"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Araştırma Ekle</button>
    </form>
  );
}

export default AddResearchForm;
