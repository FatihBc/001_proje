import React, { useState } from "react";
import DepartmentDropdown from "./components/DepartmentDropdown";
import LocationDropdown from "./components/LocationDropdown";
import DoctorList from "./components/DoctorList";
import AddDoctorForm from "./components/AddDoctorForm";
import AddLocationForm from "./components/AddLocationForm";
import AddDepartmentForm from "./components/AddDepartmentForm";
import AddResearchForm from "./components/AddResearchForm";

function App() {
  const [departmentId, setDepartmentId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [refreshDoctors, setRefreshDoctors] = useState(false);

  // Doktor eklendiğinde listeyi yenilemek için tetikleyici
  const handleDoctorAdded = () => {
    setRefreshDoctors((prev) => !prev);
  };

  // Departman eklendiğinde dropdown yenilenebilir
  const handleDepartmentAdded = () => {
    // burada gerekirse departman dropdown için refresh tetiklenebilir
    console.log("Departman eklendi");
  };

  // Lokasyon eklendiğinde dropdown yenilenebilir
  const handleLocationAdded = () => {
    console.log("Lokasyon eklendi");
  };

  // Araştırma eklendiğinde liste yenilenebilir
  const handleResearchAdded = () => {
    console.log("Araştırma eklendi");
  };

  return (
    <div>
      <h1>Nöbet Planlama Sistemi</h1>

      {/* Filtre dropdownlar */}
      <DepartmentDropdown
        selectedDepartment={departmentId}
        onSelect={setDepartmentId}
      />
      <LocationDropdown
        selectedLocation={locationId}
        onSelect={setLocationId}
      />

      {/* Doktor ekleme */}
      <h2>Doktor Ekle</h2>
      <AddDoctorForm onDoctorAdded={handleDoctorAdded} />

      {/* Departman ekleme */}
      <h2>Departman Ekle</h2>
      <AddDepartmentForm onDepartmentAdded={handleDepartmentAdded} />

      {/* Lokasyon ekleme */}
      <h2>Lokasyon Ekle</h2>
      <AddLocationForm onLocationAdded={handleLocationAdded} />

      {/* Araştırma ekleme */}
      <h2>Araştırma Ekle</h2>
      <AddResearchForm onResearchAdded={handleResearchAdded} />

      {/* Doktor listesi */}
      <h2>Doktor Listesi</h2>
      <DoctorList
        departmentId={departmentId}
        locationId={locationId}
        refresh={refreshDoctors}
      />
    </div>
  );
}

export default App;
