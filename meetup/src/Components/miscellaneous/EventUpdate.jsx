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
  Checkbox,
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
      eventName: eventData?.eventName || "",
      description: eventData?.description || "",
      date: eventData?.date ? eventData.date.split("T")[0] : "",
      venue: eventData?.venue || "",
      company: eventData?.company || "",
      isOnline: eventData?.isOnline || false,
    },
  });

  // Reset form when eventData changes
  useEffect(() => {
    if (eventData) {
      reset({
        eventName: eventData?.eventName || "",
        description: eventData?.description || "",
        date: eventData?.date ? eventData.date.split("T")[0] : "",
        venue: eventData?.venue || "",
        company: eventData?.company || "",
        isOnline: eventData?.isOnline || false,
      });
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
      const res = await axios.put(
        `http://localhost:4000/api/event/updateEvent/${eventData._id}`,
        data,
        config
      );
      console.log(res);

      setEventData({});
      toast({
        title: "Updated successfully",
        status: "success",
        duration: 1000,
      });
      onClose();
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
    onClose();
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <>
      {/* Trigger Button */}
      <span onClick={handleClick} className="mt-1 p-0">
        {children}
      </span>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody className="space-y-4">
              {/* Event Title */}
              <Input
                placeholder="Event Title"
                {...register("eventName", { required: "Title is required" })}
                mb={3}
              />
              {errors.eventName && (
                <p className="text-red-500">{errors.eventName.message}</p>
              )}

              {/* Venue */}
              <Input
                type="text"
                placeholder="Event location"
                {...register("venue", {
                  required: "Location is required",
                })}
                mb={3}
              />
              {errors.venue && (
                <p className="text-red-500">{errors.venue.message}</p>
              )}

              {/* Company */}
              <Input
                type="text"
                placeholder="Company"
                {...register("company", {})}
                mb={3}
              />
              {errors.company && (
                <p className="text-red-500">{errors.company.message}</p>
              )}

              {/* Description */}
              <Textarea
                placeholder="Event Description"
                {...register("description")}
                mb={3}
              />

              {/* Date */}
              <Input type="date" {...register("date")} mb={3} />

              {/* Is Online */}
              <Checkbox {...register("isOnline")} mb={3}>
                Online Event
              </Checkbox>
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
