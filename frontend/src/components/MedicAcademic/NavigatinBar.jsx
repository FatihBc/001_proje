import React from "react";
import { Link } from "react-router-dom";

function NavigatinBar() {
  return (
    <div className="flex justify-between flex-wrap">
      <Link
        className="h-10 text-center mx-1 my-1 px-3 py-2 rounded-md bg-[#094857] text-white"
        to="/"
      >
        Home Page
      </Link>
      <Link
        className="h-10 text-center mx-1 my-1 px-3 py-2 rounded-md bg-[#094857] text-white"
        to="/about"
      >
        About
      </Link>
      <Link
        className="h-10 text-center mx-1 my-1 px-3 py-2 rounded-md bg-[#094857] text-white"
        to="/researchs"
      >
        Researchs
      </Link>
      <Link
        className="h-10 text-center mx-1 my-1 px-3 py-2 rounded-md bg-[#094857] text-white"
        to="/projects"
      >
        Projects
      </Link>
      <Link
        className="h-10 text-center mx-1 my-1 px-3 py-2 rounded-md bg-[#094857] text-white"
        to="/algorithms"
      >
        Algorithms
      </Link>
      <Link
        className="h-10 text-center mx-1 my-1 px-3 py-2 rounded-md bg-[#094857] text-white"
        to="/hospital"
      >
        Hospital Module
      </Link>
    </div>
  );
}

export default NavigatinBar;
