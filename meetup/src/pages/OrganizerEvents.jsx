import React, { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../Context/UserContextProvider";
import { useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import EventCard from "../Components/miscellaneous/EventCard";

import axios from "axios";
const OrganizerEvents = () => {
  const { user, setEventData } = useContext(UserContext);

  const toast = useToast();
  //  state for events data
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);

  const onEdit = (event) => {
    console.log(event);
    setEventData(event);
  };

  const onDelete = async (id) => {
    try {
      // config data
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };
      // delete API call
      const response = await axios.delete(
        `http://localhost:4000/api/event/removeEvent/${id}`,
        config
      );

      if (response) {
        toast({
          title: "Event Deleted",
          description: ` ${data.eventName} has been Removed successfully.`,
          status: "success",
          duration: 2000,
        });
      }
    } catch (err) {
      toast({
        title: "Event couldn't deleted",
        description: `${err?.response?.data?.message}`,
        status: "error",
        duration: 2000,
      });
    }
  };

  const onPin = (id) => {
    console.log(id, "pinned");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            authorization: `Bearer ${user.token}`,
            role: user.role,
          },
        };

        // Get API call
        const response = await axios.get(
          "http://localhost:4000/api/event",
          config
        );

        setEvents(response.data.events);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className="border-amber-200 border-2 bg-red-500 p-1 flex justify-start items-start w-[100%] h-[95%] overflow-y-scroll">
      {loading && <Spinner size="lg" />}
      {events?.map((event) => {
        return (
          <EventCard
            key={event._id}
            event={event}
            onEdit={onEdit}
            onDelete={onDelete}
            onPin={onPin}
          />
        );
      })}
    </div>
  );
};

export default OrganizerEvents;
