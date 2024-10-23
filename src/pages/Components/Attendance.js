import { DataGrid } from "@mui/x-data-grid";
import {
  Card,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Button, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

const Attendance = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceCounts, setAttendanceCounts] = useState({
    total: rows.length,
    Absent: rows.length,
    Present: 0,
  });
  const [selectedDate, setSelectedDate] = useState();

  const { data: session, status } = useSession();  

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getStudentAPI");
      if (response.data) {
        setRows(response.data);
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

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
  ];

  const handleSelectionChange = (newSelection) => {
    setSelectedIds(newSelection);
  };

  const handleDialogClose = (confirmed) => {
    setOpenDialog(false);
    if (confirmed) {
      submitAttendance(attendanceData);
    } else {
      toast.success("Attendance update canceled.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      toast.error("Please select a date before submitting!");
      return;
    }

    const alreadyTaken = await CheckAttendance();
    const presentCount = selectedIds.length;
    const absentCount = rows.length - presentCount;

    // Prepare attendance data before opening the dialog
    const preparedAttendanceData = rows.map((student) => {
      const isPresent = selectedIds.includes(student.id.toString());
      return {
        student_id: student.id,
        student_name: student.name,
        present: isPresent ? "True" : "False",
        absent: isPresent ? "False" : "True",
        date: selectedDate,
      };
    });

    setAttendanceCounts({
      total: rows.length,
      Present: presentCount,
      Absent: absentCount,
    });

    if (alreadyTaken) {
      setAttendanceData(preparedAttendanceData); // Set the prepared attendance data
      setOpenDialog(true); // Open dialog
    } else {
      setAttendanceData(preparedAttendanceData); // Set the data even when not opening dialog
      submitAttendance(preparedAttendanceData); // Submit if no need for dialog
    }
  };

  const submitAttendance = async (attendanceData) => {
    try {
      const response = await axios.post("/api/AttendanceAPI", {
        subjects: attendanceData,
      });
      if (response.status === 200) {
        toast.success("Attendance submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("Failed to submit attendance.");
    }
  };

  const CheckAttendance = async () => {
    try {
      const response = await axios.get("/api/AttendanceAPI", {
        params: { selectedDate: selectedDate },
      });
      if (response.status === 200 && response.data.length > 0) {
        return true;
      }
    } catch (error) {
      console.error("Error checking attendance:", error);
      toast.error("Failed to check attendance.");
    }
    return false;
  };

  return (
    <>
      <Card sx={{ marginBottom: 4 }}>
        <CardHeader sx={{ pb: 2, pt: 2 }} title="Attendance Summary" />
        <Divider />
        <CardContent sx={{ pt: 4 }}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              type="date"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Box>
          <Box sx={{ height: "fit", width: "100%" }}>
            <DataGrid
              rows={[
                {
                  id: 1,
                  total: attendanceCounts.total,
                  Absent: attendanceCounts.Absent,
                  Present: attendanceCounts.Present,
                },
              ]}
              columns={[
                {
                  field: "total",
                  headerName: "Total No. of Students",
                  width: 150,
                },
                {
                  field: "Absent",
                  headerName: "Absent",
                  width: 150,
                },
                {
                  field: "Present",
                  headerName: "Present",
                  width: 150,
                },
                {
                  field: "submit",
                  headerName: "Submit",
                  width: 300,
                  renderCell: () => (
                    <Button variant="contained" onClick={handleSubmit}>
                      Submit
                    </Button>
                  ),
                },
              ]}
              hideFooter
            />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ pt: 0 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => `${row.id}`}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              handleSelectionChange(newSelection);
            }}
          />
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Attendance Confirmation</DialogTitle>
        <DialogContent>
          Attendance has already been taken for this date. Do you want to update
          it?
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleDialogClose(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDialogClose(true)}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Attendance;
