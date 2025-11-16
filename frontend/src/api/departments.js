import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function getDepartments() {
  const res = await axios.get(`${API_URL}/departments`);
  return res.data;
}

export async function addDepartment(department) {
  const res = await axios.post(`${API_URL}/departments`, department);
  return res.data;
}

export async function deleteDepartment(id) {
  const res = await axios.delete(`${API_URL}/departments/${id}`);
  return res.data;
}

export async function updateDepartment(id, department) {
  const res = await axios.put(`${API_URL}/departments/${id}`, department);
  return res.data;
}
