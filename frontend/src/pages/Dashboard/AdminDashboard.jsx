import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import SidebarMenu from "../../common/sidebar/Sidebar.jsx";
import NotificationButton from "../../common/NotificationButton/NotificationButton.jsx";
import DashboardHeader from "../../components/Dashboard/DashboardHeader.jsx";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import CampaignIcon from "@mui/icons-material/Campaign";
import Navbar from "../../common/navbar/navbar.jsx";

const QuickActionCard = ({ icon, title, description, onClick }) => (
  <Paper elevation={6} sx={{ p: 3, borderRadius: 4, textAlign: "center" }}>
    <Box fontSize={40} color="primary.main">{icon}</Box>
    <Typography variant="h6" fontWeight={600}>{title}</Typography>
    <Typography variant="body2" color="text.secondary">{description}</Typography>
    <Button variant="contained" size="small" sx={{ mt: 2 }} onClick={onClick}>
      Manage
    </Button>
  </Paper>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar/>
      <NotificationButton />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        

        <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto", bgcolor: "#f0f0fa" }}>
          <DashboardHeader />
          <Box my={5} textAlign="center">
            <Typography variant="h4" fontWeight={700} color="primary">
              Welcome, Admin!
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <QuickActionCard
                icon={<GroupsIcon />}
                title="Manage Users"
                description="View, edit, and control user accounts."
                onClick={() => navigate("users")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <QuickActionCard
                icon={<SchoolIcon />}
                title="Departments"
                description="Oversee academic departments."
                onClick={() => navigate("departments")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <QuickActionCard
                icon={<CampaignIcon />}
                title="Announcements"
                description="Post announcements to various user groups."
                onClick={() => navigate("announcements")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <QuickActionCard
                icon={<AdminPanelSettingsIcon />}
                title="Roles & Permissions"
                description="Manage user roles and access levels."
                onClick={() => alert("Redirect to Roles & Permissions")}
              />
            </Grid>
          </Grid>

          <Box mt={6}>
            {/* This is where the nested pages will render */}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
