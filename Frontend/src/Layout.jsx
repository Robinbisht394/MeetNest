import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Profile />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
