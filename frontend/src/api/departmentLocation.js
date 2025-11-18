import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function getDepartmentLocations() {
  const res = await axios.get(`${API_URL}/department-location`);
  return res.data;
}

export async function addDepartmentLocation(departmentId, locationId) {
  const res = await axios.post(`${API_URL}/department-location`, {
    department_id: departmentId,
    location_id: locationId,
  });
  return res.data;
}

export async function deleteDepartmentLocation(departmentId, locationId) {
  const res = await axios.delete(
    `${API_URL}/department-location/${departmentId}/${locationId}`
  );
  return res.data;
}
