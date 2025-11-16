import React from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Calculator from "../components/MedicAcademic/Calculator/Calculator";
import CurrencyChanger from "../components/MedicAcademic/CurrencyChanger";
import PasswordStrength from "../components/MedicAcademic/PasswordStrength/PasswordStrength";
import ToDo from "../components/MedicAcademic/ToDo/ToDo";
import MemoryGame from "../components/MedicAcademic/GameMatch/GameBoard";
import { GameProvider } from "../components/MedicAcademic/GameMatch/GameContext";
import { useTheme } from "../context/useTheme";
import DashBarSample from "../components/MedicAcademic/DashBarSample/DashBarSample";

function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/").pop() || "calculator";

  const pageBg = isDark ? "bg-[#242424] text-white" : "bg-[#ecf3f4] text-black";
  const cardBg = isDark
    ? "bg-[#1e1e1e] border-gray-700"
    : "bg-gray-50 border-gray-200";
  const titleBg = isDark
    ? "bg-[#0a3c4a] text-white"
    : "bg-[#094857] text-white";
  const pageClass = `min-h-screen md:px-8 lg:px-16 ${pageBg}`;
  const activeLinkBg = isDark ? "bg-[#1e1e1e]" : "bg-gray-50";

  const getLinkClass = (isActive) => {
    return isActive
      ? `block px-3 py-2 transition-colors duration-200 border-l-8 ${activeLinkBg} border-[#0a3c4a] font-semibold rounded-l-none rounded-r-md`
      : `block px-3 py-2 transition-colors duration-200 border-l-4 ${
          isDark
            ? "hover:bg-[#333] text-gray-300"
            : "hover:bg-gray-200 text-gray-700"
        } rounded-md`;
  };

  const programs = [
    {
      id: 1,
      title: "Calculator",
      path: "calculator",
      component: <Calculator />,
    },
    {
      id: 2,
      title: "Currency Changer",
      path: "currency",
      component: <CurrencyChanger />,
    },
    { id: 3, title: "To Do List", path: "todo", component: <ToDo /> },
    {
      id: 4,
      title: "Password Strength Checker",
      path: "passwordstrength",
      component: <PasswordStrength />,
    },
    {
      id: 5,
      title: "Memory Game",
      path: "memorygame",
      component: (
        <GameProvider>
          <MemoryGame />
        </GameProvider>
      ),
    },
    {
      id: 6,
      title: "Magic Navigation Menu",
      path: "dashbarsample",
      component: <DashBarSample />,
    },
  ];

  return (
    <div className={pageClass}>
      <div className="projects-container flex sm:flex-row gap-4 sm:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden sm:block w-64">
          <h4
            className={`text-lg text-center font-semibold mb-4 p-1 rounded-lg ${titleBg}`}
          >
            Projects
          </h4>
          <ul className="space-y-2">
            {programs.map((program) => (
              <li key={program.id} className="mb-2">
                <NavLink
                  to={`/projects/${program.path}`}
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  {program.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <main className="w-full">
          {/* Mobile dropdown */}
          <div className="block sm:hidden w-full mb-4">
            <select
              value={currentPath}
              onChange={(e) => navigate(`/projects/${e.target.value}`)}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              {programs.map((program) => (
                <option key={program.id} value={program.path}>
                  {program.title}
                </option>
              ))}
            </select>
          </div>

          <Routes>
            <Route path="/" element={<Navigate to="calculator" />} />
            {programs.map((program) => (
              <Route
                key={program.id}
                path={program.path}
                element={
                  <div
                    className={`p-4 rounded-lg shadow-md border ${cardBg} component-wrapper`}
                  >
                    <h5
                      className={`text-lg text-center font-semibold mb-4 p-2 rounded-lg ${titleBg}`}
                    >
                      {program.title}
                    </h5>
                    <div className="content-wrapper">{program.component}</div>
                  </div>
                }
              />
            ))}
          </Routes>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Projects;
