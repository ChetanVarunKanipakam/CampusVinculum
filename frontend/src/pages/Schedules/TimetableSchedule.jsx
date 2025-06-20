import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Time slots and days
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

const subjectColors = {
  Maths: "#bbdefb",
  Physics: "#c8e6c9",
  Chemistry: "#ffe0b2",
  Computer: "#d1c4e9",
  English: "#f8bbd0",
  Lab: "#b2ebf2",
  Seminar: "#fff9c4",
};

const getStyledCell = (subject) => {
  const style = {
    fontWeight: 500,
    color: subject === "--" ? "#aaa" : "#333",
    backgroundColor: subjectColors[subject] || "transparent",
    fontSize: "0.9rem",
  };

  let content = subject;
  if (subject === "Lab") content = "🔬 Lab";
  else if (subject === "Seminar") content = "🎤 Seminar";
  else if (subject === "--") content = "--";

  return { style, content };
};

const Timetable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box px={isSmallScreen ? 1 : 4} py={4}>
      <Typography
        variant={isSmallScreen ? "h6" : "h5"}
        fontWeight={700}
        color="primary"
        mb={3}
        textAlign="center"
        letterSpacing={1}
        sx={{
          background: "linear-gradient(to right, #4f46e5, #3b82f6)",
          color: "white",
          py: 1.5,
          borderRadius: 2,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        📚 Weekly Class Timetable
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          overflowX: "auto",
        }}
      >
        <Table size={isSmallScreen ? "small" : "medium"}>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(to right, #ff9a9e, #a1c4fd)", // pink to aqua
              }}
            >
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: isSmallScreen ? "0.75rem" : "1rem",
                }}
              >
                Day / Time
              </TableCell>
              {timeSlots.map((slot, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: isSmallScreen ? "0.7rem" : "0.95rem",
                  }}
                >
                  {slot}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: isSmallScreen ? "0.75rem" : "0.9rem",
                  }}
                >
                  {day}
                </TableCell>
                {timetableData[day].map((subject, idx) => {
                  const { style, content } = getStyledCell(subject);
                  return (
                    <TableCell
                      key={idx}
                      align="center"
                      sx={{
                        ...style,
                        border: "1px solid #e0e0e0",
                        transition: "all 0.3s",
                        "&:hover": {
                          backgroundColor: "#e0f2f1",
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      {content}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Timetable;
