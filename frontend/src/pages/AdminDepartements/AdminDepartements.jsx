import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, TextField, Button, Table, TableBody, TableCell, TableHead,
  TableRow, Pagination, Dialog, DialogTitle, DialogContent,
  DialogActions, Typography
} from '@mui/material';

const PAGE_SIZE = 5;

export default function DepartmentsPage() {
  const [depts, setDepts] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [curDept, setCurDept] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });

  const fetch = async () => {
    const { data } = await axios.get('http://localhost:3000/api/departments', {
      params: { q, page, limit: PAGE_SIZE }
    });
    setDepts(data.items || []);
    setTotal(data.total || 0);
  };

  useEffect(() => { fetch(); }, [q, page]);

  const handleAdd = async () => {
    await axios.post('http://localhost:3000/api/departments', form);
    fetch();
    setOpenAdd(false);
    setForm({ name: '', description: '' });
  };

  const handleEdit = async () => {
    await axios.put(`http://localhost:3000/api/departments/${curDept._id}`, { description: form.description });
    fetch();
    setOpenEdit(false);
    setCurDept(null);
    setForm({ name: '', description: '' });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Search" value={q} onChange={e => { setQ(e.target.value); setPage(1); }} />
        <Button variant="contained" onClick={() => setOpenAdd(true)}>Add Department</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {depts.map(dept =>
            <TableRow key={dept._id}>
              <TableCell>{dept.name}</TableCell>
              <TableCell>{dept.description}</TableCell>
              <TableCell>
                <Button onClick={() => {
                  setCurDept(dept);
                  setForm({ name: dept.name, description: dept.description });
                  setOpenEdit(true);
                }}>Edit</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        count={Math.ceil(total / PAGE_SIZE)}
        page={page}
        onChange={(_, val) => setPage(val)}
        sx={{ mt: 2 }}
      />

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Department</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
          <TextField fullWidth margin="dense" label="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Save</Button>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Name: {curDept?.name}</Typography>
          <TextField fullWidth margin="dense" label="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit}>Update</Button>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
