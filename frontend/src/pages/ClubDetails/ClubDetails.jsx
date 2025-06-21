import React, { useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ClubHeader from "../../components/ClubDetails/ClubHeader";
import ClubSidebar from "../../components/ClubDetails/ClubSidebar";
import DiscussionPanel from "../../components/ClubDetails/DiscussionPanel";
import EventGrid from "../../components/ClubDetails/EventGrid";
import ClubMembersDialog from "../../components/ClubDetails/ClubMembersDialog";
import Discussions from "../Discussions/Discussions";


const mockClubData = {
  CodeVerse: {
    description: "Code & compete.",
    events: [
      { title: "Hack Sprint", description: "Rapid coding contest", date: "2025-07-12" },
      { title: "Code Golf", description: "Minimalist coding challenge", date: "2025-08-15" },
    ],
    members: ["Chetan", "Vennela", "Varun"],
  },
  GlobeTrotters: {
    description: "Wanderlust squad.",
    events: [
      { title: "Virtual World Tour", description: "Explore countries online", date: "2025-07-20" },
      { title: "Travel Trivia", description: "Test your geography knowledge", date: "2025-08-18" },
    ],
    members: ["Neha", "Ravi", "Ankit"],
  },
  FitNation: {
    description: "Health and strength.",
    events: [
      { title: "Fitness Challenge", description: "30-day workout", date: "2025-07-25" },
      { title: "Nutrition 101", description: "Healthy eating talk", date: "2025-08-10" },
    ],
    members: ["Asha", "Sai", "Deepak"],
  },
  PixelPioneers: {
    description: "Design & creativity.",
    events: [
      { title: "Poster Jam", description: "Design competition", date: "2025-07-30" },
      { title: "UI/UX Bootcamp", description: "Hands-on workshop", date: "2025-08-22" },
    ],
    members: ["Riya", "Manoj", "Tina"],
  },
  EcoSphere: {
    description: "Green & sustainable living.",
    events: [
      { title: "Tree Plantation", description: "Campus greening drive", date: "2025-07-15" },
      { title: "EcoTalk", description: "Talk on sustainability", date: "2025-08-05" },
    ],
    members: ["Hari", "Lavanya", "Ramesh"],
  },
  BizCatalyst: {
    description: "Entrepreneurship hub.",
    events: [
      { title: "Startup Pitch", description: "Business ideas showcase", date: "2025-07-18" },
      { title: "Fundamentals of Biz", description: "Entrepreneurship workshop", date: "2025-08-09" },
    ],
    members: ["Sonia", "Karthik", "Megha"],
  },
  CineSoc: {
    description: "Film & short stories.",
    events: [
      { title: "Short Film Fest", description: "Student-made movies", date: "2025-07-28" },
      { title: "Script & Screen", description: "Writing for film", date: "2025-08-12" },
    ],
    members: ["Nikhil", "Preethi", "Zara"],
  },
  QuantumQuill: {
    description: "Writing magic.",
    events: [
      { title: "Poetry Night", description: "Open mic event", date: "2025-07-16" },
      { title: "StoryCraft", description: "Creative writing workshop", date: "2025-08-03" },
    ],
    members: ["Aryan", "Divya", "Ishaan"],
  },
  MindScape: {
    description: "Mental wellness zone.",
    events: [
      { title: "Meditation Hour", description: "Guided session", date: "2025-07-22" },
      { title: "Mental Health Talk", description: "Awareness program", date: "2025-08-17" },
    ],
    members: ["Shruti", "Rahul", "Sneha"],
  },
  StageStorm: {
    description: "Performing arts club.",
    events: [
      { title: "Drama Night", description: "Stage play performances", date: "2025-07-19" },
      { title: "Open Stage", description: "Show your talent", date: "2025-08-08" },
    ],
    members: ["Aman", "Sanjana", "Vinay"],
  },
  PolyRhythm: {
    description: "Rhythms & beats.",
    events: [
      { title: "Drum Circle", description: "Percussion jam", date: "2025-07-24" },
      { title: "Beat Battle", description: "Music showdown", date: "2025-08-14" },
    ],
    members: ["Harsh", "Meera", "Yusuf"],
  },
  TravelTales: {
    description: "Adventures & cultures.",
    events: [
      { title: "Culture Day", description: "Dress and cuisine showcase", date: "2025-07-27" },
      { title: "Story Behind a City", description: "Travelogues", date: "2025-08-19" },
    ],
    members: ["Aarti", "Mohit", "Shreya"],
  },
};


const ClubDetails = () => {
  const { clubName } = useParams();
  const [selectedTab, setSelectedTab] = useState("discussions");
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "Chetan", text: "Are we ready for the Hackathon?", align: "left" },
    { sender: "Vennela", text: "Yes! Let’s finalize the ideas.", align: "right" },
  ]);
  console.log(clubName);
  const club = mockClubData[clubName] || null;
  if (!club) return <Typography paddingTop={10} variant="h4" color="error">Club not found!</Typography>;

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: "You", text: message, align: "right" }]);
      setMessage("");
    }
  };

  return (
    // <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
    //   <ClubSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    //   <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f9fafe", position: "relative", mt: 10 }}>
    //     <ClubHeader clubName={clubName} onOpenMembers={() => setOpenMemberModal(true)} />
    //     <Toolbar />
    //     {selectedTab === "discussions" && (
          <Discussions username1={"vennela"} room1={clubName} joined1={true}/>
    //     )}
    //     {selectedTab === "events" && <EventGrid events={club.events} />}
    //     <ClubMembersDialog open={openMemberModal} onClose={() => setOpenMemberModal(false)} members={club.members} />
    //   </Box>
    // </Box>
  );
};

export default ClubDetails;
