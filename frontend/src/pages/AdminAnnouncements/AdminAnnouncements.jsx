import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, TextField, MenuItem, Button, Table, TableHead,
  TableRow, TableCell, TableBody
} from '@mui/material';

const audiences = ["Student", "Faculty", "Admin", "Alumni"];

export default function AnnouncementsPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title: '', content: '', targetAudience: 'Student'
  });

  const fetch = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/announcements`);
  const announcements = Array.isArray(res.data)
    ? res.data
    : res.data.announcements || [];

  setList(announcements);
};


  useEffect(() => { fetch(); }, []);

  const handleSubmit = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/announcements `, form);
    fetch();
    setForm({ title: '', content: '', targetAudience: 'Student' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/announcements/${id}`);
    fetch();
  };

  return (
    <Box>
      <Box component="form" display="flex" flexDirection="column" sx={{ mb: 3, maxWidth: 600 }}>
        <TextField
          label="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Content"
          multiline rows={3}
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Audience"
          value={form.targetAudience}
          onChange={e => setForm({ ...form, targetAudience: e.target.value })}
          sx={{ mb: 2 }}
        >
          {audiences.map(a => (
            <MenuItem key={a} value={a}>{a}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleSubmit}>Post Announcement</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Audience</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(a => (
            <TableRow key={a._id}>
              <TableCell>{a.title}</TableCell>
              <TableCell>{a.targetAudience}</TableCell>
              <TableCell>{new Date(a.postedDate).toLocaleString()}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => handleDelete(a._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
