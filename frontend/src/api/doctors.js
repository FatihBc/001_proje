import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function getDoctors(departmentId, locationId) {
  const params = {};
  if (departmentId) params.department_id = departmentId;
  if (locationId) params.location_id = locationId;

  const res = await axios.get(`${API_URL}/doctors/filter`, { params });
  return res.data;
}

export async function addDoctor(doctor) {
  const res = await axios.post(`${API_URL}/doctors`, doctor);
  return res.data;
}

export async function deleteDoctor(id) {
  const res = await axios.delete(`${API_URL}/doctors/${id}`);
  return res.data;
}

export async function updateDoctor(id, doctor) {
  const res = await axios.put(`${API_URL}/doctors/${id}`, doctor);
  return res.data;
}
