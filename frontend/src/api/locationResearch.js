import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function getLocationResearch() {
  const res = await axios.get(`${API_URL}/location-research`);
  return res.data;
}

export async function addLocationResearch(locationId, researchId) {
  const res = await axios.post(`${API_URL}/location-research`, {
    location_id: locationId,
    research_id: researchId,
  });
  return res.data;
}

export async function deleteLocationResearch(locationId, researchId) {
  const res = await axios.delete(
    `${API_URL}/location-research/${locationId}/${researchId}`
  );
  return res.data;
}
