import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or App Name - Left Side */}
        <h1 className="text-4xl font-extrabold text-blue-600">MeetNest</h1>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <NavLink
            to={`/`}
            className=" sm:block text-gray-700 hover:text-blue-600 font-medium transition duration-150 py-2 px-3"
          >
            Home
          </NavLink>
          <NavLink
            to={`/dashboard`}
            className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium transition duration-150 py-2 px-3 md:flex md:justify-center md:items-center"
          >
            <FaUserCircle className="mr-1" size={18} /> <p>Dashboard</p>
          </NavLink>

          <NavLink
            to={`/sign-up`}
            className=" sm:block text-gray-700 hover:text-blue-600 font-medium transition duration-150 py-2 px-3"
          >
            Sign Up
          </NavLink>

          <NavLink
            to={`/login`}
            className=" sm:block text-gray-700 hover:text-blue-600 font-medium transition duration-150 py-2 px-3"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
