import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
export default function Login() {
  const [userData, setuserData] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  console.log(userData);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        data
      );
      setuserData(response.data);
      console.log(response);

      if (response?.data?.message) {
        toast({
          title: "Login successfull",
          description: "Navigating to Dashboard",
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    } catch (err) {
      console.log(err);

      toast({
        title: "Error",
        description: "Invalid Credentials",
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Box
        bg="white"
        p={8}
        borderRadius="2xl"
        shadow="lg"
        w={{ base: "100%", sm: "400px" }}
        gap={1}
      >
        <Heading size="lg" mb={6} textAlign="center">
          Login
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          {/* Password */}
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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
            rounded="2xl"
            mt="10px"
          >
            {isSubmitting ? <Spinner size="sm" /> : "Login"}
          </Button>
        </form>
      </Box>
    </div>
  );
}
