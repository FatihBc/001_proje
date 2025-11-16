import { useEffect } from "react";
import Header from "../components/MedicAcademic/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Projects from "../pages/Projects.jsx";
import Researchs from "../pages/Researchs.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import About from "../pages/About.jsx";
import Algorithms from "../pages/Algorithms.jsx";
import { useTheme } from "./useTheme.js";
import ResearchDetailPage from "../components/MedicAcademic/Researchs/ResearchDetailPage.jsx";
import HospitalModule from "../pages/HospitalModule.jsx";

export default function ThemeWrapper() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(
      theme === "dark" ? "theme-dark" : "theme-light"
    );
  }, [theme]);

  return (
    <div className="page-container w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/*" element={<Projects />} />
        <Route path="/researchs/:id" element={<ResearchDetailPage />} />
        <Route path="/researchs" element={<Researchs />} />
        <Route path="/algorithms" element={<Algorithms />} />
        <Route path="/hospital/*" element={<HospitalModule />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
