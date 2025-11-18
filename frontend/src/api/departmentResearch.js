import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function getDepartmentResearch() {
  const res = await axios.get(`${API_URL}/department-research`);
  return res.data;
}

export async function addDepartmentResearch(departmentId, researchId) {
  const res = await axios.post(`${API_URL}/department-research`, {
    department_id: departmentId,
    research_id: researchId,
  });
  return res.data;
}

export async function deleteDepartmentResearch(departmentId, researchId) {
  const res = await axios.delete(
    `${API_URL}/department-research/${departmentId}/${researchId}`
  );
  return res.data;
}
