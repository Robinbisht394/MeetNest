import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Center, Spinner } from "@chakra-ui/react";
import { UserContext } from "../Context/UserContextProvider";
import AttendeeEventCard from "../Components/miscellaneous/AttendeeEventCard";
const SavedEvents = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            authorization: `Bearer ${user.token}`,
            role: user.role,
          },
        };
        const response = await axios.get(
          "http://localhost:4000/api/user/saved",
          config
        );
        // set the save events in state
        setSavedEvents(response?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedEvents();
  }, []);
  return (
    <div className="p-2 rounded-sm bg-white">
      <div className="p-1 rounded-sm shadow">
        <h1 className="text-gray-500 text-2xl font-bold">Saved Events</h1>
      </div>
      {loading && (
        <Center h={"100vh"} w="100%">
          <Spinner size="lg" />
        </Center>
      )}
      <div className="flex justify-start items-center sm:flex-wrap sm:flex-row mt-2 p-1 gap-1 w-[100%] h-auto overflow-y-scroll">
        {!savedEvents.length && loading == false && <p>No Events Saved</p>}
        {savedEvents?.map((event) => {
          return <AttendeeEventCard key={event._id} event={event} />;
        })}
      </div>
    </div>
  );
};

export default SavedEvents;
