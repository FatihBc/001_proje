import React, { useEffect, useState } from "react";
import { getDepartments } from "../../api/departments";

function DepartmentDropdown({ selectedDepartment, onSelect }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments().then(setDepartments).catch(console.error);
  }, []);

  return (
    <select
      value={selectedDepartment}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Departman Seç</option>
      {departments.map(({ department_id, name }) => (
        <option key={department_id} value={department_id}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default DepartmentDropdown;
