import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function getDoctorResearch() {
  const res = await axios.get(`${API_URL}/doctor-research`);
  return res.data;
}

export async function addDoctorResearch(doctorId, researchId) {
  const res = await axios.post(`${API_URL}/doctor-research`, {
    doctor_id: doctorId,
    research_id: researchId,
  });
  return res.data;
}

export async function deleteDoctorResearch(doctorId, researchId) {
  const res = await axios.delete(
    `${API_URL}/doctor-research/${doctorId}/${researchId}`
  );
  return res.data;
}
