// pages/Events/EventDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { IoArrowBack } from "react-icons/io5";
import rgukt from "@/assets/rgukt.jpg";

const mockEventData = {
  Event1: {
    title: "Event1",
    description: "Tech event for all CSE students.",
    details: "This is a technical gathering with talks on AI, ML, and competitive programming.",
  },
  Event2: {
    title: "Event2",
    description: "Farewell send-off to R19 batch.",
    details: "R19 batch farewell with speeches, performances, and photo sessions.",
  },
  Event3: {
    title: "Event3",
    description: "Abhiyanth cultural and tech fest of RGUKT RK Valley.",
    details: "A 3-day celebration with cultural programs, workshops, exhibitions, and competitions.",
  },
};

const EventDetails = () => {
  const { eventName } = useParams();
  const navigate = useNavigate();

  const event = mockEventData[eventName];

  if (!event) {
    return (
      <Box p={4}>
        <Typography variant="h4" color="error">
          Event not found!
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Button
        onClick={() => navigate(-1)}
        startIcon={<IoArrowBack />}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back
      </Button>

      <Card
        sx={{
          maxWidth: 800,
          margin: "auto",
          borderRadius: 4,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <CardMedia sx={{ height: 280 }} image={rgukt} title={event.title} />
        <CardContent>
          <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {event.description}
          </Typography>
          <Typography variant="body1" mt={2}>
            {event.details}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetails;
