// src/components/JoinRoomForm.jsx

import React from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Tooltip
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function JoinRoomForm({ username, room, darkMode, setUsername, setRoom, joinRoom, setDarkMode }) {
  const bgColor = darkMode ? '#121212' : '#f5f5f5';

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={bgColor}>
      <Box p={4} bgcolor={darkMode ? '#333' : '#fff'} borderRadius={2} boxShadow={4}>
        <Typography variant="h5" mb={2}>Join or Create Room</Typography>
        <TextField fullWidth label="Username" value={username} onChange={e => setUsername(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Room Name" value={room} onChange={e => setRoom(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" onClick={joinRoom} fullWidth>Join</Button>
        <Box mt={2} textAlign="center">
          <Tooltip title="Toggle theme">
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
