import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import TopBar from "../Components/miscellaneous/TopBar";
import Organizer from "../Components/miscellaneous/OrganizerSideBar";
import Attendee from "../Components/miscellaneous/AttendeeSidebar";
import { UserContext } from "../Context/UserContextProvider";
const Layout = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <TopBar />
      <div className="flex justify-between items-center mt-2 p-1 sm:justify-center sm:items-center">
        <aside className="w-[20%] h-[92vh] hidden md:flex rounded-sm">
          {user.role.toLowerCase() == "organizer".toLowerCase() ? (
            <Organizer />
          ) : (
            <Attendee />
          )}
        </aside>
        <main className="sm:w[100vw] w-[79%] h-[92vh] rounded-sm overflow-y-scroll p-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
