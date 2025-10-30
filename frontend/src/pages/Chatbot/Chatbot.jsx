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

  function convertMarkdownToText(markdownText) {
  if (!markdownText) {
    return "";
  }

  let plainText = markdownText;

  // 1. Remove fenced code blocks (```...```)
  plainText = plainText.replace(/```[\s\S]*?```/g, '');

  // 2. Remove inline code (`...`)
  plainText = plainText.replace(/`([^`]+)`/g, '$1');

  // 3. Remove headings (e.g., ## 🚀 Title)
  // This removes the #, emojis, and leading spaces.
  plainText = plainText.replace(/^(#+\s*|🚀\s*|🔹\s*)/gm, '');

  // 4. Remove links, keeping only the link text
  // e.g., [Google](https://www.google.com) -> Google
  plainText = plainText.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // 5. Remove images, keeping only the alt text
  // e.g., ![alt text](image.png) -> alt text
  plainText = plainText.replace(/!\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // 6. Remove bold and italics
  // e.g., **bold**, *italic* -> bold, italic
  plainText = plainText.replace(/(\*\*|__)(.*?)\1/g, '$2');
  plainText = plainText.replace(/(\*|_)(.*?)\1/g, '$2');

  // 7. Remove list item markers
  // e.g., * item, - item, 1. item -> item
  plainText = plainText.replace(/^\s*[-*+]\s+|^\s*\d+\.\s+/gm, '');

  // 8. Remove blockquotes
  plainText = plainText.replace(/^>\s?/gm, '');

  // 9. Remove horizontal rules
  plainText = plainText.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '');

  // 10. A simple way to handle tables: remove pipes and header separators
  plainText = plainText.replace(/\|/g, ' '); // Replace pipes with spaces
  plainText = plainText.replace(/^[-|\s]+$/gm, ''); // Remove separator lines like |---|---|

  // 11. Clean up extra newlines
  plainText = plainText.replace(/\n{2,}/g, '\n\n');

  return plainText.trim();
}


  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    const newMessage = { type: "user", text: prompt };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const response = await axios.post(apiRoutes.chatbotURI, { query: prompt });

     const data = convertMarkdownToText(response.data.responseText);
      console.log(data);
      const botReply = {
        type: "bot",
        text: data || "No response."
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
     <Box sx={{ width: "100%", maxWidth: "100%", px: { xs: 2 }}}>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2 },
          mt: 5,
          overflowY: "auto",
          bgcolor: "#f0f0fa",
        }}
      >
    <Box p={2} bgcolor="#f8f9fa" borderBottom="1px solid #ccc" >
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
          bgcolor: "#f0f0fa",
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
      position: "fixed",
      bottom: 16, // 16px space from bottom
      left: {xs:10,md:"260px"}, // Adjust if Sidebar is 260px wide
      right: 16,
      zIndex: 1000,
      display: "flex",
      bgcolor: "#fff",
      boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
      borderRadius: "12px",
      p: 1,
      gap: 1,
      maxWidth: {xs:"100%",md:"calc(100% - 276px)"}, // Adjusted to leave room for sidebar
      margin: "0 auto",
    }}
  >
    <TextField
      fullWidth
      placeholder="Type your message..."
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      onKeyPress={handleKeyPress}
      size="small"
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: "8px",
          bgcolor: "#f5f5f5",
        },
      }}
    />
    <IconButton color="primary" onClick={sendPrompt} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : <SendIcon />}
    </IconButton>
  </Box></Box>
    </Box>
    </Box>
  );
};

export default Chatbot;
