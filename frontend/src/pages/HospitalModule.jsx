import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { useTheme } from "../context/useTheme.js";

// HospitalModule altındaki componentler
import AddDepartmentForm from "../components/HospitalModule/AddDepartmentForm.jsx";
import AddDoctorForm from "../components/HospitalModule/AddDoctorForm.jsx";
import AddLocationForm from "../components/HospitalModule/AddLocationForm.jsx";
import DoctorList from "../components/HospitalModule/DoctorList.jsx";
import AddResearchForm from "../components/HospitalModule/AddResearchForm.jsx";
import ResearchContainer from "../components/HospitalModule/ResearchContainer.jsx";

export default function HospitalModule() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerClass = `hospital-module container py-4 ${
    isDark ? "bg-[#242424] text-white" : "bg-[#ecf3f4] text-black"
  }`;

  const sectionTitleClass = `text-2xl font-semibold mb-4 ${
    isDark ? "text-white" : "text-[#094857]"
  }`;

  return (
    <div className={containerClass}>
      <h1 className="mb-4 text-3xl font-bold">Hospital Module</h1>

      {/* Navigation Tabs */}
      <nav className="mb-6 flex gap-4">
        <NavLink to="/hospital/admin" className="hover:underline">
          Yönetici Modülü
        </NavLink>
        <NavLink to="/hospital/doctors" className="hover:underline">
          Doktor Listesi
        </NavLink>
        <NavLink to="/hospital/doctor-researchs" className="hover:underline">
          Doctor Researchs
        </NavLink>
      </nav>

      {/* Nested Routes */}
      <Routes>
        {/* Yönetici Modülü */}
        <Route
          path="admin"
          element={
            <div>
              <h2 className={sectionTitleClass}>Yönetici Modülü</h2>
              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Lokasyon Ekle</h3>
                <AddLocationForm />
              </section>
              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Departman Ekle</h3>
                <AddDepartmentForm />
              </section>
              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Doktor Ekle</h3>
                <AddDoctorForm />
              </section>
            </div>
          }
        />

        {/* Doktor Listesi */}
        <Route
          path="doctors"
          element={
            <div>
              <h2 className={sectionTitleClass}>Doktor Listesi</h2>
              <DoctorList />
            </div>
          }
        />

        {/* Doctor Researchs */}
        <Route
          path="doctor-researchs"
          element={
            <div>
              <h2 className={sectionTitleClass}>Doctor Researchs</h2>
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Solda ekleme */}
                <div className="sm:w-[40%] w-full">
                  <h3 className="text-lg font-semibold mb-2">Araştırma Ekle</h3>
                  <AddResearchForm />
                </div>
                {/* Sağda listeleme */}
                <div className="sm:w-[60%] w-full">
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    Araştırma Listesi
                  </h3>
                  <ResearchContainer />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
