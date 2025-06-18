import React from "react";
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
import SidebarMenu from "../../common/sidebar/Sidebar";
import rgukt from "@/assets/rgukt.jpg";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import { useNavigate } from "react-router-dom";

const studentClubs = [
  {
    name: "A Club",
    description: "For coding, hackathons and tech events",
  },
  {
    name: "B Club",
    description: "Music, Dance, and Arts Performances",
  },
  {
    name: "C Club",
    description: "Debates, Elocutions, and Book Readings",
  },
];

const allstudentClubs = [
  {
    name: "A Club",
    description: "For coding, hackathons and tech events",
  },
  {
    name: "B Club",
    description: "Music, Dance, and Arts Performances",
  },
  {
    name: "C Club",
    description: "Debates, Elocutions, and Book Readings",
  },
];

const Clubs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
          bgcolor: "f0f0fa",
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
          My Clubs
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
          {studentClubs.map((club, index) => (
            <Card
              key={index}
              elevation={5}
              onClick={() => navigate(`/clubs/${club.name}`)}
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
                <CardMedia
                sx={{ height: 140 }}
                image={rgukt}
                title={club.name}
                />
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      background:
                        "linear-gradient(135deg, #4f46e5, #3b82f6)",
                      color: "#fff",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <GroupWorkIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    ml={2}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {club.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {club.description}
                </Typography>
              </CardContent>
            </Card>
          ))}

        
        </Box>
        <Typography
          variant="h4"
          color="primary"
          fontWeight={700}
          textAlign="center"
          mb={4}
          sx={{ letterSpacing: 1 }}
        >
          All Clubs
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

          {allstudentClubs.map((club, index) => (
            <Card
              key={index}
              elevation={5}
              onClick={() => navigate(`/clubs/${club.name}`)}
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
                <CardMedia
                sx={{ height: 140 }}
                image={rgukt}
                title={club.name}
                />
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      background:
                        "linear-gradient(135deg, #4f46e5, #3b82f6)",
                      color: "#fff",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <GroupWorkIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    ml={2}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {club.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {club.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
          </Box>
      </Box>
    </Box>
    </>
  );
};

export default Clubs;
