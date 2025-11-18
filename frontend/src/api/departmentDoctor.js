import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function getDepartmentDoctors() {
  const res = await axios.get(`${API_URL}/department-doctor`);
  return res.data;
}

export async function addDepartmentDoctor(departmentId, doctorId) {
  const res = await axios.post(`${API_URL}/department-doctor`, {
    department_id: departmentId,
    doctor_id: doctorId,
  });
  return res.data;
}

export async function deleteDepartmentDoctor(id) {
  const res = await axios.delete(`${API_URL}/department-doctor/${id}`);
  return res.data;
}
