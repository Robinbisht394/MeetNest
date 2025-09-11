import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContextProvider";
import axios from "axios";
export default function EventUpdate({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, eventData, setEventData } = useContext(UserContext);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: eventData.eventName,
      description: eventData.description,
      date: eventData.date,
      venue: eventData.venue,
    },
  });

  // Populate form when eventData changes
  useEffect(() => {
    if (eventData) {
      reset(eventData);
    }
  }, [eventData, reset]);

  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };
      const response = await axios.put(
        `http://localhost:4000/api/event/updateEvent/${eventData._id}`,
        data,
        config
      );
      setEventData({});
      toast({
        title: "Updated successfully",
        status: "success",
        duration: 1000,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Oops not updated",
        status: "error",
        duration: 1000,
      });
    }
  };

  const onCancel = () => {
    setEventData({});
    onclose();
  };

  return (
    <>
      {/* Trigger Button */}
      <span onClick={onOpen}>{children}</span>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody className="space-y-4">
              {/* Title */}
              <Input
                placeholder="Event Title"
                {...register("eventName", { required: "Title is required" })}
                mb={3}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}

              <Input
                type="text"
                placeholder="Event location"
                {...register("venue", {
                  required: "Location is required",
                })}
                mb={3}
              />
              {errors.location?.message}

              {/* Description */}
              <Textarea
                placeholder="Event Description"
                {...register("description")}
                mb={3}
              />

              {/* Date */}
              <Input type="date" {...register("date")} />
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onCancel} mr={3}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Update Event
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
