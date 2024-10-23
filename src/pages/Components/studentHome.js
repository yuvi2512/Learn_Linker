"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { AppBar, Toolbar } from '@mui/material';
import axios from "axios";
import AttendanceChart from "@/pages/Components/AttendanceChart";

const HomePage = () => {
  const [AttendanceData, setAttendanceData] = useState([]);
  const { data: session, status } = useSession();
  console.log("Session:", session?.user?.id);
  
  const getAttendance = async () => {
    try {
      const response = await axios.get("/api/getAttendance", {
        params: { studentId: session?.user?.id },
      });
      if (response.status === 200 && response.data.length > 0) {
        setAttendanceData(response.data);
      }
    } catch (error) { 
      console.error("Error checking attendance:", error);
      toast.error("Failed to get attendance.");
    }
  };

  useEffect(() => {
    if (session?.user?.id) getAttendance();
  }, [session?.user?.id]);

  return (
    <>
    {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Coaching Institute Manager
          </Typography>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Manage Students</Button>
          <Button color="inherit">Courses</Button>
          <Button color="inherit">Profile</Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar> */}
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} lg={7}>
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome {session?.user?.name}
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              Helping you manage coaching sessions and track progress
              seamlessly.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 4 }}
            >
              Get Started
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={5}>
          {AttendanceData && (
            <AttendanceChart attendanceData={AttendanceData} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
