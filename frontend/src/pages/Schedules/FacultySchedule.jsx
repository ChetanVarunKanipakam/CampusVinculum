import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Timetable from "./TimetableSchedule.jsx";
import ExamSchedule from "./ExamSchedule.jsx";
import SidebarMenu from "../../common/Sidebar/FacultySidebar.jsx";
import NotificationButton from "../../common/NotificationButton/NotificationButton.jsx";

const FacultySchedules = () => {
  const [tab, setTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openTimetableModal, setOpenTimetableModal] = useState(false);
  const [openExamModal, setOpenExamModal] = useState(false);

  const handleTabChange = (_, newValue) => setTab(newValue);

  return (
    <>
      <NotificationButton />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Box sx={{ width: 240, bgcolor: "#f5f5f5", height: "100vh", flexShrink: 0 }}>
          <SidebarMenu />
        </Box>

        <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto", bgcolor: "#f4f8ff" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" fontWeight={700} color="primary">
              Faculty Schedules
            </Typography>
            <Box display="flex" gap={2}>
              <Button variant="outlined" onClick={() => setOpenTimetableModal(true)}>
                Add Timetable
              </Button>
              <Button variant="contained" onClick={() => setOpenExamModal(true)}>
                Add Exam Schedule
              </Button>
            </Box>
          </Box>

          <Box mb={2}>
            <TextField
              placeholder="Search by subject..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Tabs value={tab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" sx={{ mb: 3 }}>
            <Tab label="Class Timetable" />
            <Tab label="Exam Schedule" />
          </Tabs>

          {tab === 0 && <Timetable search={searchTerm} />}
          {tab === 1 && <ExamSchedule search={searchTerm} />}
        </Box>
      </Box>

      {/* Timetable Modal */}
      <Modal open={openTimetableModal} onClose={() => setOpenTimetableModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Post New Timetable Entry</Typography>
          <TextField label="Course" fullWidth margin="normal" />
          <TextField label="Day" fullWidth margin="normal" />
          <TextField label="Start Time" fullWidth margin="normal" />
          <TextField label="End Time" fullWidth margin="normal" />
          <TextField label="Room" fullWidth margin="normal" />
          <Box mt={2}>
            <Button variant="contained">Submit</Button>
          </Box>
        </Box>
      </Modal>

      {/* Exam Modal */}
      <Modal open={openExamModal} onClose={() => setOpenExamModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Post New Exam Schedule</Typography>
          <TextField label="Course" fullWidth margin="normal" />
          <TextField label="Exam Type" fullWidth margin="normal" />
          <TextField label="Date" fullWidth margin="normal" />
          <TextField label="Start Time" fullWidth margin="normal" />
          <TextField label="End Time" fullWidth margin="normal" />
          <TextField label="Venue" fullWidth margin="normal" />
          <Box mt={2}>
            <Button variant="contained">Submit</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 400,
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  p: 4,
  borderRadius: 3,
  boxShadow: 24,
};

export default FacultySchedules;
