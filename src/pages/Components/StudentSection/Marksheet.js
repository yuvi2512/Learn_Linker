import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import toast from "react-hot-toast";

const Marksheet = () => {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getMarksheetData");
      if (response.data) {
        const modifiedData = response.data.map((row) => ({
          ...row,
          Total: 100,
        }));

        setRows(modifiedData);
        toast.success("Data fetched successfully!");
      } else {
        console.log("No data found");
        toast.error("No data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    doc.text("Learn Linker", 105, 20, null, null, "center"); // Centered title

    doc.setFontSize(12);
    doc.text(`Percentage: ${calculatePercentage()}%`, 20, 40);

    const headers = [
      "Subject Code",
      "Subject Name",
      "Marks Obtained",
      "Total Marks",
    ];
    const data = rows.map((row) => [
      row.id,
      row.subject_name,
      row.marks_obtained,
      row.Total,
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 50,
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
