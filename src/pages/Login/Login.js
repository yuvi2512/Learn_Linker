"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  Card,
  CardHeader,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Login = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { data: session, status } = useSession();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const onSubmit = async (formData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setLoginError(res.error);
    }
  };

  useEffect(() => {
    if (session?.user?.role == "student")
      router.push("/Components/studentHome");

    if (session?.user?.role == "teacher")
      router.push("/Components/TeacherHome");
  }, [session?.user]);

  return (
    <>
      <Box
        className="content-right"
        sx={{ backgroundColor: "background.paper" }}
      >
        <Box
          sx={{
            p: [9],
            height: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
           <Box sx={{ width: "100%", maxWidth: 400 }}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid Email Format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is Required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Stack>

            <Typography
              variant="body2"
              align="center"
              pt={2}
              style={{ color: "red" }}
            >
              {loginError}
            </Typography>
          </form>
          <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
          <Typography variant="body2" align="center" pt={5}>
            Create a new account{" "}
            <Link
              href="/Register/Registration"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Sign Up
            </Link>
          </Typography>
          </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
