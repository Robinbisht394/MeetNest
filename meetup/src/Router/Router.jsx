import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sign from "../Components/Authentication/Sign";
import Login from "../Components/Authentication/Login";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import AuthRoute from "../utils/AuthRoute";
import UserContextProvider from "../Context/UserContextProvider";
import EventForm from "../Components/miscellaneous/EventForm";
import OrganizerEvents from "../pages/OrganizerEvents";

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
    path: "/dashboard",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      { path: "/dashboard/create-event", element: <EventForm /> },
      {
        path: `/dashboard/events/oragniser=Robin Singh`,
        element: <OrganizerEvents />,
      },
    ],
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
