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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import UpcomingIcon from "@mui/icons-material/Update";
import SidebarMenu from "../../common/sidebar/Sidebar";
import NotificationButton from "../../common/NotificationButton/NotificationButton";

const sessions = [
  // LIVE Sessions
  {
    title: "Data Structures Masterclass",
    status: "live",
    speaker: "Ms. Kavya Rao",
    date: "Today",
    time: "11:00 AM",
  },
  {
    title: "Machine Learning with Python",
    status: "live",
    speaker: "Mr. Arvind Iyer",
    date: "Today",
    time: "12:00 PM",
  },
  {
    title: "Deep Learning with TensorFlow",
    status: "live",
    speaker: "Dr. Meenal Agarwal",
    date: "Today",
    time: "2:00 PM",
  },
  {
    title: "Kubernetes for Developers",
    status: "live",
    speaker: "Mr. Sameer Shaikh",
    date: "Today",
    time: "3:30 PM",
  },
  {
    title: "Real-time Chat App with Socket.io",
    status: "live",
    speaker: "Ms. Rachana Deshmukh",
    date: "Today",
    time: "5:00 PM",
  },

  // UPCOMING Sessions
  {
    title: "AI & ML Bootcamp",
    status: "upcoming",
    speaker: "Dr. Vamsi Krishna",
    date: "2025-06-25",
    time: "10:00 AM",
  },
  {
    title: "Introduction to Data Science",
    status: "upcoming",
    speaker: "Dr. Sneha Kapoor",
    date: "2025-07-01",
    time: "2:00 PM",
  },
  {
    title: "Advanced React Workshop",
    status: "upcoming",
    speaker: "Ms. Tanya Singh",
    date: "2025-06-30",
    time: "5:00 PM",
  },
  {
    title: "Blockchain for Beginners",
    status: "upcoming",
    speaker: "Dr. Akash Rathi",
    date: "2025-07-03",
    time: "11:30 AM",
  },
  {
    title: "DevOps Essentials",
    status: "upcoming",
    speaker: "Mr. Varun Mehta",
    date: "2025-07-04",
    time: "3:00 PM",
  },
  {
    title: "Design Thinking Workshop",
    status: "upcoming",
    speaker: "Ms. Ananya Raj",
    date: "2025-07-05",
    time: "1:00 PM",
  },

  // COMPLETED Sessions
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
  const [openDialog, setOpenDialog] = useState(false);
  const [activeSession, setActiveSession] = useState(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const openSessionDetails = (session) => {
    setActiveSession(session);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setActiveSession(null);
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
      <NotificationButton />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
        <Box sx={{ width: 240, bgcolor: "#f5f5f5", height: "100vh", flexShrink: 0 }}>
          <SidebarMenu />
        </Box>

        <Box component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, sm: 4 }, mt: 5 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" fontWeight={700} mb={3} color="primary" textAlign="center">
              Live Sessions
            </Typography>

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

            <Grid container spacing={3}>
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Card
                      elevation={4}
                      sx={{
                        borderRadius: 3,
                        height: "100%",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "translateY(-5px)" },
                      }}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="subtitle1" fontWeight={600}>{session.title}</Typography>
                          <Chip
                            label={session.status.toUpperCase()}
                            color={getStatusColor(session.status)}
                            icon={getStatusIcon(session.status)}
                            size="small"
                          />
                        </Box>

                        <Divider sx={{ mb: 1 }} />

                        <Typography variant="body2" color="text.secondary">📅 <strong>Date:</strong> {session.date}</Typography>
                        <Typography variant="body2" color="text.secondary">⏰ <strong>Time:</strong> {session.time}</Typography>

                        <Box display="flex" alignItems="center" mt={2}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: "primary.main" }} />
                          <Typography variant="body2">🎤 <strong>Speaker:</strong> {session.speaker}</Typography>
                        </Box>

                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ mt: 2, borderRadius: 2, textTransform: "none" }}
                          onClick={() => openSessionDetails(session)}
                        >
                          {session.status === "live" ? "Join Now" : "View Details"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" color="textSecondary" textAlign="center">
                    No sessions available in this category.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{activeSession?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Status:</strong> {activeSession?.status.toUpperCase()}
          </Typography>
          <Typography variant="body2">
            <strong>Speaker:</strong> {activeSession?.speaker}
          </Typography>
          <Typography variant="body2">
            <strong>Date:</strong> {activeSession?.date}
          </Typography>
          <Typography variant="body2">
            <strong>Time:</strong> {activeSession?.time}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
          {activeSession?.status === "live" && (
            <Button variant="contained" color="error">
              Join Session
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LiveSessions;
