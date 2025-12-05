import { NavLink } from "react-router-dom";
import { Calendar, PlusCircle, User } from "lucide-react"; // icons
import { useContext } from "react";
import { UserContext } from "../../Context/UserContextProvider";

const OrganizerSideBar = () => {
  const { user } = useContext(UserContext);
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 
    ${
      isActive
        ? "bg-blue-600 text-white font-medium"
        : "text-gray-600 hover:bg-blue-100"
    }`;

  return (
    <div className="w-64 h-screen bg-white shadow-lg border-r flex flex-col">
      {/* Logo / Brand */}
      <div className="p-6 text-2xl font-bold text-blue-600">Organizer</div>

      {/* Links */}
      <nav className="flex-1 px-4 space-y-2">
        <NavLink to={`/dashboard/events/oragniser`} className={linkClass}>
          <Calendar className="w-5 h-5" />
          Events
        </NavLink>

        <NavLink to="/dashboard/create-event" className={linkClass}>
          <PlusCircle className="w-5 h-5" />
          Create
        </NavLink>

        <NavLink to="/dashboard/analytics" className={linkClass}>
          <User className="w-5 h-5" />
          Analytics
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-sm text-gray-500">
        © 2025 Meetup App
      </div>
    </div>
  );
};

export default OrganizerSideBar;
