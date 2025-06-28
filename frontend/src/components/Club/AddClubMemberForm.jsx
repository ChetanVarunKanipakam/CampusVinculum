import React, { useState, useEffect } from "react";
import {
  Box, TextField, Button, Typography, MenuItem
} from "@mui/material";
import axios from "axios";
import { GetUserData } from "../../utils/userApi";

const AddClubMemberForm = () => {
  const [clubName, setClubName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDataCalling = async () => {
      const data = await GetUserData();
      console.log(data);
      setUser(data);
    };
    userDataCalling();
  }, []);

  const handleAddMember = async () => {
    if (!clubName || !userEmail || !role) return alert("All fields are required.");

    try {
      // Step 1: Get Club ID from club name
      const clubRes = await axios.get(`http://localhost:3000/api/clubs/name/${clubName}`);
      const club = clubRes.data;

      if (!club || !club._id) return alert("Club not found.");

      // Step 2: Get User ID from email
      
      await axios.post("http://localhost:3000/api/clubMemberships", {
        clubID: club._id,
        user: user.email,
        role,
        joinDate: new Date(),
      });

      alert("Member added to club!");
      setClubName("");
      setUserEmail("");
      setRole("Member");
    } catch (err) {
      console.error(err);
      alert("Failed to add member.");
    }
  };

  return (
    <Box p={3} maxWidth={600}>
      <Typography variant="h5" mb={2}>Add Member to Club</Typography>

      <TextField
        fullWidth
        label="Club Name"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="User Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        margin="normal"
      />

      <TextField
        select
        fullWidth
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        margin="normal"
      >
        {["Member", "StudentCoordinator", "FacultyCoordinator"].map((r) => (
          <MenuItem key={r} value={r}>{r}</MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleAddMember}>
        Add Member
      </Button>
    </Box>
  );
};

export default AddClubMemberForm;
