import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Toolbar } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GetUserData } from "../../utils/userApi";
import ClubHeader from "../../components/ClubDetails/ClubHeader";
import ClubSidebar from "../../components/ClubDetails/ClubSidebar";
import DiscussionPanel from "../../components/ClubDetails/DiscussionPanel";
import EventGrid from "../../components/ClubDetails/EventGrid";
import ClubMembersDialog from "../../components/ClubDetails/ClubMembersDialog";
import Discussions from "../Discussions/Discussions";

const ClubDetails = () => {
  const { clubName } = useParams();
  const [selectedTab, setSelectedTab] = useState("discussions");
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user,setUser]=useState([]);
  const [members, setMembers] = useState([]);

  const userDataCalling = async () => {
    setLoading(true)
     const data = await GetUserData();
     console.log("discussions",data);
    if (data) {
      setUser(data);
    }  
      setLoading(false); 
  };
    
  useEffect(()=>{
     userDataCalling()
  },[]);
  // Fetch club data from backend
  useEffect(() => {
    setLoading(true)
    const fetchClub = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clubs/name/${clubName}`);
        setClub(res.data); 
        // Expected shape: { description, events, members }
        const membersRes = await axios.get(`http://localhost:3000/api/clubMemberships/${res.data._id}`);
        setMembers(membersRes.data);
        console.log("DATA",membersRes)
      } catch (err) {
        console.error("Failed to fetch club:", err);
        setError("Club not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [clubName]);

  if (loading) {
    return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !club) {
    return (
      <Typography paddingTop={10} variant="h4" color="error">
        {error || "Club not found!"}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <ClubSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f9fafe", position: "relative", mt: 10 }}>
        <ClubHeader clubName={clubName} onOpenMembers={() => setOpenMemberModal(true)} />
        {selectedTab === "discussions" && (
          <Discussions username1={user.email} room1={clubName} joined1={true} isClub={true} />
        )}
        {selectedTab === "events" && <EventGrid events={club.events} />}
        <ClubMembersDialog
          open={openMemberModal}
          onClose={() => setOpenMemberModal(false)}
          members={members}
        />
      </Box>
    </Box>
  );
};

export default ClubDetails;
