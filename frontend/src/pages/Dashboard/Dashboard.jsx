import React from "react";
import { Box } from "@mui/material";
import SidebarMenu from "../../common/sidebar/Sidebar";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import CardSection from "../../components/Dashboard/CardSection";
const Dashboard = () => {
  return (
    <>
      <NotificationButton />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar */}
        <Box sx={{ width: 240, bgcolor: "#f5f5f5", height: "100vh", flexShrink: 0 }}>
          <SidebarMenu />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            mt: 5,
            overflowY: "auto",
            bgcolor: "#f0f0fa",
          }}
        >
          <DashboardHeader />
          <CardSection />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
