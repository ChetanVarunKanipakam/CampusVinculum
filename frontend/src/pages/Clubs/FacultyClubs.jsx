import React, { useState,useEffect } from "react";
import {
  Box, Typography, Grid, InputBase, IconButton, Button
} from "@mui/material";
import SidebarMenu from "../../common/Sidebar/FacultySidebar.jsx";
import NotificationButton from "../../common/NotificationButton/NotificationButton.jsx";
import SearchIcon from "@mui/icons-material/Search";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AddClubMemberForm from "../../components/Club/AddClubMemberForm.jsx";
import CreateClubForm from "../../components/Club/CreateClubForm.jsx";
import axios from "axios";
import { GetUserData } from "../../utils/userApi.js";

// Placeholder data
const facultyClubs = [
  { name: "Faculty Tech Forum", description: "Discuss innovations & research." },
  { name: "EduLeaders", description: "Academic leadership hub." },
  { name: "Research Syndicate", description: "Faculty research collaboration." },
  { name: "Faculty Wellness", description: "Health and wellbeing community." }
];

const cardBackgrounds = [
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1581090700227-1e8a24f74d04"
];

const FacultyClubCard = ({ club, onClick, background }) => (
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

const FacultyClubs = () => {
  const [search, setSearch] = useState("");
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();
    const [user,setUser]=useState(null);
  
   const userDataCalling = async () => {
  const data = await GetUserData();
  console.log(data);
  setUser(data);

  if (data?.email) {
    fetchFacultyClubs(data.email);
  }
};

const fetchFacultyClubs = async (username) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/clubs/${username}`);
    setClubs(res.data.clubs || []);
  } catch (error) {
    console.error("Failed to fetch faculty clubs", error);
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
              placeholder="Search faculty clubs..."
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
            Faculty Clubs
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {filtered.map((club, i) => (
              <Grid item key={i}>
                <FacultyClubCard
                  club={club}
                  background={cardBackgrounds[i % cardBackgrounds.length]}
                  onClick={() => navigate(`/clubs/${club.name}`)}
                />
              </Grid>
            ))}
          </Grid>
          {/* Create/Add Buttons */}
          <Box display="flex" justifyContent="center" gap={2} mb={4}>
            <CreateClubForm />
            <AddClubMemberForm />
          </Box>

        </Box>
  
    </>
  );
};

export default FacultyClubs;
