"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
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
import Image from "next/image"; // Import for logo usage

const Home = () => {
  return (
    <>
      {/* Add a background gradient */}
      <Box
        sx={{
          //background: "linear-gradient(to right, #f953c6, #b91d73)",
          minHeight: "100vh",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          {/* Include logo */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Image
              src="/ProjectLogo.png"
              alt="Learn Linker Logo"
              width={150}
              height={150}
            />
          </Box>

          <Card sx={{ backgroundColor: "#fff", boxShadow: 3, borderRadius: 4 }}>
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                color="primary"
              >
                Welcome to Learn Linker
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                Helping you manage coaching sessions and track progress
                seamlessly.
              </Typography>
              {/* Button with hover effect */}
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  mt: 4,
                  transition: "background 0.3s",
                  "&:hover": { backgroundColor: "#b91d73" },
                }}
              >
                Get Started
              </Button>
            </Box>

            {/* Our Services Section */}
            <Box sx={{ py: 6 }}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                color="primary"
              >
                Our Services
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ boxShadow: 3, borderRadius: 4 }}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        color="secondary"
                      >
                        Session Scheduling
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Easily schedule and manage coaching sessions for your
                        clients.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ boxShadow: 3, borderRadius: 4 }}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        color="secondary"
                      >
                        Progress Tracking
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Track the progress of your clients and provide feedback.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ boxShadow: 3, borderRadius: 4 }}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        color="secondary"
                      >
                        Communication Tools
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Communicate with clients via integrated messaging and
                        updates.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Testimonials */}
            <Box
              sx={{
                py: 6,
                backgroundColor: "#f5f5f5",
                borderRadius: "0 0 4px 4px",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                color="primary"
              >
                What Our Clients Say
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                          alt="John Doe"
                          src="/static/images/avatar/1.jpg"
                        />
                        <Box ml={2}>
                          <Typography variant="subtitle1">John Doe</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Professional Coach
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2">
                        "This platform has transformed the way I manage my
                        coaching clients."
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                          alt="Jane Smith"
                          src="/static/images/avatar/2.jpg"
                        />
                        <Box ml={2}>
                          <Typography variant="subtitle1">
                            Jane Smith
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Life Coach
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2">
                        "Highly recommend this tool for any coaching
                        professional!"
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Home;
