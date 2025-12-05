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
  // state for user data
  const [userData, setuserData] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // handle login form submit
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        data
      );
      setuserData(response.data);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));

      if (response?.data?.message) {
        toast({
          title: "Login successfull",
          status: "success",
          description: "Navigating to Dashboard",
          duration: 2000,
        });
        reset();
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (err) {
      console.error(err);

      toast({
        title: "Invalid Credentials",
        description: "passowrd or email is wrong",
        status: "error",
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
            rounded="1xl"
            mt="10px"
          >
            {isSubmitting ? <Spinner size="sm" /> : "Login"}
          </Button>
        </form>
        <div className="flex justify-between items-center gap-8 mt-4 p-2">
          <p>Don't have account?</p>
          <button
            className="font-medium"
            onClick={() => navigate("/")}
            aria-label="signup-nav-btn"
          >
            signup here
          </button>
        </div>
      </Box>
    </div>
  );
}
