import React from "react";
import SidebarMenu from "../../common/Sidebar/Sidebar";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import NotificationButton from "../../common/NotificationButton/NotificationButton";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();

  const events = [
    {
      name: "Tech Conference",
      description: "AI, ML, Competitive Programming Talks",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      name: "Farewell R19",
      description: "Speeches, performances, and memories",
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6",
    },
    {
      name: "Abhiyanth Fest",
      description: "Cultural + Technical Extravaganza",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    },
  ];

  return (
    <>
    <div className="animate-fade-in duration-500">
      <NotificationButton />
      <Box sx={{ width: "100%", maxWidth: "100%", px: { xs: 2, md: 6 }, py: 4 }}>
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, ml: { md: 2 } }}>
          <Typography
            variant="h4"
            color="primary"
            fontWeight={700}
            textAlign="center"
            mb={4}
            sx={{ letterSpacing: 1 }}
          >
            Upcoming Events
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {events.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={6}
                  onClick={() => navigate(`/events/${event.name}`)}
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`${event.image}?auto=format&fit=crop&w=600&q=80`}
                    alt={event.name}
                    sx={{
                      height: 250,
                      objectFit: "cover",
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          color: "#fff",
                          width: 40,
                          height: 40,
                        }}
                      >
                        <GroupWorkIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="h6" fontWeight={600} ml={2}>
                        {event.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                  <Box px={2} pb={2}>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      </div>
    </>
  );
};

export default Events;
