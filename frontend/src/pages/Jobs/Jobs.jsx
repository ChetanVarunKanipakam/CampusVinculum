import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SidebarMenu from "../../common/sidebar/Sidebar";
import NotificationButton from "../../common/NotificationButton/NotificationButton";

const jobPosts = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    description: "We’re hiring React devs with 2+ years experience.",
    location: "Bangalore, India",
    salary: "₹12–18 LPA",
    type: "Remote",
    alumni: {
      name: "Chitra Vennela",
      avatar: "https://i.pravatar.cc/150?img=1",
      batch: "2018",
    },
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "TCS",
    description:
      "We are looking for data scientists skilled in Python, ML, and statistical modeling.",
    location: "Hyderabad, India",
    salary: "₹10–15 LPA",
    type: "On-Site",
    alumni: {
      name: "Vennela Chitra",
      avatar: "https://i.pravatar.cc/150?img=4",
      batch: "2019",
    },
    logo: "https://1000logos.net/wp-content/uploads/2021/04/TCS-logo.png",
  },
];

const Jobs = () =>{
    return (<>
      <NotificationButton />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Box
          sx={{
            width: 240,
            bgcolor: "#f5f5f5",
            height: "100vh",
            flexShrink: 0,
          }}
        >
          <SidebarMenu />
        </Box>

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 5,
            overflowY: "auto",
            bgcolor: "f0f0fa",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            color="primary"
            mb={4}
          >
            Job Postings by Alumni
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              justifyContent: "center",
            }}
          >
            {jobPosts.map((job) => (
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
                  avatar={<Avatar src={job.alumni.avatar} />}
                  title={job.alumni.name}
                  subheader={`Batch of ${job.alumni.batch}`}
                />
                <Box
                  sx={{
                    px: 3,
                    pt: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Avatar
                    src={job.logo}
                    alt={job.company}
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {job.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {job.company}
                    </Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="body2" mb={2}>
                    {job.description}
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                    <Chip
                      icon={<LocationOnIcon />}
                      label={job.location}
                      color="info"
                      size="small"
                    />
                    <Chip
                      icon={<WorkIcon />}
                      label={job.type}
                      color="primary"
                      size="small"
                    />
                    <Chip
                      icon={<CurrencyRupeeIcon />}
                      label={job.salary}
                      color="success"
                      size="small"
                    />
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

        </>);
}

export default Jobs;