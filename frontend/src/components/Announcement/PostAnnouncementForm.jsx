import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";

const targetOptions = ["Student", "Faculty", "Admin", "Alumni"];

const PostAnnouncementForm = () => {
  const [announcement, setAnnouncement] = useState({
    title: "",
    content: "",
    targetAudience: "Student",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnnouncement = {
      ...announcement,
      postedDate: new Date(),
    };

    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnnouncement),
      });

      if (res.ok) {
        setSuccess(true);
        setAnnouncement({ title: "", content: "", targetAudience: "Student" });
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 4, borderRadius: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
        Post New Announcement
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={announcement.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Content"
          name="content"
          value={announcement.content}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />

        <TextField
          label="Target Audience"
          name="targetAudience"
          select
          value={announcement.targetAudience}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {targetOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" type="submit">
            Post Announcement
          </Button>
        </Box>
      </form>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Announcement posted successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
        <Alert severity="error" onClose={() => setError(false)}>
          Failed to post announcement.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PostAnnouncementForm;
