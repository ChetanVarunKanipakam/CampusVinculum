import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Avatar,
  Container,
} from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import UpcomingIcon from "@mui/icons-material/Update";
import SidebarMenu from "../../common/sidebar/Sidebar";
import NotificationButton from "../../common/NotificationButton/NotificationButton";

const sessions = [
  {
    title: "AI & ML Bootcamp",
    status: "upcoming",
    speaker: "Dr. Vamsi Krishna",
    date: "2025-06-25",
    time: "10:00 AM",
  },
  {
    title: "Data Structures Masterclass",
    status: "live",
    speaker: "Ms. Kavya Rao",
    date: "Today",
    time: "11:00 AM",
  },
  {
    title: "Career in Cybersecurity",
    status: "completed",
    speaker: "Mr. Rahul Verma",
    date: "2025-06-10",
    time: "4:00 PM",
  },
  {
    title: "Frontend Dev Crash Course",
    status: "completed",
    speaker: "Srujana Sharma",
    date: "2025-06-09",
    time: "3:30 PM",
  },
];

const LiveSessions = () => {
  const [selectedTab, setSelectedTab] = useState("live");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "error";
      case "upcoming":
        return "primary";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "live":
        return <LiveTvIcon fontSize="small" />;
      case "upcoming":
        return <UpcomingIcon fontSize="small" />;
      case "completed":
        return <DoneIcon fontSize="small" />;
      default:
        return <AccessTimeIcon fontSize="small" />;
    }
  };

  const filteredSessions = sessions.filter(
    (session) => session.status === selectedTab
  );

  return (
    <>
    <NotificationButton/>
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, bgcolor: "#f5f5f5", height: "100vh", flexShrink: 0 }}>
        <SidebarMenu />
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, sm: 4 } ,mt: 5}}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} mb={3} color="primary" textAlign="center">
            Live Sessions
          </Typography>

          {/* Filter Tabs */}
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            centered
            sx={{ mb: 4 }}
          >
            <Tab label="Live" value="live" />
            <Tab label="Upcoming" value="upcoming" />
            <Tab label="Completed" value="completed" />
          </Tabs>

          {/* Cards */}
          <Grid container spacing={3}>
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card
                    elevation={4}
                    sx={{
                      borderRadius: 3,
                      background: "#ffffff",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight={600}>
                          {session.title}
                        </Typography>
                        <Chip
                          label={session.status.toUpperCase()}
                          color={getStatusColor(session.status)}
                          icon={getStatusIcon(session.status)}
                          size="small"
                        />
                      </Box>

                      <Typography variant="body2" color="textSecondary" mt={1}>
                        <strong>Date:</strong> {session.date}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Time:</strong> {session.time}
                      </Typography>

                      <Box display="flex" alignItems="center" mt={2}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                        <Typography variant="body2">
                          <strong>Speaker:</strong> {session.speaker}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  No sessions available in this category.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  </>
  );
};

export default LiveSessions;
