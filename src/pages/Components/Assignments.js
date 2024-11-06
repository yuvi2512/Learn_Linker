import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  CardHeader,
  Divider,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Assignments = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const { data: sessionData } = useSession();

  const TeacherName = sessionData?.user?.name;

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getStudentAPI");
      if (response.data) {
        setStudents(response.data);
        toast.success("Students data fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch students data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setAssignmentTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setAssignmentDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedStudentName = students.find(
      (student) => student.id === selectedStudent
    )?.name;

    const payload = {
      teacher_name: TeacherName,
      student_name: selectedStudentName,
      title: assignmentTitle,
      description: assignmentDescription,
    };

    try {
      const response = await axios.post("/api/AssignmentAPI", {
        data: payload,
      });
      if (response.status === 200) {
        toast.success("Assignment Uploaded successfully!");

        setSelectedStudent("");
        setAssignmentTitle("");
        setAssignmentDescription("");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("Failed to Upload Assignment.");
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{m: 10}}>
          <CardHeader sx={{ pb: 2, pt: 2 }} title="Assignments" />
          <Divider />

          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  margin="normal"
                  label="Select Student"
                  variant="outlined"
                  value={selectedStudent}
                  onChange={handleStudentChange}
                >
                  {students.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Assignment Title"
                  variant="outlined"
                  value={assignmentTitle}
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  fullWidth
                  rows={4}
                  label="Assignment Description"
                  variant="outlined"
                  value={assignmentDescription}
                  onChange={handleDescriptionChange}
                />
              </Grid>
              <Divider />

              <Grid item xs={12} sm={6}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  sx={{ margin: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Assignments;
