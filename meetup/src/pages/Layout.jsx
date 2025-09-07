import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import TopBar from "../Components/miscellaneous/TopBar";
import Organizer from "../Components/miscellaneous/OrganizerSideBar";
import Attendee from "../Components/miscellaneous/AttendeeSidebar";
import { UserContext } from "../Context/UserContextProvider";
const Layout = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <TopBar />
      <div>
        <aside>{user.role == "organiser" ? <Organizer /> : <Attendee />}</aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
