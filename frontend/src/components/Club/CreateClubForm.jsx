import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { GetUserData } from "../../utils/userApi";
import { useEffect } from "react";
const CreateClubForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user,setUser]=useState(null);

  const userDataCalling = async () => {
      
      let data =await GetUserData();
      console.log(data);
      setUser(data);
    };

  useEffect(()=>{
    userDataCalling()
},[]);

  const handleCreate = async () => {
    if (!name.trim() || !description.trim()) return;

    try {
      const createdDate = new Date();
    // Replace with actual admin ID (maybe from auth)
      
      await axios.post("http://localhost:3000/api/clubs", { name, description, createdDate, adminID: user._id });
      alert("Club created successfully!");
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating club:", error);
      alert("Error creating club.");
    }
  };

  return (
    <Box p={3} maxWidth={500}>
      <Typography variant="h5" mb={2}>Create New Club</Typography>
      <TextField fullWidth label="Club Name" value={name} onChange={e => setName(e.target.value)} margin="normal" />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        multiline
        rows={3}
        margin="normal"
      />
      <Button variant="contained" onClick={handleCreate}>Create Club</Button>
    </Box>
  );
};

export default CreateClubForm;
