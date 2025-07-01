import React, { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, CardHeader,
  Avatar, Button, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, ListItemButton
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const getAlumniJobs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/jobPostings/all');
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.error("Error fetching jobs:", err);
        return [];
      }
    };
    const fetchJobs = async () => {
      const data = await getAlumniJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleAlumniClick = (alumni) => {
    setSelectedAlumni(alumni);
    setDialogOpen(true);
  };

  const handleChatConfirm = () => {
    if (selectedAlumni) {
      navigate("/discussions", {
        state: {
          peerEmail: selectedAlumni.email,
          peerName: selectedAlumni.name
        }
      });
    }
    setDialogOpen(false);
  };

  return (
    <div className="animate-fade-in duration-500">
      <NotificationButton />
      <Box sx={{ width: "100%", px: { xs: 2, md: 6 }, py: 4 }}>
        <Box sx={{ p: 5, overflowY: "auto", bgcolor: "#f0f0fa" }}>
          <Typography variant="h4" fontWeight={700} textAlign="center" color="primary" mb={4}>
            Job Postings by Alumni
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
            {jobs.map((job) => (
              <Card
                key={job.id}
                sx={{
                  width: 360,
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 4,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardHeader
                  title={
                    <Typography
                      onClick={() => handleAlumniClick(job.postedBy)}
                      sx={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      {job.postedBy.userID.name}
                    </Typography>
                  }
                />
                <Box sx={{ px: 3, pt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar src={job.logo} alt={job.companyName} variant="rounded" sx={{ width: 48, height: 48 }} />
                  <Box>
                    <Typography variant="h6" fontWeight={600}>{job.title}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">{job.companyName}</Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="body2" mb={2}>{job.description}</Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                    <Chip icon={<LocationOnIcon />} label={job.location} color="info" size="small" />
                    {/* <Chip icon={<CurrencyRupeeIcon />} label={job.salary} color="success" size="small" /> */}
                  </Box>
                  <Button fullWidth variant="contained" color="primary">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Start Private Chat</DialogTitle>
        <DialogContent>
          Would you like to start a private chat with <strong>{selectedAlumni?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleChatConfirm}>Start Chat</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Jobs;
