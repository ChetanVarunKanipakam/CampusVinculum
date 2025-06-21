import React, { useState, useEffect } from "react";
import {
  Box, TextField, MenuItem, Button, Typography
} from "@mui/material";
import axios from "axios";

const AddClubMemberForm = () => {
  const [clubID, setClubID] = useState("");
  const [userID, setUserID] = useState("");
  const [role, setRole] = useState("Member");
  const [clubs, setClubs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchClubsAndUsers = async () => {
      const clubRes = await axios.get("/api/clubs");
      const userRes = await axios.get("/api/users");
      setClubs(clubRes.data);
      setUsers(userRes.data);
    };
    fetchClubsAndUsers();
  }, []);

  const handleAddMember = async () => {
    if (!clubID || !userID || !role) return;

    try {
      await axios.post("/api/clubMemberships", {
        clubID,
        userID,
        role,
        joinDate: new Date(),
      });
      alert("Member added to club!");
    } catch (err) {
      console.error(err);
      alert("Failed to add member.");
    }
  };

  return (
    <Box p={3} maxWidth={600}>
      <Typography variant="h5" mb={2}>Add Member to Club</Typography>
      <TextField
        select fullWidth label="Select Club" value={clubID}
        onChange={(e) => setClubID(e.target.value)}
        margin="normal"
      >
        {Array.isArray(clubs) && clubs.map((club) => (
          <MenuItem key={club._id} value={club._id}>{club.name}</MenuItem>
        ))}
      </TextField>

      <TextField
        select fullWidth label="Select User" value={userID}
        onChange={(e) => setUserID(e.target.value)}
        margin="normal"
      >
        {Array.isArray(users) && users.map((user) => (
          <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
        ))}
      </TextField>

      <TextField
        select fullWidth label="Role" value={role}
        onChange={(e) => setRole(e.target.value)}
        margin="normal"
      >
        {["Member", "StudentCoordinator", "FacultyCoordinator"].map((r) => (
          <MenuItem key={r} value={r}>{r}</MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleAddMember}>Add Member</Button>
    </Box>
  );
};

export default AddClubMemberForm;
