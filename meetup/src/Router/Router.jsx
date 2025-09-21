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
import AttendeeEvents from "../pages/AttendeeEvents";
import EventDetails from "../Components/miscellaneous/EventDetails";
import SavedEvents from "../pages/SavedEvents";

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
      {
        path: `/dashboard/attendee/events`,
        element: <AttendeeEvents />,
      },
      {
        path: `/dashboard/event/:id`,
        element: <EventDetails />,
      },
      {
        path: `/dashboard/saved`,
        element: <SavedEvents />,
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
