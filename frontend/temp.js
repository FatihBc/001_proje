// doktor listeleme:
fetch(
  `/api/doctors?location_id=${selectedLocation}&department_id=${selectedDepartment}`
)
  .then((res) => res.json())
  .then((data) => setDoctors(data));
