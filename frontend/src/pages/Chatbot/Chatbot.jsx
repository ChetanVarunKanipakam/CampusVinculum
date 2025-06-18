import SidebarMenu from "../../common/sidebar/Sidebar";
import React, { useState,useEffect,useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import { apiRoutes } from "@/utils/apiRoutes";
import axios from "axios";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const formatResponse = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\n/g, "<br />")                          // New lines
      .replace(/\* (.*?)\n/g, "<li>$1</li>")             // Bullet points
      .replace(/(#+) (.*?)\n/g, "<h3>$2</h3>");          // Headings (optional)
  };
  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    const newMessage = { type: "user", text: prompt };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const response = await axios.post(apiRoutes.chatbotURI, { query: prompt });

      const data =response.data;
      console.log(response.data);
      const botReply = {
        type: "bot",
        text: data.responseText || "No response."
      };

      setMessages((prev) => [...prev, botReply]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "⚠️ Error connecting to server." },
      ]);
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendPrompt();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
     < Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, bgcolor: "#f5f5f5", height: "100vh", flexShrink: 0 }}>
        <SidebarMenu />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          mt: 5,
          overflowY: "auto",
          bgcolor: "#f0f0fa",
        }}
      >
    <Box p={2} bgcolor="#f8f9fa" borderBottom="1px solid #ccc">
        <Typography variant="h4" fontWeight={700} color="primary" display="flex" alignItems="center">
          <ChatIcon sx={{ mr: 1 }} /> CampusVinculum Chatbot
        </Typography>
      </Box>
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}

      {/* Chat Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          px: 3,
          py: 2,
          bgcolor: "#f0f2f5",
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{ justifyContent: msg.type === "user" ? "flex-end" : "flex-start" }}
            >
              <Card
                sx={{
                  maxWidth: "70%",
                  bgcolor: msg.type === "user" ? "#e3f2fd" : "#e8f5e9",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="body1">{msg.text}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
          <div ref={chatEndRef} />
        </List>
      </Box>

      {/* Fixed Input */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          p: 2,
          bgcolor: "#fff",
          borderTop: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton color="primary" onClick={sendPrompt} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
    </Box>
    </Box>
  );
};

export default Chatbot;
