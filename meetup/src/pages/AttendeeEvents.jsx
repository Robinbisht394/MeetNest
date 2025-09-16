import React from "react";
import { useState } from "react";

import axios from "axios";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import AttendeeEventCard from "../Components/miscellaneous/AttendeeEventCard";
import SearchBar from "../Components/miscellaneous/SearchBar";
import SearchPage from "./SearchPage";
const AttendeeEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/event/listevents"
        );

        setEvents(response?.data);
      } catch (er) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  return (
    <>
      <SearchPage />
      <div className="grid sm:grid-cols-2 gap-1 lg:grid-cols-3 grid-rows-4 p-2 w-[100%] h-[100%] overflow-y-scroll relative">
        {loading && <Spinner size={"lg"} position={"center"} mt={"4"} />}
        {events?.map((event) => {
          return <AttendeeEventCard key={event._id} event={event} />;
        })}
      </div>
    </>
  );
};

export default AttendeeEvents;
