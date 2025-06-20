import { Box, Typography, TextField, Button, Paper } from "@mui/material";

const DiscussionPanel = ({ messages, message, setMessage, handleSendMessage }) => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 128px)", px: 3, pt: 1 }}>
    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
      Welcome to the group! Discuss your thoughts.
    </Typography>

    <Box sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2, pb: 2 }}>
      {messages.map((msg, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            p: 1.5,
            bgcolor: msg.align === "right" ? "#fff8dc" : "#e0f7fa",
            maxWidth: "60%",
            alignSelf: msg.align === "right" ? "flex-end" : "flex-start",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2">
            <strong>{msg.sender}:</strong> {msg.text}
          </Typography>
        </Paper>
      ))}
    </Box>

    <Box sx={{ display: "flex", mt: "auto", pb: 2 }}>
      <TextField
        fullWidth
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <Button variant="contained" sx={{ ml: 1 }} onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  </Box>
);

export default DiscussionPanel;
