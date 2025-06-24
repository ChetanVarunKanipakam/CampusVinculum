import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import SidebarMenu from "../../common/sidebar/Sidebar";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import CardSection from "../../components/Dashboard/CardSection";
import { GetStudentData } from "../../utils/userApi.js";

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [cardsInfo, setCardsInfo] = useState({ skillsset: [], achievementsset: [], clubs: [], clubNotifs: [] });

  useEffect(() => {
    fetchCardsInfo();
  }, []);

  const fetchCardsInfo = async () => {
    try {
      const data = await GetStudentData();
      setCardsInfo({
        skillsset: data.skills || [],
        achievementsset: data.achievements || [],
        clubs: data.clubs || [],
        clubNotifs: data.clubNotifications || [],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="animate-fade-in duration-500">
      <NotificationButton notifications={notifications} />

      {/* Flex row layout with sidebar and content */}
      <div className="flex min-h-screen bg-[#f4f7ff]">

        {/* Content area (padding-left for sidebar space) */}
        <Box sx={{ width: "100%", maxWidth: "100%", px: { xs: 2, md: 6 }, py: 4 }}>
          <DashboardHeader />
          <CardSection {...cardsInfo} />
        </Box>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
