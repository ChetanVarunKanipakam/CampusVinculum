import React, { useState,useEffect } from "react";
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
import SidebarMenu from "../../common/Sidebar/Sidebar";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { GetUserData } from "../../utils/userApi";

const icons = [
  <CodeIcon />, <PublicIcon />, <MusicNoteIcon />, <FitnessCenterIcon />,
  <BusinessCenterIcon />, <MovieIcon />, <CreateIcon />, <PsychologyIcon />,
  <MemoryIcon />, <TheaterComedyIcon />, <MusicNoteIcon />, <TravelExploreIcon />
];

const backgrounds = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c", // CodeVerse
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // GlobeTrotters
  "https://images.unsplash.com/photo-1554284126-aa88f22d8b74", // FitNation
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // PixelPioneers ✅
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", // EcoSphere
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf", // BizCatalyst ✅
  "https://images.unsplash.com/photo-1517602302552-471fe67acf66", // CineSoc
  "https://images.unsplash.com/photo-1557804506-669a67965ba0", // QuantumQuill ✅
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e", // MindScape ✅
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

const ClubCard = ({ club, onClick, background }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Box
      onClick={onClick}
      sx={{
        width: 280,
        height: 250,
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxShadow: 6,
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        {club.name}
      </Typography>
      <Typography variant="body2">{club.description}</Typography>
    </Box>
  </motion.div>
);

const Clubs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
    const [clubs, setClubs] = useState([]);
      const [user,setUser]=useState(null);
    
     const userDataCalling = async () => {
    const data = await GetUserData();
    console.log(data);
    setUser(data);
  
    if (data?.email) {
      fetchClubs(data.email);
    }
  };
  
  const fetchClubs = async (username) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubs/${encodeURIComponent(username)}`);
      console.log(res);
      setClubs(res.data.clubs || []);
      if(res.message){
        alert(res.message);
      }
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };
  
    
      useEffect(()=>{
        userDataCalling()
    },[]);
  
  
    
  
  
    const filtered = clubs.filter(
      c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );
  


  return (
    <>      
      <NotificationButton />
        {/* Main Content */}
        <Box flexGrow={1} p={5} sx={{ overflowY: 'auto', bgcolor: '#f0f4ff' }}>

          {/* Search Bar */}
          <Box display="flex" justifyContent="center" mb={4}>
            <InputBase
              placeholder="Search clubs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                px: 2, py: 1, width: 320,
                bgcolor: "white", borderRadius: 5,
                boxShadow: 2
              }}
              startAdornment={<IconButton><SearchIcon /></IconButton>}
            />
          </Box>

          
          {/* Club Cards */}
          <Typography variant="h4" textAlign="center" fontWeight={800} mb={3}>
           My Clubs
          </Typography>
          {!filtered?<h1>No clubs Joined..</h1>:
          <Grid container spacing={4} justifyContent="center">
            {filtered.map((club, i) => (
              <Grid item key={i}>
                <ClubCard
                  club={club}
                  background={backgrounds[i % backgrounds.length]}
                  onClick={() => navigate(`/clubs/${club.name}`)}
                />
              </Grid>
            ))}
          </Grid>}
        </Box>
    </>
  );
};

export default Clubs;
