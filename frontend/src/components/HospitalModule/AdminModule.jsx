import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/useTheme.js";
import LocationAdmin from "./LocationAdmin.jsx";
import DepartmentsAdmin from "./DepartmentsAdmin.jsx";
import DoctorsAdmin from "./DoctorsAdmin.jsx";
import { getDepartments } from "../../api/departments.js";
import { getLocations } from "../../api/locations.js";

export default function AdminModule() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchLocations();
  }, []);

  async function fetchDepartments() {
    const deps = await getDepartments();
    setDepartments(deps);
  }

  async function fetchLocations() {
    const locs = await getLocations();
    setLocations(locs);
  }

  const pageClass = `min-h-screen md:px-8 lg:px-16 ${
    isDark ? "bg-[#242424] text-white" : "bg-[#ecf3f4] text-black"
  }`;

  return (
    <div className={pageClass}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <LocationAdmin
          isDark={isDark}
          locations={locations}
          onLocationAdded={(newLoc) =>
            setLocations((prev) => [...prev, newLoc])
          }
          onLocationDeleted={(id) =>
            setLocations((prev) => prev.filter((loc) => loc.location_id !== id))
          }
          onLocationUpdated={(updatedLoc) =>
            setLocations((prev) =>
              prev.map((loc) =>
                loc.location_id === updatedLoc.location_id ? updatedLoc : loc
              )
            )
          }
        />

        <DepartmentsAdmin
          isDark={isDark}
          departments={departments}
          onDepartmentAdded={(newDep) =>
            setDepartments((prev) => [...prev, newDep])
          }
          onDepartmentDeleted={(id) =>
            setDepartments((prev) =>
              prev.filter((dep) => dep.department_id !== id)
            )
          }
          onDepartmentUpdated={(updatedDep) =>
            setDepartments((prev) =>
              prev.map((dep) =>
                dep.department_id === updatedDep.department_id
                  ? updatedDep
                  : dep
              )
            )
          }
        />

        <DoctorsAdmin
          isDark={isDark}
          doctors={doctors}
          setDoctors={setDoctors}
          departments={departments}
          locations={locations}
        />
      </div>
    </div>
  );
}
