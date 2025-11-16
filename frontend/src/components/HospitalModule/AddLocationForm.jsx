import React, { useState } from "react";
import { addLocation } from "../../api/locations";

function AddLocationForm({ onLocationAdded }) {
  const [form, setForm] = useState({
    hospital_name: "",
    city: "",
    address: "",
  });

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLocation = await addLocation(form);
    onLocationAdded(newLocation);
    setForm({ hospital_name: "", city: "", address: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="hospital_name"
        placeholder="Hastane Adı"
        value={form.hospital_name}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="Şehir"
        value={form.city}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Adres"
        value={form.address}
        onChange={handleChange}
      />
      <button type="submit">Lokasyon Ekle</button>
    </form>
  );
}

export default AddLocationForm;
