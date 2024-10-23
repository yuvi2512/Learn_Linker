"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Button sx={{ color: "white" }}>Coaching System</Button>
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Link href="/Components/Home" passHref>
              <Button sx={{ color: "white" }}>Home</Button>
            </Link>
            <Link href="/Login/Login" passHref>
              <Button sx={{ color: "white" }}>Login</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
