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
// import Analytics from "../pages/Analytics";
const Analytics = lazy(() => import("../pages/Analytics"));
const OrganizerEventCard = lazy(() =>
  import("../Components/miscellaneous/OrganizerEventCard")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <Sign />,
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
        path: `/dashboard/organizer/event/:id`,
        element: (
          <Suspense fallback={<Spinner size={"lg"} />}>
            <OrganizerEventCard />
          </Suspense>
        ),
      },
      {
        path: `/dashboard/events/oragniser`,
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
      {
        path: `/dashboard/analytics`,
        element: (
          <Suspense fallback={<Spinner size={"lg"} />}>
            <Analytics />
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
