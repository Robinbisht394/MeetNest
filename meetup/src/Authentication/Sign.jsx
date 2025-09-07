import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Heading,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
const Sign = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(error);
  console.log(data);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/signup",
        data
      );
      setData(response.data);
      console.log(response);
      toast({
        title: "signup successfull",
        description: "navigating to dashboard",
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      toast({
        title: "Error",
        description: err?.response?.data.message,
        duration: 2000,
      });
    }
  };

  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Box
        bg="white"
        p={8}
        rounded="2xl"
        shadow="xl"
        w={{ base: "100%", sm: "450px" }}
      >
        <Heading size="lg" mb={6} textAlign="center">
          Create Account
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "At least 3 characters required",
                },
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          {/* Email */}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          {/* Role */}
          <FormControl isInvalid={!!errors.role}>
            <FormLabel>Role</FormLabel>
            <Select
              placeholder="Select role"
              {...register("role", { required: "Role is required" })}
              className="rounded-md"
            >
              <option value="organizer" className="rounded-md">
                Organizer
              </option>
              <option value="attendee" className="rounded-md">
                Attendee
              </option>
            </Select>
            <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
          </FormControl>

          {/* Password */}
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters required" },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            isLoading={isSubmitting}
            rounded="xl"
          >
            {isSubmitting ? <Spinner /> : "Sign up"}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Sign;
