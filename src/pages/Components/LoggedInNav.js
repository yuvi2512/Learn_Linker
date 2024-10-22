"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import {  signOut } from "next-auth/react";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        sx={{ backgroundColor: "#8B0000" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Button sx={{ color: "white" }}>Coaching System</Button>
            </Link>
          </Typography>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Link href="/Components/homePage" passHref>
              <Button sx={{ color: "white" }}>Home</Button>
            </Link>
            <Link href="/Components/Attendance" passHref>
              <Button sx={{ color: "white" }}>Attendance</Button>
            </Link>
            <Link href="/Components/GenerateMarksheet" passHref>
              <Button sx={{ color: "white" }}>Marksheet</Button>
            </Link>
            <Link href="/Components/StudentSection/Marksheet" passHref>
              <Button sx={{ color: "white" }}>View Result</Button>
            </Link>
            <Button sx={{ color: "white" }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            <ListItem button>
              <Link href="/Components/Home" passHref>
                <ListItemText primary="Home" />
              </Link>
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
