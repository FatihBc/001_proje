import React, { useEffect, useState } from "react";
import { getDepartments } from "../api/departments";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getDepartments();
      setDepartments(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Departmanlar</h2>
      <ul>
        {departments.map((dept) => (
          <li key={dept.department_id}>
            {dept.name} - {dept.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentList;
