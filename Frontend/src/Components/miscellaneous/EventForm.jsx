import React, { useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  FormErrorMessage,
  useToast,
  Spinner,
  Checkbox,
  Heading,
  Container,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Context/UserContextProvider";
import axios from "axios";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const toast = useToast();
  const { user } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          "content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };

      const response = await axios.post(
        "http://localhost:4000/api/event/",
        data,
        config
      );
      if (response) {
        toast({
          title: "Event Created 🎉",
          description: ` ${data.eventName} has been added successfully.`,
          status: "success",
          duration: 2000,
        });
        reset();
      }
    } catch (err) {
      console.log("error", err);
      toast({
        title: "Event couldn't be created",
        description: `${
          err?.response?.data?.message || "Something went wrong"
        }`,
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Container maxW="2xl" py={2} overflowY={"auto"}>
      <Box borderWidth={1} borderRadius="2xl" boxShadow="lg" p={10} bg="white">
        {/* Page Heading */}
        <Heading size="lg" mb={6} textAlign="center" color="blue.600">
          Create New Event
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6} align="stretch">
            {/* Event Name */}
            <FormControl isInvalid={errors.eventName}>
              <FormLabel>Event Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter event name"
                {...register("eventName", {
                  required: "Event name is required",
                })}
              />
              <FormErrorMessage>{errors.eventName?.message}</FormErrorMessage>
            </FormControl>

            {/* Company */}
            <FormControl isInvalid={errors.company}>
              <FormLabel>Company(optional)</FormLabel>
              <Input
                type="text"
                placeholder="Enter organizing company"
                {...register("company", {})}
              />
              <FormErrorMessage>{errors.company?.message}</FormErrorMessage>
            </FormControl>

            {/* Event Date */}
            <FormControl isInvalid={errors.date}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                {...register("date", { required: "Date is required" })}
              />
              <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
            </FormControl>

            {/* Location */}
            <FormControl isInvalid={errors.venue}>
              <FormLabel>Venue</FormLabel>
              <Input
                type="text"
                placeholder="Event location"
                {...register("venue", {
                  required: "Venue is required",
                })}
              />
              <FormErrorMessage>{errors.venue?.message}</FormErrorMessage>
            </FormControl>

            {/* Is Online Checkbox */}
            <FormControl>
              <Checkbox {...register("isOnline")}>
                This is an online event
              </Checkbox>
            </FormControl>

            {/* Description */}
            <FormControl isInvalid={errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter event description"
                rows={5}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description should be at least 10 characters",
                  },
                })}
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Create Event"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default EventForm;
