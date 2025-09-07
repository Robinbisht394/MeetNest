import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sign from "../Authentication/Sign";
import Home from "../pages/Home";
import Login from "../Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sign />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
const Router = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default Router;
