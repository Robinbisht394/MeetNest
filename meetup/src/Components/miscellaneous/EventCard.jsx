import React from "react";
import { Calendar, MapPin, Pin, Trash2, Edit } from "lucide-react";
import { Tooltip } from "@chakra-ui/react";
import EventUpdate from "./EventUpdate";
const EventCard = ({ event, onEdit, onDelete, onPin }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {event.eventName}
        </h3>
        <div className="flex space-x-3">
          <Tooltip label="pin" placement="bottom-start">
            <button
              onClick={() => onPin(event._id)}
              className="text-gray-500 hover:text-blue-600"
            >
              <Pin size={18} />
            </button>
          </Tooltip>
          <Tooltip label="edit" placement="bottom-start">
            <EventUpdate>
              <button
                onClick={() => onEdit(event)}
                className="text-gray-500 hover:text-green-600"
              >
                <Edit size={18} />
              </button>
            </EventUpdate>
          </Tooltip>
          <Tooltip label="remove" placement="bottom-start">
            <button
              onClick={() => onDelete(event._id)}
              className="text-gray-500 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Event details */}
      <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>

      <div className="flex items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{event.date.split("T")[0]}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <span>{event.venue}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
