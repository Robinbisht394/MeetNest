import React, { lazy, useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Tooltip,
  Flex,
  Divider,
  useDisclosure,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { Users, ThumbsUp } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ParticipantsModal = lazy(() => import("./ParticipantsModal"));
const LikesModal = lazy(() => import("./LikesModal"));

const OrganizerEventCard = () => {
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
      const res = await axios.get(
        `http://localhost:4000/api/event/organizer/event/${id}`
      );
      setEvent(res?.data.event);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDeatils();
  }, [id]);

  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="400px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          bg={cardBg}
          borderColor={cardBorder}
          shadow="md"
          minH="450px"
          maxW="800px"
          mx="auto"
          mt={6}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {/* Header */}
          <Box mb={4}>
            <Text fontSize="2xl" fontWeight="bold" color="blue.600" mb={2}>
              {event?.eventName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {event?.date?.split("T")[0]} • {event?.venue}
            </Text>
          </Box>

          <Divider mb={4} />

          {/* Description */}
          <Text flexGrow={1} fontSize="md" color="gray.700" mb={6}>
            {event?.description}
          </Text>

          {/* Action Buttons */}
          <Flex gap={4} justify="flex-start">
            <Tooltip label="View Participants" hasArrow placement="top">
              <Button
                leftIcon={<Users size={18} />}
                colorScheme="blue"
                variant="solid"
                onClick={onParticipantsOpen}
              >
                Participants
              </Button>
            </Tooltip>

            <Tooltip label="View Likes" hasArrow placement="top">
              <Button
                leftIcon={<ThumbsUp size={18} />}
                colorScheme="blue"
                variant="outline"
                onClick={onLikesOpen}
              >
                Likes
              </Button>
            </Tooltip>
          </Flex>

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

export default OrganizerEventCard;
