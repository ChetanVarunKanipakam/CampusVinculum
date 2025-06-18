// pages/Schedules/Timetable.jsx
import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:15 - 12:15",
  "01:15 - 02:15",
  "02:15 - 03:15",
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const timetableData = {
  Monday: ["Maths", "Physics", "Chemistry", "Computer", "English"],
  Tuesday: ["Physics", "Maths", "English", "Chemistry", "Computer"],
  Wednesday: ["Chemistry", "English", "Physics", "Computer", "--"],
  Thursday: ["English", "Chemistry", "Maths", "Physics", "Lab"],
  Friday: ["Computer", "English", "Computer", "Maths", "Lab"],
  Saturday: ["--", "--", "Seminar", "--", "--"],
};

const Timetable = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} color="primary" my={3}>
        Weekly Class Timetable
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(8px)",
          borderRadius: 4,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(to right, #4f46e5, #3b82f6)" }}>
              <TableCell sx={{ color: "white", fontWeight: 700 }}>Day / Time</TableCell>
              {timeSlots.map((slot, index) => (
                <TableCell key={index} align="center" sx={{ color: "white", fontWeight: 700 }}>
                  {slot}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontWeight: 600, color: "#3f3f3f" }}>{day}</TableCell>
                {timetableData[day].map((subject, idx) => (
                  <TableCell
                    key={idx}
                    align="center"
                    sx={{
                      fontWeight: 500,
                      color: subject === "--" ? "#999" : "#333",
                      backgroundColor: subject === "Lab" ? "#e3f2fd" : "inherit",
                    }}
                  >
                    {subject}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Timetable;
