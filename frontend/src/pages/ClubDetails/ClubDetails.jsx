import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  useTheme,
} from "@mui/material";
import { IoArrowBack } from "react-icons/io5";

const mockClubData = {
  "A Club": {
    description: "For coding, hackathons and tech events",
    events: ["Hackathon 2025", "Tech Quiz"],
    members: ["Chetan", "Vennela"],
  },
  "B Club": {
    description: "Music, Dance, and Arts Performances",
    events: ["Battle of Bands", "Dance Showdown"],
    members: ["Varun", "Harsha"],
  },
  "C Club": {
    description: "Debates, Elocutions, and Book Readings",
    events: ["Debate Night", "Open Mic"],
    members: ["Suneetha mam"],
  },
};

const ClubDetails = () => {
  const { clubName } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const club = mockClubData[clubName];

  // Modal States
  const [openEventModal, setOpenEventModal] = useState(false);
  const [openMemberModal, setOpenMemberModal] = useState(false);

  if (!club) {
    return (
      <Box p={4}>
        <Typography variant="h4" color="error">
          Club not found!
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={5} sx={{ bgcolor: "#f9fafe", minHeight: "100vh" }}>
      <Button
        onClick={() => navigate(-1)}
        startIcon={<IoArrowBack />}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back
      </Button>

      <Typography variant="h3" fontWeight={700} color="primary" mb={1}>
        {clubName}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        {club.description}
      </Typography>

      {/* Events */}
      <Card sx={{ mb: 4, backgroundColor: "#fff", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} color="primary" mb={2}>
            Upcoming Events
          </Typography>
          {club.events.map((event, i) => (
            <Typography key={i} variant="body1" color="text.secondary" gutterBottom>
              • {event}
            </Typography>
          ))}
        </CardContent>
      </Card>

      {/* Members */}
      <Card sx={{ mb: 4, backgroundColor: "#fff", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} color="primary" mb={2}>
            Active Members
          </Typography>
          {club.members.map((member, i) => (
            <Typography key={i} variant="body1" color="text.secondary" gutterBottom>
              • {member}
            </Typography>
          ))}
        </CardContent>
      </Card>

      {/* Admin Controls */}
      <Box mt={3} display="flex" gap={2}>
        <Button variant="contained" color="primary" onClick={() => setOpenEventModal(true)}>
          Add Event
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setOpenMemberModal(true)}>
          Add Member
        </Button>
        <Button variant="outlined" color="error">
          Remove Member
        </Button>
      </Box>

      {/* Add Event Modal */}
      <Dialog open={openEventModal} onClose={() => setOpenEventModal(false)}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Event Name" />
          <TextField fullWidth margin="normal" label="Date" type="date" InputLabelProps={{ shrink: true }} />
          <TextField fullWidth margin="normal" label="Description" multiline rows={3} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEventModal(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Member Modal */}
      <Dialog open={openMemberModal} onClose={() => setOpenMemberModal(false)}>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Member Name" />
          <TextField fullWidth margin="normal" label="Email ID" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMemberModal(false)}>Cancel</Button>
          <Button variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClubDetails;
