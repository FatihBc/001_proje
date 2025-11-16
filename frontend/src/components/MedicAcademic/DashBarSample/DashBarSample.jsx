import React, { useState } from "react";
import { useTheme } from "../../../context/useTheme.js";
import {
  IoHomeOutline,
  IoPersonOutline,
  IoChatbubbleOutline,
  IoCameraOutline,
  IoSettingsOutline,
} from "react-icons/io5";

function DashBarSample() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [active, setActive] = useState(0);

  const navItems = [
    { name: "Home", icon: <IoHomeOutline />, left: "3rem" },
    { name: "Profile", icon: <IoPersonOutline />, left: "8rem" },
    { name: "Message", icon: <IoChatbubbleOutline />, left: "13rem" },
    { name: "Photos", icon: <IoCameraOutline />, left: "18rem" },
    { name: "Settings", icon: <IoSettingsOutline />, left: "23rem" },
  ];

  const wrapperClasses = isDark
    ? "bg-neutral-700 border-[#2a2a2a] text-white"
    : "bg-[#094857] border-gray-300 text-black";

  const cardClasses = isDark
    ? "bg-neutral-800 border-[#444] shadow-black"
    : "bg-white border-gray-300 shadow-gray-400";

  return (
    <div
      className={`flex justify-center items-center min-h-40 w-full rounded-lg ${wrapperClasses}`}
    >
      <div
        className={`relative ${cardClasses} px-2 mx-3 rounded-2xl shadow-md dashbar-wrapper`}
      >
        <ul className="flex relative">
          {/* Aktif yuvarlak arka plan */}
          <span
            className={`bg-rose-500 duration-500 absolute -top-4
    border-4 ${
      isDark ? "border-[#404040]" : "border-[#094857]"
    } h-12 w-12 rounded-full 
    flex items-center justify-center shadow-lg`}
            style={{ left: navItems[active].left }}
          >
            <span className="text-white text-2xl">{navItems[active].icon}</span>

            {/* Sol glow */}
            <span
              className="w-3.5 h-3.5 bg-transparent absolute top-3 -left-[18px] rounded-tr-[11px]"
              style={{
                boxShadow: `4.1px -4.1px ${isDark ? "#404040" : "#094857"}`,
              }}
            ></span>
            {/* Sağ glow */}
            <span
              className="w-3.5 h-3.5 bg-transparent absolute top-3 -right-[18px] rounded-tl-[11px]"
              style={{
                boxShadow: `-4.1px -4.1px ${isDark ? "#404040" : "#094857"}`,
              }}
            ></span>
          </span>

          {/* Menü itemleri */}
          {navItems.map((item, i) => (
            <li
              key={i}
              className="w-20 text-center relative"
              onClick={() => setActive(i)}
            >
              <a className="flex flex-col items-center h-15 justify-center">
                {/* Pasif ikon */}
                <span
                  className={`text-3xl cursor-pointer pt-5 duration-500 ${
                    i === active ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <spa3
                  className={`text-md font-medium duration-700 ${
                    active === i
                      ? "translate-y-0 opacity-100"
                      : "opacity-0 translate-y-5"
                  } ${isDark ? "text-white" : "text-gray-700"} mb-3`}
                >
                  {item.name}
                </spa3>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashBarSample;
