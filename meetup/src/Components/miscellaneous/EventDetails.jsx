import axios from "axios";
import {
  Heart,
  Bookmark,
  Users,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPin,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContextProvider";
import { checkParticipation } from "../../utils/helper";
import { Center, Spinner, useToast } from "@chakra-ui/react";
export default function EventDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({});
  const { user } = useContext(UserContext);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [isSaved, setIsSaved] = useState(event.isSaved);
  const [isLiked, setIsLiked] = useState(event.isLiked);
  const [isRegistered, setIsRegistered] = useState(null);
  const toast = useToast();

  useEffect(() => {
    //fetches the complete event details
    const fetchEventsById = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            authorization: `Bearer ${user.token}`,
            role: user.role,
          },
        };
        const response = await axios.get(
          `http://localhost:4000/api/event/${id}`,
          config
        );
        setEvent(response?.data.events[0]);
        setIsLiked(response?.data.events[0].isLiked);
        setIsSaved(response?.data.events[0].isSaved);
      } catch (err) {
        console.error(err.response);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsById();
  }, [setEvent, isSaved, isLiked, isRegistered]);

  const joinEvent = async () => {
    //user partcipation handler
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
      if (response.data.message == "Registered Successfully")
        setIsRegistered(true);
      toast({
        title: response?.data?.message,
        status: "success",
        duration: 2000,
      });
    } catch (err) {
      console.error(err?.response);
    } finally {
      setLoading(false);
    }
  };

  // handle event summary
  const handleEventSummary = async () => {
    const description = event.description;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/gemini/eventSummary",
        { description }
      );

      setSummary(response.data.summary);
    } catch (err) {
      console.error(err?.response);
      setSummary("AI summary will available shortly");
    }
  };

  const eventLike = async (e) => {
    e.stopPropagation();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };
      const response = await axios.put(
        "http://localhost:4000/api/event/like",
        { eventId: event._id },
        config
      );

      setIsLiked(response?.data?.isLiked);
    } catch (err) {
      console.log(err?.response);
    }
  };

  const eventSave = async (e) => {
    e.stopPropagation();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };
      const response = await axios.put(
        "http://localhost:4000/api/user/saved",
        { eventId: event._id },
        config
      );

      setIsSaved(response.data.isSaved);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Center>
          <Spinner size={"lg"} position={"center"} mt={5} />
        </Center>
      ) : (
        <div className="mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-100 w-[100%] h-[100%]">
          {/* Header */}
          <div className="relative mb-6">
            {/* Date Badge */}
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full shadow">
              Scheduled for {event?.date ? event.date.split("T")[0] : "Sep 15"}
            </div>

            <h1 id="title" className="text-4xl font-bold text-gray-800 mb-4">
              {event.eventName}
            </h1>
            <div className="flex items-center justify-between text-gray-500 text-base mt-2">
              <span
                className="flex justify-evenly items-center gap-1"
                aria-label="event-location"
              >
                {event.venue}
                <MapPin size={20} />
              </span>
              <span aria-label="event-owner/organizer">
                by {event?.owner?.name}
              </span>
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
            <button
              className="p-3 rounded-full hover:bg-gray-100 transition"
              onClick={(e) => eventLike(e)}
            >
              <Heart
                className={
                  isLiked
                    ? "w-6 h-6 fill-red-500 text-white"
                    : "w-6 h-6 text-gray-500 hover:text-red-500"
                }
              />
            </button>
            <button
              className="p-3 rounded-full hover:bg-gray-100 transition"
              onClick={(e) => eventSave(e)}
            >
              <Bookmark
                className={
                  isSaved
                    ? "w-6 h-6 text-white fill-blue-500"
                    : "w-6 h-6 text-gray-500 hover:text-blue-500"
                }
              />
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
          {/* event summary toggle button */}
          <button
            onClick={() =>
              setIsSummaryOpen((prev) => {
                const newState = !prev;
                if (newState) {
                  handleEventSummary();
                }
                return newState;
              })
            }
            aria-label="Toggle AI summary "
            className="flex items-center gap-2"
          >
            <span>AI Summary</span>
            {isSummaryOpen ? (
              <ChevronUpIcon size={18} />
            ) : (
              <ChevronDownIcon size={18} />
            )}
          </button>
          {isSummaryOpen && (
            <div className="border-2 border-black rounded-sm">
              {summary && <summary>{summary}</summary>}
            </div>
          )}

          {/* Join Button */}
          <div className="text-center bg-blue-500 p-1 mt-30 hover:bg-blue-700 text-white rounded-md ">
            <button
              className="w-full hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
              onClick={() => joinEvent()}
              disabled={checkParticipation(event, user)}
              aria-label="attendee-participation-button"
            >
              {checkParticipation(event, user)
                ? "Already Registered"
                : "Join Event"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
