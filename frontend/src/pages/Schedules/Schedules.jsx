import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";

import SidebarMenu from "../../common/sidebar/Sidebar";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import ExamSchedule from "./ExamSchedule.jsx";
import Timetable from "./TimetableSchedule.jsx";

const Schedules = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <div className="animate-fade-in duration-500">
      <NotificationButton />

      <Box sx={{ width: "100%", maxWidth: "100%", px: { xs: 2, md: 6 }, py: 4 }}>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            overflowY: "auto",
            bgcolor: "#f0f4ff",
            height: "100vh",
          }}
        >
          {/* Title Section */}
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            fontWeight={700}
            mb={2}
            textAlign="center"
            sx={{
              background: "linear-gradient(to right, #a1c4fd, #ff9a9e)", // aqua to pink
              color: "white",
              py: 1.2,
              borderRadius: 2,
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            📅 My Schedules
          </Typography>

          {/* Description Box */}
          <Box
            sx={{
              textAlign: "center",
              background: "#ffffffaa",
              px: 2,
              py: 1,
              borderRadius: 2,
              mb: 3,
              color: "#444",
              fontSize: "0.95rem",
              fontStyle: "italic",
              backdropFilter: "blur(5px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            View your mid-semester exams and weekly class timetable at a glance.
          </Box>

          {/* Tabs */}
          <Paper
            elevation={3}
            sx={{
              mb: 3,
              borderRadius: 3,
              background: "linear-gradient(to right, #f0f4ff, #ffffff)",
              backdropFilter: "blur(10px)",
              overflowX: "auto",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              sx={{
                px: 2,
                "& .MuiTab-root": {
                  fontWeight: 600,
                  textTransform: "none",
                },
                "& .Mui-selected": {
                  color: "#1976d2",
                },
              }}
            >
              <Tab label="📝 Exam Schedule" />
              <Tab label="📚 Timetable" />
            </Tabs>
          </Paper>

          <Divider sx={{ mb: 3 }} />

          {/* Tab Content */}
          {value === 0 && <ExamSchedule />}
          {value === 1 && <Timetable />}
        </Box>
      </Box>
      </div>
    </>
  );
};

export default Schedules;
