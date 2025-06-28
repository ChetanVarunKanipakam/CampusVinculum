import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardContent, Typography, Box, Divider, Grid,
  ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

const formatDate = (dateStr) =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(dateStr));

const ExamSchedule = ({user}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [examType, setExamType] = useState("Mid-Terms");
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/examschedule/${user?.departmentID?.name}/${ user?.roleDetails?.year}`);
      setExams(data);
    } catch (err) {
      console.error("Failed to fetch exams:", err);
    }
  };

  const handleChange = (event, newType) => {
    if (newType !== null) setExamType(newType);
  };

  const filteredExams = exams.filter(exam => exam.examType === examType);

  return (
    <Box px={isSmallScreen ? 2 : 5} py={4}>
      <Box display="flex" justifyContent="center" mb={3}>
        <ToggleButtonGroup
          value={examType}
          exclusive
          onChange={handleChange}
          size="small"
        >
          <ToggleButton value="Mid-Terms">Mid Exams</ToggleButton>
          <ToggleButton value="Semester Exams">Semester Exams</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Typography
        variant="h6"
        textAlign="center"
        sx={{
          color: "white",
          background: "linear-gradient(20deg, #3f51b5, #5c6bc0)",
          py: 2,
          borderRadius: 2,
          mb: 4,
        }}
      >
        {examType}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {filteredExams.map((exam, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <SchoolIcon color="primary" />
                  <Typography variant="h6" fontWeight={600} ml={1.5}>
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
                  <Typography variant="body2">{exam.startTime} - {exam.endTime}</Typography>
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
