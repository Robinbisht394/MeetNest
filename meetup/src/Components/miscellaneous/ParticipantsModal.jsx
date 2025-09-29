import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const ParticipantsModal = ({ eventId, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEventParticipants = async () => {
      try {
        if (isOpen) {
          setLoading(true);
          const res = await axios.get(
            `http://localhost:4000/api/event/${eventId}/participants`
          );

          setUsers(res?.data?.eventPartcipants.participants);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventParticipants();
  }, [isOpen, eventId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="2xl" p={4}>
        <ModalHeader color={"blue"}>Participants</ModalHeader>
        <ModalBody>
          {loading ? (
            <Spinner />
          ) : users.length === 0 ? (
            <Text>No participants yet.</Text>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user._id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>Participated</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ParticipantsModal;
