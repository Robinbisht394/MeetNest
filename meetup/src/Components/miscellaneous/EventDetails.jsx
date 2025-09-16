import axios from "axios";
import { Heart, Bookmark, Users } from "lucide-react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContextProvider";
import { checkParticipation } from "../../utils/helper";
import { Spinner } from "@chakra-ui/react";
export default function EventDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("fetching");

    const fetchEventsById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/event/${id}`
        );

        console.log(response.data);
        setEvent(response?.data.events[0]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsById();
    console.log("fetched");
  }, [setEvent]);

  const joinEvent = async () => {
    console.log("working");

    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };
      const response = await axios.put(
        `http://localhost:4000/api/event/register`,
        { eventId: event._id },
        config
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner size={"lg"} position={"center"} />
      ) : (
        <div className="mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-100 w-[100%] h-[90%]">
          {/* Header */}
          <div className="relative mb-6">
            {/* Date Badge */}
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full shadow">
              Scheduled for {event?.date ? event.date.split("T")[0] : "Sep 15"}
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {event.eventName}
            </h1>
            <div className="flex items-center justify-between text-gray-500 text-base mt-2">
              <span>{event.venue}</span>
              <span>by {event?.owner?.name}</span>
            </div>
          </div>
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              About this event
            </h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-5 mb-8">
            <button className="p-3 rounded-full hover:bg-gray-100 transition">
              <Heart className="w-6 h-6 text-gray-500 hover:text-red-500" />
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 transition">
              <Bookmark className="w-6 h-6 text-gray-500 hover:text-blue-500" />
            </button>
          </div>

          {/* Participants */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-gray-500" /> Participants{" "}
              {event?.participants ? `(${event.participants.length})` : ""}
            </h2>

            {event.participants && event.participants.length > 0 ? (
              <ul className="space-y-2 overflow-y-scroll h-[20vh] p-1 mt-1">
                {event.participants.map((p, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700 cursor-pointer w-[40%] hover:bg-gray-100"
                  >
                    {`${p.name}  ${p._id == user._id ? "(You)" : ""}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No participants yet.</p>
            )}
          </div>

          {/* Join Button */}
          <div className="text-center bg-blue-500 p-1 mt-30 hover:bg-blue-700 text-white rounded-md ">
            <button
              className="w-full hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
              onClick={() => joinEvent()}
              // disabled={checkParticipation(event, user)}
            >
              {checkParticipation(event, user)
                ? "Already Registerd"
                : "Join Event"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
