import React from "react";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import NavigatinBar from "./NavigatinBar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/useTheme.js";
import Fuse from "fuse.js";
import researchs from "../../data/data.js";
import "../../App.css";
import logo from "../../images/medic-academic.png";

function Header() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [results, setResults] = React.useState([]);
  const searchRef = React.useRef(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
        setSearchQuery(""); // input'u sıfırla
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const flattenedResearchs = researchs.flatMap((section) =>
    section.content.map((item) => ({
      ...item,
      category: section.headTitle, // kategori bilgisini koruyalım
    }))
  );

  const fuse = React.useMemo(() => {
    return new Fuse(flattenedResearchs, {
      keys: ["title", "authors", "journal", "tags"],
      threshold: 0.3,
    });
  }, []);

  const handleClick = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 50);
  };

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  function handleSearch(query) {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const found = fuse.search(query);
    setResults(found.map((item) => item.item));
  }

  return (
    <div className="header-row">
      <img
        onClick={handleClick}
        className="logo cursor-pointer"
        src={logo}
        alt="Logo"
      />
      <div>
        <div className="flex justify-end mb-4 items-end">
          <div className="relative" ref={searchRef}>
            <input
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                handleSearch(value);
              }}
              className={`w-full sm:w-[320px] md:w-[400px] lg:w-[480px] ${
                theme === "dark" ? "search-input-dark" : "search-input-light"
              }`}
              type="text"
              placeholder="Search..."
            />
            {results.length > 0 && (
              <div
                className={`absolute top-full mt-1 w-full z-50 rounded-md shadow-lg ${
                  theme === "dark" ? "bg-[#1e1e1e]" : "bg-white"
                }`}
              >
                {results.map((item) => (
                  <div
                    key={item.researchId}
                    onClick={() =>
                      window.open(`/researchs/${item.researchId}`, "_blank")
                    }
                    className="px-4 py-2 cursor-pointer hover:bg-[#217c93] hover:text-white rounded-md transition"
                    style={{
                      maxWidth: "100%",
                      lineHeight: "1.4",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* İkon kutusu: sol-alt hiza */}
          <button
            onClick={changeTheme}
            className="ml-2 h-10 w-10 flex items-end justify-start"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <CiLight className="h-5 w-5 block leading-none" />
            ) : (
              <FaMoon className="h-5 w-5 block leading-none text-[#094857] hover:text-[#217c93]" />
            )}
          </button>
        </div>

        <div>
          <NavigatinBar />
        </div>
      </div>
    </div>
  );
}

export default Header;
