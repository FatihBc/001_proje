import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function getDepartments() {
  const res = await axios.get(`${API_URL}/departments`);
  return res.data;
}
