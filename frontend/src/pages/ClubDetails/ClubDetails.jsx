import React, { useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ClubHeader from "../../components/ClubDetails/ClubHeader";
import ClubSidebar from "../../components/ClubDetails/ClubSidebar";
import DiscussionPanel from "../../components/ClubDetails/DiscussionPanel";
import EventGrid from "../../components/ClubDetails/EventGrid";
import ClubMembersDialog from "../../components/ClubDetails/ClubMembersDialog";


const mockClubData = {
  "A Club": {
    description: "For coding, hackathons and tech events",
    events: [
      { title: "Hackathon 2025", description: "Annual coding competition", date: "2025-07-10" },
      { title: "Tech Quiz", description: "Tech Trivia Challenge", date: "2025-08-05" },
    ],
    members: ["Chetan", "Vennela", "Varun"],
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
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <ClubSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f9fafe", position: "relative", mt: 10 }}>
        <ClubHeader clubName={clubName} onOpenMembers={() => setOpenMemberModal(true)} />
        <Toolbar />
        {selectedTab === "discussions" && (
          <DiscussionPanel
            messages={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        )}
        {selectedTab === "events" && <EventGrid events={club.events} />}
        <ClubMembersDialog open={openMemberModal} onClose={() => setOpenMemberModal(false)} members={club.members} />
      </Box>
    </Box>
  );
};

export default ClubDetails;
