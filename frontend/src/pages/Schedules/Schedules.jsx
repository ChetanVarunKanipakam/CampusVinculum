// Schedules.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  CircularProgress
} from "@mui/material";

import NotificationButton from "../../common/NotificationButton/NotificationButton";
import ExamSchedule from "./ExamSchedule.jsx";
import Timetable from "./TimetableSchedule.jsx";
import { GetUserData } from "../../utils/userApi";
import Loading from '../../components/Loading/Loading.jsx';


const Schedules = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => setValue(newValue);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await GetUserData();
        setUser(u);
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Loading />
      </Box>
    );
  }

  return (
    <div className="animate-fade-in duration-500">
      <NotificationButton />
      <Box sx={{ width: "100%", maxWidth: "100%", px: { xs: 2, md: 6 }, py: 4 }}>
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            overflowY: "auto",
            bgcolor: "#f0f4ff",
            height: "100vh",
          }}
        >
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            fontWeight={700}
            mb={2}
            textAlign="center"
            sx={{
              background: "linear-gradient(to right, #a1c4fd, #ff9a9e)",
              color: "white",
              py: 1.2,
              borderRadius: 2,
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            📅 My Schedules
          </Typography>

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

          {value === 0 && <ExamSchedule user={user} />}
          {value === 1 && <Timetable user={user} />}
        </Box>
      </Box>
    </div>
  );
};

export default Schedules;
