import React from "react";
import { NavLink } from "react-router-dom";
import { Calendar, Bookmark } from "lucide-react";

const AttendeeSidebar = () => {
  // navigation list
  const navItems = [
    { name: "Events", icon: Calendar, path: "/dashboard/attendee/events" },
    { name: "Saved", icon: Bookmark, path: "/dashboard/saved" },
  ];

  return (
    <div className="h-screen w-60 bg-white text-blue-500 shadow-xl flex flex-col rounded-md m-1">
      {/* Logo / Title */}
      <div className="px-6 py-5 text-2xl font-bold border-b border-indigo-500">
        Attendee
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white text-blue-600 font-semibold shadow"
                  : "hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AttendeeSidebar;
