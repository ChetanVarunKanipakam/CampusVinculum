import React,{useState} from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Container,
} from '@mui/material';
import axios from "axios";

const AluminiJobs = ()=>{

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    companyName: '',
    location: '',
    postedBy: '', // ObjectId string of alumni
    applicationDeadline: "29-06-2025",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/jobPostings', formData);
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
        <TextField
          label="Alumni ID"
          name="postedBy"
          fullWidth
          margin="normal"
          value={formData.postedBy}
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