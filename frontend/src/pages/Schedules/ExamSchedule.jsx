import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

// Exam data
const examSchedule = {
  "Mid-Terms": [
    {
      subject: "Operating Systems",
      date: "2025-07-10",
      time: "10:00 AM - 12:00 PM",
      venue: "Hall A",
    },
    {
      subject: "Data Structures",
      date: "2025-07-12",
      time: "02:00 PM - 04:00 PM",
      venue: "Hall B",
    },
    {
      subject: "DBMS",
      date: "2025-07-14",
      time: "11:00 AM - 01:00 PM",
      venue: "Lab 1",
    },
    {
      subject: "Compiler Design",
      date: "2025-07-16",
      time: "09:00 AM - 11:00 AM",
      venue: "Hall C",
    },
  ],
  "Semester Exams": [
    {
      subject: "Compiler Design",
      date: "2025-07-25",
      time: "09:00 AM - 12:00 PM",
      venue: "Main Auditorium",
    },
    {
      subject: "DBMS",
      date: "2025-07-28",
      time: "01:00 PM - 04:00 PM",
      venue: "Hall C",
    },
    {
      subject: "Data Structures",
      date: "2025-07-30",
      time: "10:00 AM - 01:00 PM",
      venue: "Lab 2",
    },
    {
      subject: "Operating Systems",
      date: "2025-08-02",
      time: "02:00 PM - 05:00 PM",
      venue: "Hall D",
    },
  ],
};

const formatDate = (dateStr) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
  }).format(new Date(dateStr));

const ExamSchedule = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [examType, setExamType] = useState("Mid-Terms");

  const handleChange = (event, newValue) => {
    if (newValue !== null) setExamType(newValue);
  };

  return (
    <Box px={isSmallScreen ? 2 : 5} py={4}>
      <Box display="flex" justifyContent="center" mb={3}>
        <ToggleButtonGroup
          value={examType}
          exclusive
          onChange={handleChange}
          size="small"
          sx={{
            borderRadius: 2,
            background: "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "& .MuiToggleButton-root": {
              fontSize: "0.75rem",
              padding: "2px 6px",
              fontWeight: 600,
              textTransform: "none",
              border: "1px solid #87ceeb", // skyblue border
              color: "#0288d1",
              "&.Mui-selected": {
                backgroundColor: "#87ceeb",
                color: "#ffffff",
                borderColor: "#87ceeb",
              },
              "&:hover": {
                backgroundColor: "#e0f7fa",
              },
            },
          }}
        >
          <ToggleButton value="Mid-Terms">Mid Exams</ToggleButton>
          <ToggleButton value="Semester Exams">Semester Exams</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Typography
        variant="h6"
        fontWeight={400}
        gutterBottom
        sx={{
          textAlign: "center",
          color: "white",
          background: "linear-gradient(20deg, #3f51b5, #5c6bc0)",
          py: 2,
          borderRadius: 2,
          boxShadow: "0px 8px 20px rgba(43, 41, 141, 0.2)",
          mb: 4,
        }}
      >
        {examType}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {examSchedule[examType].map((exam, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Card
              sx={{
                borderRadius: 4,
                background: "linear-gradient(to bottom right, #ffffffcc, #f0f0f0cc)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 16px 32px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <SchoolIcon color="primary" />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    ml={1.5}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {exam.subject}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box display="flex" alignItems="center" mb={1}>
                  <EventIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{formatDate(exam.date)}</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{exam.time}</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <PlaceIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{exam.venue}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExamSchedule;
