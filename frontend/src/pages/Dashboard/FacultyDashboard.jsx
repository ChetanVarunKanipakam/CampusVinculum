import React from "react";
import { Box, Typography } from "@mui/material";
import FacultySidebar from "../../common/Sidebar/FacultySidebar.jsx";
import NotificationButton from "../../common/NotificationButton/NotificationButton.jsx";
import DashboardHeader from "../../components/Dashboard/DashboardHeader.jsx";
import DashboardCard from "../../components/Dashboard/DashboardCard.jsx";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ClassIcon from "@mui/icons-material/Class";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";


    




const FacultyDashboard = () => {
  return (
    <>
      {/* Floating Notification Button */}
      <NotificationButton />

      {/* Main Dashboard Layout */}
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar Section */}
        <Box
          sx={{
            width: 240,
            bgcolor: "#e0e0e0",
            height: "100vh",
            flexShrink: 0,
            borderRight: "1px solid #ccc",
          }}
        >
          <FacultySidebar />
        </Box>

        {/* Dashboard Content Section */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            mt: 5,
            overflowY: "auto",
            bgcolor: "#f9f9ff",
          }}
        >
          {/* Faculty Dashboard Header */}
          <Box mb={3}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Faculty Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage classes, students, and academic resources
            </Typography>
          </Box>

          {/* Custom Components */}
          <DashboardHeader />
          <Box
            sx={{
                display: "flex",
                gap: 3,
                overflowX: "auto",
                pb: 2,
                pt: 3,
                pl: 1,
                "&::-webkit-scrollbar": {
                height: 8,
                },
                "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: 4,
                },
            }}
            >
            {/* Faculty Courses */}
            <DashboardCard
                title="Courses Taught"
                icon={<ClassIcon color="primary" />}
                items={["Data Structures", "DBMS", "AI & ML"]}
                itemIcon={<SchoolIcon fontSize="small" />}
            />

            {/* Publications */}
            <DashboardCard
                title="Research Publications"
                icon={<LibraryBooksIcon color="success" />}
                items={[
                ["IEEE Conference 2024", <AssignmentIcon fontSize="small" color="warning" />],
                ["AI in Education Journal", <EmojiObjectsIcon fontSize="small" color="info" />],
                ]}
            />

            {/* Mentorship */}
            <DashboardCard
                title="Mentorship"
                icon={<PeopleAltIcon color="secondary" />}
                items={["B.Tech Batch 2022", "B.Tech Batch 2023"]}
                itemIcon={<PeopleAltIcon fontSize="small" />}
            />

            {/* Notifications */}
            <DashboardCard
                title="Faculty Notifications"
                icon={<NotificationsActiveIcon color="error" />}
                items={[
                "Project Reviews – June 24",
                "Internal Meeting – June 26",
                "Deadline: Grades Submission – June 30",
                ]}
                itemIcon={<NotificationsActiveIcon fontSize="small" />}
            />
            </Box>
        </Box>
      </Box>
    </>
  );
};

export default FacultyDashboard;
