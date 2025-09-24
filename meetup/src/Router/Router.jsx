import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sign from "../Components/Authentication/Sign";
import Login from "../Components/Authentication/Login";
import Home from "../pages/Home";
const Layout = lazy(() => import("../pages/Layout"));
import AuthRoute from "../utils/AuthRoute";
import UserContextProvider from "../Context/UserContextProvider";
import EventForm from "../Components/miscellaneous/EventForm";

const OrganizerEvents = lazy(() => import("../pages/OrganizerEvents"));
const AttendeeEvents = lazy(() => import("../pages/AttendeeEvents"));
const EventDetails = lazy(() =>
  import("../Components/miscellaneous/EventDetails")
);
const SavedEvents = lazy(() => import("../pages/SavedEvents"));
import { Spinner } from "@chakra-ui/react";

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
        element: (
          <Suspense fallback={<Spinner size={"lg"} />}>
            <OrganizerEvents />
          </Suspense>
        ),
      },
      {
        path: `/dashboard/attendee/events`,
        element: (
          <Suspense fallback={<Spinner size={"lg"} />}>
            <AttendeeEvents />
          </Suspense>
        ),
      },
      {
        path: `/dashboard/event/:id`,
        element: (
          <Suspense fallback={<Spinner size={"lg"} />}>
            <EventDetails />
          </Suspense>
        ),
      },
      {
        path: `/dashboard/saved`,
        element: (
          <Suspense fallback={<Spinner size={"lg"} />}>
            <SavedEvents />
          </Suspense>
        ),
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
