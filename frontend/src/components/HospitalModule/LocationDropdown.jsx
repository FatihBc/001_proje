import React, { useEffect, useState } from "react";
import { getLocations } from "../../api/locations";

function LocationDropdown({ selectedLocation, onSelect }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then(setLocations).catch(console.error);
  }, []);

  return (
    <select value={selectedLocation} onChange={(e) => onSelect(e.target.value)}>
      <option value="">Lokasyon Seç</option>
      {locations.map(({ location_id, hospital_name }) => (
        <option key={location_id} value={location_id}>
          {hospital_name}
        </option>
      ))}
    </select>
  );
}

export default LocationDropdown;
