import { useState, useEffect, useRef } from 'react';
import socket from '@/socket.js';
import PrivateChat from './PrivateChat.jsx';
import {
  Box, Typography, TextField, Button, IconButton, List,
  ListItem, ListItemText, Divider, Badge, Tooltip
} from '@mui/material';
import { Group, Brightness4, Brightness7 } from '@mui/icons-material';

export default function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);

  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState({});
  const [typingMsg, setTypingMsg] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const refEnd = useRef();
  const typingTimeout = useRef();

  useEffect(() => {
    socket.on('join_room', () => {});
    socket.on('load_history', msgs => setMessages(msgs));
    socket.on('receive_message', m => setMessages(prev => [...prev, m]));
    socket.on('user_joined', t => setMessages(prev => [...prev, { text: t, type: 'system' }]));
    socket.on('user_left', t => setMessages(prev => [...prev, { text: t, type: 'system' }]));
    socket.on('show_typing', m => setTypingMsg(m));
    socket.on('hide_typing', () => setTypingMsg(''));
    socket.on('update_user_list', ({users, onlineStatus}) => {
      setUsersInRoom(users);
      setOnlineStatus(onlineStatus);
    });
    return () => socket.removeAllListeners();
  }, []);

  useEffect(() => refEnd.current?.scrollIntoView({behavior:'smooth'}), [messages]);

  const joinRoom = () => {
    if (!username || !room) return;
    socket.emit('join_room', { username, room });
    setJoined(true);
  };

  const sendMessage = () => {
    if (!msg.trim()) return;
    socket.emit('send_message', { text: msg });
    setMsg('');
  };

  const onTyping = e => {
    setMsg(e.target.value);
    socket.emit('typing');
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => socket.emit('stop_typing'), 1000);
  };

  if (!joined) return (
    <Box minHeight="100vh" flex display="flex" alignItems="center" justifyContent="center" bgcolor={darkMode?'#222':'#f0f0f0'}>
      <Box p={4} bgcolor="#fff" borderRadius={2} boxShadow={3}>
        <Typography variant="h5" mb={2}>Join or Create Room</Typography>
        <TextField fullWidth label="Username" value={username} onChange={e => setUsername(e.target.value)} sx={{mb:2}} />
        <TextField fullWidth label="Room Name" value={room} onChange={e => setRoom(e.target.value)} sx={{mb:2}} />
        <Button variant="contained" onClick={joinRoom}>Join</Button>
        <Box mt={2}>
          <Tooltip title="Toggle theme">
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box height="calc(100vh - 64px)" display="flex" bgcolor={darkMode?'#222':'#eaeaea'}>
      {/* Sidebar */}
      <Box width={300} p={2} bgcolor={darkMode?'#333':'#fff'} borderRight="1px solid #888">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6"><Group/> Members</Typography>
          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {usersInRoom.map(u =>{ 
            {if(u===username){
              u="(you) "+u;
            }}
            return (
            <ListItem key={u} selected={u === selectedUser} onClick={() => setSelectedUser(u)}>
              <Badge color={onlineStatus[u] ? 'success' : 'default'} variant="dot" sx={{mr:1}}/>
              <ListItemText primary={u}/>
            </ListItem>
          )})}
        </List>
        {selectedUser && <Button fullWidth onClick={() => setSelectedUser(null)}>← Back</Button>}
      </Box>

      {/* Chat Area */}
      <Box flex={1} display="flex" flexDirection="column" p={2}>
        {selectedUser ? (
          <PrivateChat me={username} peer={selectedUser} />
        ) : (
          <>
            <Typography variant="h6" mb={1}>
              You: {username} | Room: {room}
            </Typography>
            <Box flex={1} overflow="auto">
              {messages.map((m,i) => (
                <Box key={i} display="flex" justifyContent={m.from === username ? 'flex-end' : 'flex-start'} mb={1}>
                  <Box p={1} borderRadius={2} bgcolor={m.type==='system'?'#fffae6': m.from===username? '#1976d2':'#ddd'} color={m.from===username?'#fff':'#000'} maxWidth="70%">
                    <Typography variant="body2">{m.text}</Typography>
                    {m.timestamp && <Typography variant="caption" display="block" textAlign="right">{m.timestamp}</Typography>}
                  </Box>
                </Box>
              ))}
              <div ref={refEnd} />
            </Box>
            {typingMsg && <Typography variant="caption" mb={1} color="#888">{typingMsg}</Typography>}
            <Box display="flex" mt={1}>
              <TextField fullWidth placeholder="Type your message..." value={msg} onChange={onTyping} onKeyDown={e => e.key==='Enter' && sendMessage()} />
              <Button variant="contained" onClick={sendMessage}>Send</Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
