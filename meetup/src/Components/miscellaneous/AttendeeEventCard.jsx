import { Heart, Bookmark } from "lucide-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContextProvider";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
export default function AttendeeEventCard({ event }) {
  const { user } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(event.isLiked);
  const [isSaved, setIsSaved] = useState(event.isSaved);
  const navigate = useNavigate(); // navigation hook
  const toast = useToast();

  const handleNavigation = () => {
    //  navigate user to event details page
    navigate(`/dashboard/event/${event._id}`);
  };

  const eventLike = async (e) => {
    e.stopPropagation();
    try {
      const config = {
        //config data
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
      console.error(err.response);
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
      console.error(err.response);
    }
  };

  // handle add to google calendar
  const handleAddToCalendar = async (e, event) => {
    e.stopPropagation();

    try {
      const config = {
        "content/type": "application/json",
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };
      const response = await axios.post(
        "http://localhost:4000/api/calendar/addtocalendar",
        event,
        config
      );
      if (response.data.action == "event_added") {
        toast({
          title: "Event added to google calender",
          status: "success",
          duration: 3000,
        });
      } else {
        // authorize the user to google
        toast({
          title: "google Authorization",
          duration: 3000,
        });
        setTimeout(() => {
          // navigating user to google consent screen
          window.location.href = response.data.url;
        }, 3000);
      }
    } catch (err) {
      console.error(err.response);
    }
  };
  return (
    <div
      className="relative max-w-sm h-auto  bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition w-[100%] md:h-auto"
      onClick={handleNavigation}
    >
      {/* Date Badge */}
      <div className="absolute top-2 right-1.5 bg-blue-600 text-white text-xs font-medium p-1  rounded-full shadow">
        {event?.date.split("T")[0] || "Sep 15"}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1 p-2">
        {event.eventName}
      </h2>

      {/* Location & Owner */}
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span aria-label="event-location">{event.venue}</span>
        <span aria-label="event-owner/organizer">by {event?.owner?.name}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 truncate">{event.description}</p>

      {/* Footer: Actions */}
      <div className="flex justify-end gap-4">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={eventLike}
        >
          <Heart
            className={
              isLiked
                ? "w-6 h-5   text-white text-3xl fill-red-500 transition-all"
                : "w-5 h-5 text-gray-500 hover:text-red-500"
            }
          />
        </button>
        <button
          onClick={eventSave}
          className={
            isSaved
              ? "p-2 rounded-full fill-blue-500 text-white transition"
              : "p-2 rounded-full hover:bg-gray-100 transition bg-blue-500"
          }
        >
          <Bookmark
            className={
              isSaved
                ? "w-5 h-5 text-white fill-blue-600"
                : "w-5 h-5 text-gray-500 hover:text-blue-500"
            }
          />
        </button>
      </div>
      <div className="bg-blue-500 text-center p-1 mt-1 rounded-sm text-white">
        <button
          onClick={(e) => handleAddToCalendar(e, event)}
          className="bg-blue-500 hover:bg-blue-400 text-white rounded-sm"
        >
          Add to google calendar
        </button>
      </div>
    </div>
  );
}
