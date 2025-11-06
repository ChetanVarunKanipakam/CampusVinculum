import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, TextField, Table, TableHead, TableRow, TableCell,
  TableBody, Pagination, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, MenuItem
} from '@mui/material';

const PAGE_SIZE = 5;
const roles = ["Student", "Faculty", "Admin", "Alumni"];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [curUser, setCurUser] = useState({
    name: '', email: '', password: '', role: 'Student', departmentID: ''
  });

  const fetchUsers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
      params: { q, page, limit: PAGE_SIZE }
    });
    setUsers(res.data.items || []);
    setTotal(res.data.total || 0);
    console.log(res.data)
  };

  const fetchDepartments = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/departments`);
    const data = Array.isArray(res.data) ? res.data : res.data.items || [];
    setDepartments(data.items || data); // support for paginated or direct list
  };

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, [q, page]);

  const handleAddUser = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, curUser);
    setOpenAdd(false);
    fetchUsers();
  };

  const handleUpdateUser = async () => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${curUser._id}`, curUser);
    setOpenEdit(false);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
    fetchUsers();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          value={q}
          onChange={e => { setQ(e.target.value); setPage(1); }}
          sx={{ width: '50%' }}
        />
        <Button variant="contained" onClick={() => {
          setCurUser({ name: '', email: '', password: '', role: 'Student', departmentID: '' });
          setOpenAdd(true);
        }}>
          Add User
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.departmentID?.name || '-'}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  onClick={() => { setCurUser(user); setOpenEdit(true); }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        count={Math.ceil(total / PAGE_SIZE)}
        page={page}
        onChange={(_, val) => setPage(val)}
        sx={{ mt: 2 }}
      />

      {/* Add User Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense"
            value={curUser.name} onChange={e => setCurUser({ ...curUser, name: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense"
            value={curUser.email} onChange={e => setCurUser({ ...curUser, email: e.target.value })} />
          <TextField label="Password" fullWidth margin="dense" type="password"
            value={curUser.password} onChange={e => setCurUser({ ...curUser, password: e.target.value })} />
          <TextField select label="Role" fullWidth margin="dense"
            value={curUser.role} onChange={e => setCurUser({ ...curUser, role: e.target.value })}>
            {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </TextField>
          <TextField select label="Department" fullWidth margin="dense"
            value={curUser.departmentID}
            onChange={e => setCurUser({ ...curUser, departmentID: e.target.value })}>
            {departments.map(d => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)}
          </TextField>

          {/* Conditional Role Fields */}
          {curUser.role === "Student" && <>
            <TextField label="Roll Number" fullWidth margin="dense"
              value={curUser.rollNumber || ''} onChange={e => setCurUser({ ...curUser, rollNumber: e.target.value })} />
            <TextField label="Year" type="number" fullWidth margin="dense"
              value={curUser.year || ''} onChange={e => setCurUser({ ...curUser, year: e.target.value })} />
            <TextField label="Section" fullWidth margin="dense"
              value={curUser.section || ''} onChange={e => setCurUser({ ...curUser, section: e.target.value })} />
          </>}

          {curUser.role === "Faculty" && <>
            <TextField label="Designation" fullWidth margin="dense"
              value={curUser.designation || ''} onChange={e => setCurUser({ ...curUser, designation: e.target.value })} />
            <TextField label="Qualifications" fullWidth margin="dense"
              value={curUser.qualifications || ''} onChange={e => setCurUser({ ...curUser, qualifications: e.target.value })} />
            <TextField label="Experience (Years)" type="number" fullWidth margin="dense"
              value={curUser.experienceYears || ''} onChange={e => setCurUser({ ...curUser, experienceYears: e.target.value })} />
          </>}

          {curUser.role === "Admin" && <>
            <TextField label="Designation" fullWidth margin="dense"
              value={curUser.designation || ''} onChange={e => setCurUser({ ...curUser, designation: e.target.value })} />
          </>}

          {curUser.role === "Alumni" && <>
            <TextField label="Graduation Year" type="number" fullWidth margin="dense"
              value={curUser.graduationYear || ''} onChange={e => setCurUser({ ...curUser, graduationYear: e.target.value })} />
            <TextField label="Current Position" fullWidth margin="dense"
              value={curUser.currentPosition || ''} onChange={e => setCurUser({ ...curUser, currentPosition: e.target.value })} />
            <TextField label="Company" fullWidth margin="dense"
              value={curUser.company || ''} onChange={e => setCurUser({ ...curUser, company: e.target.value })} />
            <TextField label="LinkedIn Profile" fullWidth margin="dense"
              value={curUser.linkedInProfile || ''} onChange={e => setCurUser({ ...curUser, linkedInProfile: e.target.value })} />
          </>}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAddUser}>Save</Button>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense"
            value={curUser.name} onChange={e => setCurUser({ ...curUser, name: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense"
            value={curUser.email} onChange={e => setCurUser({ ...curUser, email: e.target.value })} />
          <TextField select label="Role" fullWidth margin="dense"
            value={curUser.role} onChange={e => setCurUser({ ...curUser, role: e.target.value })}>
            {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </TextField>
          <TextField select label="Department" fullWidth margin="dense"
            value={curUser.departmentID}
            onChange={e => setCurUser({ ...curUser, departmentID: e.target.value })}>
            {departments.map(d => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateUser}>Update</Button>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
