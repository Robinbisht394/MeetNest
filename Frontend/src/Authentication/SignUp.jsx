import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Field, Input, Heading, Select } from "@chakra-ui/react";
import {FormControl,FormLabel} from '@chakra-ui/react/form-control'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
  };

  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
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
          <Field.Root invalid={!!errors.name}>
            <Field.Label>Full Name</Field.Label>
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
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          {/* Email */}
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
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
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          {/* Role */}
          <Field.Root invalid={!!errors.role}>
            <Field.Label>Role</Field.Label>
            <Select
              placeholder="Select role"
              {...register("role", { required: "Role is required" })}
            >
              <option value="organizer">Organizer</option>
              <option value="attendee">Attendee</option>
            </Select>
            <Field.ErrorText>{errors.role?.message}</Field.ErrorText>
          </Field.Root>

          {/* Password */}
          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters required" },
              })}
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          {/* Confirm Password */}
          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>Confirm Password</Field.Label>
            <Input
              type="password"
              placeholder="Re-enter your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
          </Field.Root>

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            isLoading={isSubmitting}
            rounded="xl"
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </div>
  );
};
export default SignUp;
