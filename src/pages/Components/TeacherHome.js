
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';

const TeacherHomePage = () => {
  return (
    <div>
     
 
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Teacher!
        </Typography>

        <Grid container spacing={3}>
      
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Manage Students</Typography>
              <Typography variant="body1">
                View and manage the details of students enrolled in your classes.
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Go to Students
              </Button>
            </Paper>
          </Grid>

        
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Manage Courses</Typography>
              <Typography variant="body1">
                Create and update the courses you are teaching.
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Go to Courses
              </Button>
            </Paper>
          </Grid>

 
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Manage Schedule</Typography>
              <Typography variant="body1">
                View and update your teaching schedule and timings.
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Go to Schedule
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Announcements
          </Typography>
          <Typography variant="body1">
            Stay updated with the latest information and announcements from the admin.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default TeacherHomePage;
