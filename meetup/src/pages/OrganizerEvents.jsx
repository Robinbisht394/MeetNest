import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  lazy,
} from "react";
import { UserContext } from "../Context/UserContextProvider";
import { Button, Center, Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const EventCard = lazy(() => import("../Components/miscellaneous/EventCard"));

import axios from "axios";
const OrganizerEvents = () => {
  const { user, setEventData, eventData } = useContext(UserContext);
  const navigate = useNavigate();

  const toast = useToast();
  //  state for events data
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  // handle event edit
  const onEdit = (e, eventData) => {
    setEventData(eventData);
  };

  // handle event delete
  const handleDelete = useCallback(async (e, id) => {
    e.stopPropagation();
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
          description: ` ${response?.data?.event?.eventName} has been Removed successfully.`,
          status: "success",
          duration: 2000,
        });
        setIsDeleted((prev) => !prev);
      }
    } catch (err) {
      console.error(err);

      toast({
        title: "Event couldn't deleted",
        description: `${err?.response?.data?.message}`,
        status: "error",
        duration: 2000,
      });
    }
  }, []);

  // handle form navigation
  const handleFormNavigation = () => {
    navigate("/dashboard/create-event");
  };

  const onPin = (e, id) => {
    e.stopPropagation();
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
        setEvents(response.data.events || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [eventData, setEventData, isDeleted]);

  return (
    <>
      <div className="flex justify-between items-center mr-5 relative">
        <h1 className="text-lg text-blue-500 font-bold p-2 rounded-md">
          Your Events
        </h1>
        <Button color={"white"} bg={"green.400"} onClick={handleFormNavigation}>
          Add new event
        </Button>
      </div>

      {loading && (
        <div className="w-full flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      )}

      {!events.length && !loading && (
        <h1 className="text-center w-full text-xxl">No Events By User</h1>
      )}
      {/* Scrollable grid container */}
      <div
        className="p-2 w-full h-[80vh] overflow-y-auto
      grid gap-4
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4"
      >
        {events?.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onEdit={onEdit}
            onDelete={handleDelete}
            onPin={onPin}
          />
        ))}
      </div>
    </>
  );
};

export default OrganizerEvents;
