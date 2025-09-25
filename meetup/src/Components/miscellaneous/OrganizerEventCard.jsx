import React, { lazy, useEffect, useState } from "react";
import { Box, Text, Button, useDisclosure } from "@chakra-ui/react";
// import ParticipantsModal from "./ParticipantsModal";
const ParticipantsModal = lazy(() => import("./ParticipantsModal"));
const LikesModal = lazy(() => import("./LikesModal"));
// import LikesModal from "./LikesModal";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventCard = () => {
  // state values for events
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({});
  const { id } = useParams();

  const {
    isOpen: isParticipantsOpen,
    onOpen: onParticipantsOpen,
    onClose: onParticipantsClose,
  } = useDisclosure();

  const {
    isOpen: isLikesOpen,
    onOpen: onLikesOpen,
    onClose: onLikesClose,
  } = useDisclosure();

  const fetchEventDeatils = async () => {
    try {
      setLoading(true);
      const res =
        await axios.get(`http://localhost:4000/api/event/organizer/event/${id}
`);
      console.log(res.data);
      setEvent(res?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDeatils();
  }, [id]);
  return (
    <>
      {loading && <h1>loading...</h1>}
      {!loading && (
        <Box borderWidth="1px" borderRadius="xl" p={5} shadow="md" bg="white">
          <Text fontSize="xl" fontWeight="bold">
            {event.eventName}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {event?.date?.split("T")[0]} | {event.venue}
          </Text>
          <Text mt={3}>{event.description}</Text>

          <Box mt={4} display="flex" gap={3}>
            <Button colorScheme="blue" onClick={onParticipantsOpen}>
              View Participants
            </Button>
            <Button colorScheme="pink" onClick={onLikesOpen}>
              View Likes
            </Button>
          </Box>

          {/* Reusable Modals */}
          <ParticipantsModal
            eventId={event._id}
            isOpen={isParticipantsOpen}
            onClose={onParticipantsClose}
          />
          <LikesModal
            eventId={event._id}
            isOpen={isLikesOpen}
            onClose={onLikesClose}
          />
        </Box>
      )}
    </>
  );
};

export default EventCard;
