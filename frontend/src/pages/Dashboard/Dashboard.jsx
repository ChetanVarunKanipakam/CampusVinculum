import React,{ useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CodeIcon from "@mui/icons-material/Code";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import SidebarMenu from "../../common/sidebar/Sidebar";
import rgukt from "@/assets/rgukt.jpg";
import NotificationButton from "../../common/NotificationButton/NotificationButton";

// Add this array of image imports at the top with others:
import img1 from "@/assets/rgukt.jpg";
import img2 from "@/assets/rgukt1.jpg";
import img3 from "@/assets/rgukt2.jpg";

const images = [img1, img2, img3]; // carousel images

// Inside your Dashboard component

const Dashboard = () => {
  const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, 3000); // change image every 3 seconds
  return () => clearInterval(interval);
}, []);

  return (
    <>
    <NotificationButton/>
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
        {/* Header */}
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" mb={5}>
        {/* Carousel */}
        <Box
          sx={{
            width: { xs: "100%", md: "100%" },
            height: 400,
            overflow: "hidden",
            borderRadius: 2,
            mr: { md: 3 },
          }}
        >
          <img
            src={images[currentImage]}
            alt={`slide-${currentImage}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              transition: "all 1s ease-in-out",
            }}
          />
        </Box>

  {/* Heading + Description */}
      <Box mt={{ xs: 3, md: 0 }}>
        <Typography
          variant="h4"
          fontWeight={1000}
          fontSize={60}
          color="primary"
          sx={{ letterSpacing: 1 }}
        >
          RGUKT <br />
          RK Valley
        </Typography>
        <Typography mt={2} color="textSecondary" fontSize={16}>
          Welcome to RGUKT RK Valley Campus Vinculum, get ready to connect with your peers and grow together...
        </Typography>
      </Box>
    </Box>

        {/* Horizontal Scrollable Cards */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 2,
            pt:3,
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
          <DashboardCard
            title="Skills"
            icon={<SchoolIcon color="primary" />}
            items={["ReactJS", "NodeJS", "MongoDB", "Tailwind CSS"]}
            itemIcon={<CodeIcon fontSize="small" />}
          />

          <DashboardCard
            title="Achievements"
            icon={<EmojiEventsIcon color="success" />}
            items={[
              ["Top 1% in CodeChef", <StarIcon fontSize="small" color="warning" />],
              ["Hackathon Winner", <EmojiObjectsIcon fontSize="small" color="info" />],
              ["Best Project Award 2024", <CheckCircleIcon fontSize="small" color="secondary" />],
            ]}
          />

          <DashboardCard
            title="Clubs"
            icon={<GroupIcon color="secondary" />}
            items={[
              "Tech Club",
              "Cultural Club",
              "AI & Robotics Club",
            ]}
            itemIcon={<GroupIcon fontSize="small" />}
          />

          <DashboardCard
            title="Club Notifications"
            icon={<NotificationsActiveIcon color="error" />}
            items={[
              "Tech Talk on June 20th",
              "Cultural Rehearsal – June 25th",
            ]}
            itemIcon={<NotificationsActiveIcon fontSize="small" />}
          />
        </Box>
      </Box>
    </Box>
     </>
  );
};

const DashboardCard = ({ title, icon, items, itemIcon }) => (
  <Card
    elevation={6}
    sx={{
      minWidth: 300,
      maxWidth: 320,
      borderRadius: 4,
      background: "#ffffff",
      flexShrink: 0,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 10,
      },
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h6" fontWeight={600} ml={1}>
          {title}
        </Typography>
      </Box>
      <List dense>
        {items.map((item, i) => {
          const label = Array.isArray(item) ? item[0] : item;
          const iconComp = Array.isArray(item) ? item[1] : itemIcon;
          return (
            <ListItem key={i}>
              <ListItemIcon>{iconComp}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          );
        })}
      </List>
    </CardContent>
  </Card>
 
);

export default Dashboard;
