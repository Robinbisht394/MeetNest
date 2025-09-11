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
    console.log("Event Created:", data);

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
      console.log(response);
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
        title: "Event couldn't created",
        description: `${err?.response?.data?.message}`,
        status: "Error",
        duration: 3000,
      });
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="2xl"
      boxShadow="lg"
      bg="white"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5}>
          {/* Event Name */}
          <FormControl isInvalid={errors.eventName}>
            <FormLabel>Event Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter event name"
              {...register("eventName", { required: "Event name is required" })}
            />
            <FormErrorMessage>{errors.eventName?.message}</FormErrorMessage>
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
                required: "Location is required",
              })}
            />
            <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
          </FormControl>

          {/* Description */}
          <FormControl isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter event description"
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
            width="full"
            isLoading={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Create Event"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EventForm;
