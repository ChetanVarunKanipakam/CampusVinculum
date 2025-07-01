import React,{useState,useEffect} from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Container,
} from '@mui/material';
import axios from "axios";
import { GetUserData } from "../../utils/userApi";

const AluminiJobs = ()=>{
  const token=localStorage.getItem("campusvinculum");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    companyName: '',
    location: '',
    postedBy: '', // ObjectId string of alumni
    applicationDeadline: "29-06-2025",
  });
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(true);

  const userDataCalling = async () => {
      const data = await GetUserData();
      console.log(data);
      setUserData(data);
      setLoading(false);
    };
  
    useEffect(() => {
      userDataCalling();
    }, []);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(loading){
        alert("fetching user please wait");
      }
      formData.postedBy=userData.roleDetails._id;
      const res = await axios.post('http://localhost:3000/api/jobPostings', formData,{ headers: { Authorization: `Bearer ${token}` } });
      alert('Job posted successfully');
    } catch (err) {
      console.error(err);
      alert('Error posting job');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Post a Job
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Job Title"
          name="title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Company Name"
          name="companyName"
          fullWidth
          margin="normal"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          margin="normal"
          value={formData.location}
          onChange={handleChange}
          required
        />

        
 
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Submit Job
        </Button>
      </Box>
    </Container>
  );

}

export default AluminiJobs;