import { Box, Card, CardContent, Typography } from "@mui/material";

const EventGrid = ({ events }) => (
  <Box sx={{ p: 3, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 3 }}>
    {events.map((event, index) => (
      <Card key={index} sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" color="primary">{event.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {event.date}
          </Typography>
          <Typography variant="body1">{event.description}</Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
);

export default EventGrid;
