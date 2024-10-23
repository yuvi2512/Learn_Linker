import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

const Marksheet = () => {
  const [rows, setRows] = useState([]);
  const { data: session, status } = useSession();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getMarksheetData", {
        params: { StudentId: session?.user?.id },
      });
      if (response.data) {
        const modifiedData = response.data.map((row) => ({
          ...row,
          Total: 100,
        }));
        console.log(response.data);
        setRows(modifiedData);
        toast.success("Data fetched successfully!");
      } else {
        toast.error("No data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    if(session?.user?.id)fetchData();
  }, [session?.user?.id]);

  const calculatePercentage = () => {
    const totalMarksObtained = rows.reduce(
      (sum, row) => sum + row.marks_obtained,
      0
    );
    const totalMarks = rows.reduce((sum, row) => sum + row.Total, 0);
    return ((totalMarksObtained / totalMarks) * 100).toFixed(2);
  };

  const generateMarksheet = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Learn Linker", 105, 20, null, null, "center");

    doc.setFontSize(12);
    const studentName = `Student Name: ${session?.user?.name}`;
    const percentage = `Percentage: ${calculatePercentage()}%`;

    const startY = 40;

    doc.text(studentName, 20, startY);
    doc.text(percentage, 20, startY + 10);

    const headers = [
      "Subject Name",
      "Marks Obtained",
      "Total Marks",
    ];
    const data = rows.map((row) => [
      row.subject_name,
      row.marks_obtained,
      row.Total,
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: startY + 25, 
    });

    doc.save("marksheet.pdf");
  };

  const columns = [
    { field: "subject_name", headerName: "Subject Name", width: 200 },
    { field: "marks_obtained", headerName: "Marks Obtained", width: 200 },
    { field: "Total", headerName: "Total Marks", width: 200 },
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button
              variant="contained"
              sx={{ mr: 4 }}
              onClick={generateMarksheet}
            >
              Generate Marksheet
            </Button>
          </CardContent>
          <CardContent sx={{ pt: 0 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => `${row.id}`}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Marksheet;
