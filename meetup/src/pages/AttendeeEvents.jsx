import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Spinner, Tooltip } from "@chakra-ui/react";
import AttendeeEventCard from "../Components/miscellaneous/AttendeeEventCard";
import SearchPage from "./SearchPage";
import { UserContext } from "../Context/UserContextProvider";

const AttendeeEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const { user } = useContext(UserContext);

  // (usecallback) handle event filter
  const onApply = ({ category, eventType, location }) => {
    console.log(category, eventType, location);
    if (!category.length && eventType.trim() == "" && location.trim() == "")
      return;

    if (eventType.toLowerCase() == "online".toLowerCase()) {
      const filterdEvents = events.filter((event) => {
        return (
          category.includes(event?.category) &&
          event.isOnline == true &&
          event.venue.toLowerCase().includes(location.toLowerCase())
        );
      });
      setEvents(filterdEvents);
    } else if (eventType.toLowerCase() == "offline".toLowerCase()) {
      const filterdEvents = events.filter((event) => {
        return (
          category.includes(event.category) &&
          event.isOnline == false &&
          event.venue.toLowerCase().includes(location.toLowerCase())
        );
      });
      setEvents(filterdEvents);
    } else {
      const filterdEvents = events.filter((event) => {
        console.log(event);

        return (
          category.includes(event?.category) &&
          event.venue.toLowerCase().includes(location.toLowerCase())
        );
      });
      setEvents(filterdEvents);
    }
  };

  // (usememo) handle sorting
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

  // handle events fetching
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };
      const response = await axios.get(
        "http://localhost:4000/api/event/listevents",
        config
      );
      setEvents(response?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, [setEvents]);
  return (
    <>
      <SearchPage
        onSortChange={onSortChange}
        onApply={onApply}
        fetchEvents={fetchEvents}
      />
      <div className="grid sm:grid-cols-2 gap-1 lg:grid-cols-3 grid-rows-4 p-2 w-[100%] h-[100%] overflow-y-scroll relative">
        {loading && <Spinner size={"lg"} position={"center"} mt={"4"} />}
        {events?.map((event) => {
          return (
            <Tooltip placement="bottom" label="click to view" key={event._id}>
              <span className="w-auto h-auto p-0" aria-label="event-cards">
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
