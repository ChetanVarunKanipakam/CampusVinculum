import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, IconButton,
  Tooltip, Paper, List, ListItem, ListItemText,
  Divider, CircularProgress
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import axios from 'axios';

export default function JoinRoomForm({ username, room, setRoom, joinRoom, darkMode, setDarkMode }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const bgColor = darkMode ? '#121212' : '#f5f5f5';
  const boxColor = darkMode ? '#333' : '#fff';
  const textColor = darkMode ? '#fff' : '#000';

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clubs/rooms/${username}`);
        const normalRooms=res.data.normalRooms;
        console.log(normalRooms);
        setRooms(normalRooms);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    }
    if (username) fetchRooms();
  }, [username]);

  return (
    <Box minHeight="100vh" width="100%" display="flex" flexDirection="column" bgcolor={bgColor}>
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center" bgcolor={boxColor}>
        <Typography variant="h5" color={textColor}>Welcome, {username}</Typography>
        <Tooltip title="Toggle theme">
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Box>

      <Box flex={1} p={3} overflow="auto">
        {loading
          ? <CircularProgress />
          : (
            <Paper>
              <List>
                {rooms.map((r, index) => (
                  <React.Fragment key={index}>
                    <ListItem button onClick={() => {
                      setRoom(r);
                      joinRoom();
                    }}>
                      <ListItemText primary={r} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )
        }
      </Box>

      <Box p={2} bgcolor={boxColor}>
        <TextField fullWidth label="Room Name" value={room} onChange={e => setRoom(e.target.value)} />
        <Button variant="contained" fullWidth onClick={joinRoom} sx={{ mt: 1 }}>Create / Join</Button>
      </Box>
    </Box>
  );
}
