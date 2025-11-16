import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function getResearches() {
  const res = await axios.get(`${API_URL}/research`);
  return res.data;
}

export async function addResearch(research) {
  const res = await axios.post(`${API_URL}/research`, research);
  return res.data;
}

export async function deleteResearch(id) {
  const res = await axios.delete(`${API_URL}/research/${id}`);
  return res.data;
}

export async function updateResearch(id, research) {
  const res = await axios.put(`${API_URL}/research/${id}`, research);
  return res.data;
}
