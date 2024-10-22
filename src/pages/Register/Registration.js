"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Card,
  CardHeader,
  Typography,
  MenuItem
} from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";

const Register = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role_type: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register, handleSubmit, formState, reset, watch } = form;

  const { errors, isSubmitSuccessful } = formState;

  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    const action = "register";
    try {
      const response = await axios.post("/api/registrationApi", {
        ...data,
        action,
      });
      setMessage("User Registered Successfully");
    } catch (error) {
      setMessage("something went wrong");
      console.error("Error submitting form:", error);
    }
  };

  const watchPassword = watch("password");

  return (
    <>
      <Card elevation={3} sx={{ margin: 10, backgroundColor: "#f3f6f9" }}>
        <CardHeader
          title="Register Here"
          titleTypographyProps={{ variant: "subtitle2" }}
          sx={{
            backgroundColor: "rgba(74, 87, 169, 0.1)",
            color: "#46464E",
            padding: 1,
            marginBottom: 2,
          }}
        />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              type="email"
              {...register("email", {
                required: "email is Required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid Email Format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Role Type"
              type="text"
              select
              {...register("role_type", {
                required: "Role Type is Required",
              })}
              error={!!errors.role_type}
              helperText={errors.role_type?.message}
              >
              <MenuItem value='Student'>Student</MenuItem>
              <MenuItem value='Teacher'>Teacher</MenuItem>
            </TextField>

            <TextField
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is Required",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                  message:
                    "Password must be at least 6 characters long and contain at least one special character.",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is Required",
                validate: (value) =>
                  value === watchPassword || "The passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Stack>
        </form>
        <Typography variant="body2" align="center" pt={2}>
          Already have an account?{" "}
          <Link href="/Login/Login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Card>
    </>
  );
};

export default Register;
