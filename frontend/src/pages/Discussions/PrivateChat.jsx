import { useEffect, useState, useRef } from 'react';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';
import socket from '@/socket.js';

export default function PrivateChat({ me, peer }) {
  const [history, setHistory] = useState([]);
  const [txt, setTxt] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!peer) return;
    (async () => {
      const res = await fetch('http://localhost:3000/private_history', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ between: { userA: me, userB: peer } })
      });
      const data = await res.json();
      setHistory(data);
      setTxt('');
    })();
  }, [peer, me]);

  useEffect(() => {
    const handler = (m) => {
      if (m.private && ((m.from === peer && m.to === me) || (m.from === me && m.to === peer))) {
        setHistory((h) => [...h, m]);
      }
    };
    socket.on('receive_private_message', handler);
    return () => socket.off('receive_private_message', handler);
  }, [peer, me]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const send = () => {
    if (!txt.trim()) return;
    const msg = { from: me, to: peer, text: txt };
    socket.emit('private_message', msg);
    setHistory((h) => [...h, { ...msg, timestamp: new Date().toLocaleTimeString(), private: true }]);
    setTxt('');
  };

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box flex={1} overflow="auto" mb={1}>
        {history.map((m, i) => (
          <Box key={i} display="flex" justifyContent={m.from === me ? 'flex-end' : 'flex-start'}>
            <Paper sx={{ p:1, mb:1, maxWidth:'70%' }}>
              <Typography>{m.text}</Typography>
              <Typography variant="caption" display="block">{m.timestamp}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={bottomRef} />
      </Box>
      <Box display="flex">
        <TextField fullWidth value={txt} onChange={(e)=>setTxt(e.target.value)} onKeyDown={(e)=>e.key==='Enter'&&send()} />
        <Button onClick={send}>Send</Button>
      </Box>
    </Box>
  );
}
