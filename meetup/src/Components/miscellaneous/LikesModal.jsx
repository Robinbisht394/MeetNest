import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const LikesModal = ({ eventId, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEventLikes = async () => {
      try {
        if (isOpen) {
          setLoading(true);
          const res = await axios.get(
            `http://localhost:4000/api/event/${eventId}/likes`
          );
          console.log(res.data);
          setUsers(res.data?.likes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventLikes();
  }, [isOpen, eventId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="2xl" p={4}>
        <ModalHeader>Liked Users</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Spinner />
          ) : users.length === 0 ? (
            <Text>No likes yet.</Text>
          ) : (
            <VStack align="start" spacing={3}>
              {users.map((user) => (
                <Box
                  key={user._id}
                  w="100%"
                  p={3}
                  borderWidth="1px"
                  borderRadius="lg"
                  shadow="sm"
                  _hover={{ shadow: "md", bg: "gray.50" }}
                >
                  <Text fontWeight="bold">{user.name}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {user.email}
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LikesModal;
