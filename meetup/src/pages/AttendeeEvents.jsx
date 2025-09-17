import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Tooltip } from "@chakra-ui/react";
import AttendeeEventCard from "../Components/miscellaneous/AttendeeEventCard";
import SearchPage from "./SearchPage";

const AttendeeEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  // usecallback
  const onApply = ({ category, eventType, location }) => {
    console.log(category, eventType, location);
    if (!category.length && eventType.trim() == "" && location.trim() == "")
      return;

    if (eventType.toLowerCase() == "online".toLowerCase()) {
      const filterdEvents = events.filter((event) => {
        return (
          category.includes(event.category) &&
          event.isOnline == true &&
          event.location.toLowerCase() == location.toLowerCase()
        );
      });
      setEvents(filterdEvents);
    } else if (eventType.toLowerCase() == "online".toLowerCase()) {
      const filterdEvents = events.filter((event) => {
        return (
          category.includes(event.category) &&
          event.isOnline == false &&
          event.location.toLowerCase() == location.toLowerCase()
        );
      });
      setEvents(filterdEvents);
    } else {
      const filterdEvents = events.filter((event) => {
        return (
          category.includes(event.category) &&
          event.location.toLowerCase() == location.toLowerCase()
        );
      });
      setEvents(filterdEvents);
    }
  };

  // usememo
  const onSortChange = (val) => {
    if (val.trim() != "") {
      switch (val) {
        case "dateAsc":
          {
            const sortedEvents = [...events].sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            });

            setEvents(sortedEvents);
          }
          break;
        case "dateDesc":
          {
            const sortedEvents = [...events].sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            });

            setEvents(sortedEvents);
          }
          break;
        case "popularityDesc":
          {
            const sortedEvents = [...events].sort((a, b) => {
              return b.likes.length - a.likes.length;
            });
            setEvents(sortedEvents);
          }
          break;
        case "popularityAsc":
          {
            const sortedEvents = [...events].sort((a, b) => {
              return a.likes.length - b.likes.length;
            });
            setEvents(sortedEvents);
          }

          break;

        default:
          setEvents(events);
          break;
      }
    }
  };

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
      <SearchPage onSortChange={onSortChange} onApply={onApply} />
      <div className="grid sm:grid-cols-2 gap-1 lg:grid-cols-3 grid-rows-4 p-2 w-[100%] h-[100%] overflow-y-scroll relative">
        {loading && <Spinner size={"lg"} position={"center"} mt={"4"} />}
        {events?.map((event) => {
          return (
            <Tooltip placement="bottom" label="click to view" key={event._id}>
              <span className="w-auto h-auto p-0">
                <AttendeeEventCard key={event._id} event={event} />
              </span>
            </Tooltip>
          );
        })}
      </div>
    </>
  );
};

export default AttendeeEvents;
