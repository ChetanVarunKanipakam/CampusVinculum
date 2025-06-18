// pages/Schedules/Schedules.jsx
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, useTheme } from "@mui/material";
import SidebarMenu from "../../common/sidebar/Sidebar";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import ExamSchedule from "./ExamSchedule.jsx";
import Timetable from "./TimetableSchedule.jsx";

const Schedules = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <NotificationButton />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Box sx={{ width: 240, bgcolor: "#f5f5f5", height: "100vh", flexShrink: 0 }}>
          <SidebarMenu />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            overflowY: "auto",
            bgcolor: "f0f0fa",
          }}
        >
          <Typography variant="h4" color="primary" fontWeight={700} my={4}>
            My Schedules
          </Typography>

          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              background: "#ffffffaa",
              backdropFilter: "blur(6px)",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Tab label="Exam Schedule" />
            <Tab label="Timetable" />
          </Tabs>

          {value === 0 && <ExamSchedule />}
          {value === 1 && <Timetable />}
        </Box>
      </Box>
    </>
  );
};

export default Schedules;
