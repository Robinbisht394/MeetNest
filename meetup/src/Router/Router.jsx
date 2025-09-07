import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sign from "../Components/Authentication/Sign";
import Login from "../Components/Authentication/Login";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import AuthRoute from "../Components/AuthRoute";
import UserContextProvider from "../Context/UserContextProvider";
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
  {
    path: "/layout",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
  },
]);
const Router = () => {
  return (
    <div>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </div>
  );
};

export default Router;
