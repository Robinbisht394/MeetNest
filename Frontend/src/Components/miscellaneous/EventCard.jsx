import React, { lazy } from "react";
import { Calendar, MapPin, Pin, Trash2, Edit } from "lucide-react";
import { Tooltip } from "@chakra-ui/react";
// import EventUpdate from "./EventUpdate";
const EventUpdate = lazy(() => import("./EventUpdate"));
import { useNavigate } from "react-router-dom";
const EventCard = ({ event, onEdit, onDelete, onPin }) => {
  const navigate = useNavigate();

  const handleEventClick = (e) => {
    navigate(`/dashboard/organizer/event/${event._id}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 border border-gray-200 
    hover:shadow-lg transition-all duration-300 
    w-full h-full flex flex-col cursor-pointer"
      onClick={() => handleEventClick()}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {event.eventName}
        </h3>
        <div className="flex space-x-2">
          <Tooltip label="pin" placement="bottom-start">
            <button
              onClick={(e) => onPin(e, event._id)}
              className="text-gray-500 hover:text-blue-600"
            >
              <Pin size={18} />
            </button>
          </Tooltip>
          <Tooltip label="edit" placement="bottom-start">
            <EventUpdate>
              <button
                onClick={(e) => onEdit(e,  event)}
                className="text-gray-500 hover:text-green-600"
              >
                <Edit size={18} />
              </button>
            </EventUpdate>
          </Tooltip>
          <Tooltip label="remove" placement="bottom-start">
            <button
              onClick={(e) => onDelete(e, event._id)}
              className="text-gray-500 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-2 line-clamp-3 flex-grow">
        {event.description}
      </p>

      {/* Footer (date + venue) */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{event.date.split("T")[0]}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <span className="truncate max-w-[120px]">{event.venue}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
