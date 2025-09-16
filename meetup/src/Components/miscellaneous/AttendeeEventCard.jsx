import { Heart, Bookmark } from "lucide-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContextProvider";
import axios from "axios";
export default function AttendeeEventCard({ event }) {
  console.log(event);

  const { user, savedEvent } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(event?.likes.includes(user._id));
  const [isSaved, setIsSaved] = useState(savedEvent.includes(event._id));
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/dashboard/event/${event._id}`);
  };

  const eventLike = async (e) => {
    console.log("like bnt clicked");

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
      console.log(response);

      setIsLiked(response?.data?.isLiked);
    } catch (err) {
      console.log(err.response);
    }
  };

  const eventSave = async (e) => {
    console.log("save btn clicked");

    e.stopPropagation();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };

      const response = await axios.put("http://localhost:4000/api/user/save", {
        evenId: event._id,
        config,
      });
      setIsLiked(response.data.isSaved);
    } catch {
      console.log(err);
    }
  };
  return (
    <div
      className="relative max-w-sm h-auto  bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition w-[100%] md:h-auto"
      onClick={handleClick}
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
        <span>{event.venue}</span>
        <span>by {event?.owner?.name}</span>
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
                ? "w-5 h-5 text-gray-500 hover:text-red-500 bg-red-600 transition-all"
                : "w-5 h-5 text-gray-500 hover:text-red-500"
            }
          />
        </button>
        <button
          onClick={eventSave}
          className={
            isSaved
              ? "p-2 rounded-full hover:bg-gray-100 transition"
              : "p-2 rounded-full hover:bg-gray-100 transition bg-blue-500"
          }
        >
          <Bookmark className="w-5 h-5 text-gray-500 hover:text-blue-500" />
        </button>
      </div>
    </div>
  );
}
