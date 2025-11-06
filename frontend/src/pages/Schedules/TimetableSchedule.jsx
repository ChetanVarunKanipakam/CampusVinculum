// TimetableSchedule.jsx
import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import axios from "axios";

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

const Timetable = ({ user }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [timetable, setTimetable] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await axios.get("${import.meta.env.VITE_API_URL}/api/timetable", {
          params: {
            year: user?.roleDetails?.year,
            section: user?.roleDetails?.section,
            branch: user?.departmentID?.name,
          },
        });

        setTimetable(res.data.timetable);
        setTimeSlots(res.data.timeSlots);
        setDays(res.data.days);
      } catch (error) {
        console.error("Failed to fetch timetable", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTimetable();
  }, [user]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress />
      </Box>
    );
  }

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
            <TableRow sx={{ background: "linear-gradient(to right, #ff9a9e, #a1c4fd)" }}>
              <TableCell sx={{ color: "white", fontWeight: 700, fontSize: isSmallScreen ? "0.75rem" : "1rem" }}>
                Day / Time
              </TableCell>
              {timeSlots.map((slot, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ color: "white", fontWeight: 700, fontSize: isSmallScreen ? "0.7rem" : "0.95rem" }}
                >
                  {slot}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day, i) => (
              <TableRow key={i}>
                <TableCell sx={{ fontWeight: 600, color: "#374151", fontSize: isSmallScreen ? "0.75rem" : "0.9rem" }}>
                  {day}
                </TableCell>
                {timetable[day]?.map((subject, idx) => {
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
