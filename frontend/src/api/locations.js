import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getLocations() {
  const res = await axios.get(`${API_URL}/locations`);
  return res.data;
}

export async function addLocation(location) {
  const res = await axios.post(`${API_URL}/locations`, location);
  return res.data;
}

export async function deleteLocation(id) {
  const res = await axios.delete(`${API_URL}/locations/${id}`);
  return res.data;
}

export async function updateLocation(id, location) {
  const res = await axios.put(`${API_URL}/locations/${id}`, location);
  return res.data;
}
