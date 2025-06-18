import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  useTheme,
  InputBase,
  IconButton,
  Grid,
  Button
} from "@mui/material";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import SearchIcon from "@mui/icons-material/Search";
import CodeIcon from "@mui/icons-material/Code";
import PublicIcon from "@mui/icons-material/Public";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MovieIcon from "@mui/icons-material/Movie";
import CreateIcon from "@mui/icons-material/Create";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MemoryIcon from "@mui/icons-material/Memory";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SidebarMenu from "../../common/sidebar/Sidebar";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const icons = [
  <CodeIcon />, <PublicIcon />, <MusicNoteIcon />, <FitnessCenterIcon />,
  <BusinessCenterIcon />, <MovieIcon />, <CreateIcon />, <PsychologyIcon />,
  <MemoryIcon />, <TheaterComedyIcon />, <MusicNoteIcon />, <TravelExploreIcon />
];

const backgrounds = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c", // CodeVerse
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // GlobeTrotters
  "https://images.unsplash.com/photo-1554284126-aa88f22d8b74", // FitNation
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // PixelPioneers ✅ fixed
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", // EcoSphere
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf", // BizCatalyst ✅ fixed
  "https://images.unsplash.com/photo-1517602302552-471fe67acf66", // CineSoc
  "https://images.unsplash.com/photo-1584697964154-b74c3b2f6684", // QuantumQuill ✅ fixed
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e", // MindScape ✅ fixed
  "https://images.unsplash.com/photo-1502980426475-b83966705988", // StageStorm
  "https://images.unsplash.com/photo-1511376777868-611b54f68947", // PolyRhythm
  "https://images.unsplash.com/photo-1473625247510-8ceb1760943f" // TravelTales
];

const clubSections = [
  {
    title: "All Clubs",
    clubs: [
      { name: "CodeVerse", description: "Code & compete." },
      { name: "GlobeTrotters", description: "Wanderlust squad." },
      { name: "FitNation", description: "Health and strength." },
      { name: "PixelPioneers", description: "Design & creativity." },
      { name: "EcoSphere", description: "Green & sustainable living." },
      { name: "BizCatalyst", description: "Entrepreneurship hub." },
      { name: "CineSoc", description: "Film & short stories." },
      { name: "QuantumQuill", description: "Writing magic." },
      { name: "MindScape", description: "Mental wellness zone." },
      { name: "StageStorm", description: "Performing arts club." },
      { name: "PolyRhythm", description: "Rhythms & beats." },
      { name: "TravelTales", description: "Adventures & cultures." }
    ]
  }
];

const ClubCard = ({ club, onClick, icon, background }) => (
  <motion.div
    whileHover={{ scale: 1.06 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Card
      elevation={6}
      onClick={onClick}
      sx={{
        width: 280,
        height: 280,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textShadow: "1px 1px 2px rgba(0,0,0,0.7)"
      }}
    >
      <CardContent sx={{ textAlign: "center", background: "transparent", p: 2 }}>
        <Avatar sx={{ bgcolor: "white", color: "black", width: 40, height: 40, mx: "auto", mb: 1 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" fontWeight={700} noWrap>
          {club.name}
        </Typography>
        <Typography variant="body2" noWrap>
          {club.description}
        </Typography>
        <Button variant="contained" size="small" sx={{ mt: 1 }}>
          Explore
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const Clubs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <NotificationButton />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Box sx={{ width: 240, bgcolor: "#f5f5f5", height: "100vh", flexShrink: 0 }}>
          <SidebarMenu />
        </Box>

        <Box sx={{ flexGrow: 1, p: 5, overflowY: "auto", bgcolor: "#eef2ff" }}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
            <InputBase
              placeholder="Search clubs..."
              sx={{
                px: 2,
                py: 1,
                width: 320,
                bgcolor: "white",
                borderRadius: 5,
                boxShadow: 2
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startAdornment={
                <IconButton>
                  <SearchIcon />
                </IconButton>
              }
            />
          </Box>

          {clubSections.map(({ title, clubs }, idx) => (
            <Box key={idx} mb={5}>
              <Typography
                variant="h4"
                color="primary"
                fontWeight={800}
                textAlign="center"
                mb={3}
                sx={{ letterSpacing: 1.5 }}
              >
                {title}
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {clubs
                  .filter((club) =>
                    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    club.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((club, index) => (
                    <Grid item key={index}>
                      <ClubCard
                        club={club}
                        icon={icons[index % icons.length]}
                        background={backgrounds[index % backgrounds.length]}
                        onClick={() => navigate(`/clubs/${club.name}`)}
                      />
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Clubs;
