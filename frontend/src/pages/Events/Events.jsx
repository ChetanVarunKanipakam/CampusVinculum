import React from "react";
import SidebarMenu from "../../common/sidebar/Sidebar";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  useTheme,
} from "@mui/material";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import rgukt from "@/assets/rgukt.jpg";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import { useNavigate } from "react-router-dom"; // Add this at top


   // Initialize navigate

  

const Events = () =>{

    const navigate = useNavigate();
     const Events = [
    {
      name: "Event1",
      description: "Tech event for all CSE students",
      details:
        "This is a technical gathering with talks on AI, ML, and competitive programming.",
    },
    {
      name: "Event2",
      description: "Farewell send-off to R19 batch",
      details:
        "R19 batch farewell with speeches, performances, and photo sessions.",
    },
    {
      name: "Event3",
      description: "Abhiyanth cultural and tech fest of RGUKT RK Valley",
      details:
        "A 3-day celebration with cultural programs, workshops, exhibitions, and competitions.",
    },
  ];


    return (
        <>
    <NotificationButton/>
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box sx={{ width: 240, bgcolor: "#f5f5f5", height: "100vh", flexShrink: 0 }}>
        <SidebarMenu />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 5,
          overflowY: "auto",
          bgcolor: "#f3f4f6",
        }}
      >
        <Typography
          variant="h4"
          color="primary"
          fontWeight={700}
          textAlign="center"
          mb={4}
          sx={{ letterSpacing: 1 }}
        >
          Events
        </Typography>

        {/* Scrollable Card Row */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            px: 1,
            pb: 3,
            pt: 3,
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: 4,
            },
          }}
        >
            {Events.map((event, index) => (
  <Box
    key={index}
    onClick={() => navigate(`/events/${event.name}`)}
    sx={{ cursor: "pointer" }}
  >
    <Card
      elevation={5}
      sx={{
        minWidth: 300,
        maxWidth: 320,
        borderRadius: 4,
        flexShrink: 0,
        scrollSnapAlign: "start",
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardMedia sx={{ height: 140 }} image={rgukt} title={event.name} />
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              color: "#fff",
              width: 48,
              height: 48,
            }}
          >
            <GroupWorkIcon />
          </Avatar>
          <Typography variant="h6" fontWeight={600} ml={2}>
            {event.name}
          </Typography>
                </Box>
                    <Typography variant="body2" color="text.secondary">
                    {event.description}
                    </Typography>
                </CardContent>
                </Card>
            </Box>
            ))}

        </Box>
      </Box>
    </Box>
    </>
    );
}

export default Events;






