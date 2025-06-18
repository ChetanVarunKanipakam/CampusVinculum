// pages/Schedules/ExamSchedule.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

// Exam data grouped by type
const examSchedule = {
  "Mid-Terms": [
    {
      subject: "Mathematics",
      date: "2025-07-10",
      time: "10:00 AM - 12:00 PM",
      venue: "Hall A",
    },
    {
      subject: "Physics",
      date: "2025-07-12",
      time: "02:00 PM - 04:00 PM",
      venue: "Hall B",
    },
  ],
  "Semester Exams": [
    {
      subject: "Chemistry",
      date: "2025-07-25",
      time: "09:00 AM - 12:00 PM",
      venue: "Main Auditorium",
    },
    {
      subject: "English",
      date: "2025-07-28",
      time: "01:00 PM - 04:00 PM",
      venue: "Hall C",
    },
  ],
};

const formatDate = (dateStr) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
  }).format(new Date(dateStr));

const ExamSchedule = () => (
  <Box p={5}>
    {Object.entries(examSchedule).map(([examType, exams], index) => (
      <Box key={index} mb={5}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          gutterBottom
          sx={{
            textAlign: "center",
            letterSpacing: 1,
            mb: 3,
          }}
        >
          {examType}
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {exams.map((exam, i) => (
            <Grid item key={i}>
              <Card
                sx={{
                  minWidth: 300,
                  maxWidth: 360,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
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
                    <Typography variant="body1">
                      {formatDate(exam.date)}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body1">{exam.time}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <PlaceIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body1">{exam.venue}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    ))}
  </Box>
);

export default ExamSchedule;
