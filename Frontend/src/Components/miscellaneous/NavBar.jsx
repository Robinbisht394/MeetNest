import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or App Name - Left Side */}
        <a href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          MeetNest
        </a>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <a
            href="/"
            className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium transition duration-150 py-2 px-3"
          >
            Home
          </a>
          <a
            href="/dashboard"
            className="hidden sm:flex items-center text-gray-700 hover:text-blue-600 transition duration-150 py-2 px-3"
          >
            <FaUserCircle className="mr-1" size={18} /> Dashboard
          </a>

          <a
            href="/sign-up"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-50 transition duration-200"
          >
            Log In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
