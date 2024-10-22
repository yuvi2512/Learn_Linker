"use client";
import React, { useState,useEffect } from "react";
import { TextField, Button, Stack, Card, CardHeader, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react"; 
import { useRouter } from "next/router";
import { getCsrfToken } from "next-auth/react";
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
  const [csrfToken, setCsrfToken] = useState("");

  if (session) {
    console.log("Session:", session);
  }

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  const onSubmit = async (formData) => {
    const result = await signIn("credentials", {
      redirect: false,
      ...formData,
      csrfToken,
    });

    console.log("SignIn Result:", result);
    if (result.error) {
      setLoginError(result.error); 
    } 
    else {
      router.push("/Components/homePage");
    }
  };

  return (
    <Card elevation={3} sx={{ margin: 10, backgroundColor: "#f3f6f9" }}>
      <CardHeader
        title="Login"
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

        {loginError && (
          <Typography variant="body2" align="center" pt={2} style={{ color: "red" }}>
            {loginError}
          </Typography>
        )}
      </form>
      <Typography variant="body2" align="center" pt={5}>
        Create a new account{" "}
        <Link href="/Register/Registration" style={{ textDecoration: "none", color: "blue" }}>
          Sign Up
        </Link>
      </Typography>
    </Card>
  );
};

export default Login;
