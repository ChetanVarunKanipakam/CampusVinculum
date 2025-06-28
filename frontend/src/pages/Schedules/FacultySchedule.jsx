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
  Grid
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Timetable from "./TimetableSchedule.jsx";
import ExamSchedule from "./ExamSchedule.jsx";
import SidebarMenu from "../../common/Sidebar/FacultySidebar.jsx";
import NotificationButton from "../../common/NotificationButton/NotificationButton.jsx";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: "90vh",
  overflowY: "auto",
};

const defaultTimeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:15 - 12:15",
  "01:15 - 02:15",
  "02:15 - 03:15",
];
const defaultDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const FacultySchedules = () => {
  const [tab, setTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openTimetableModal, setOpenTimetableModal] = useState(false);
  const [openExamModal, setOpenExamModal] = useState(false);
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [subjects, setSubjects] = useState({});
  const [branch, setBranch] = useState("");
  const [examType, setExamType] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");


  const handleSubjectChange = (day, index, value) => {
    setSubjects(prev => ({
      ...prev,
      [day]: [
        ...(prev[day] || []).slice(0, index),
        value,
        ...(prev[day] || []).slice(index + 1)
      ]
    }));
  };

  const handleSubmit = async () => {
    const timetable = {};
    defaultDays.forEach(day => {
      timetable[day] = subjects[day] || Array(defaultTimeSlots.length).fill("--");
    });

    const payload = {
      branch,
      year: Number(year),
      section,
      timeSlots: defaultTimeSlots,
      days: defaultDays,
      timetable
    };

    try {
      await axios.post("http://localhost:3000/api/timetable", payload);
      alert("Timetable created successfully!");
      setBranch("");
      setYear("");
      setOpenExamModal(false);
    } catch (error) {
      console.error("Failed to post timetable:", error);
      alert("Error creating timetable.");
    }
  };

  

  const handleTabChange = (_, newValue) => setTab(newValue);

  return (
    <>
      <NotificationButton />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      

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
        <Typography variant="h6" mb={2}>Post New Timetable</Typography>

        {/* Branch, Year, Section */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="Branch" fullWidth value={branch} onChange={e => setBranch(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Year" type="number" fullWidth value={year} onChange={e => setYear(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Section" fullWidth value={section} onChange={e => setSection(e.target.value)} />
          </Grid>
        </Grid>

        {/* Subject Inputs for each day and time slot */}
        <Box mt={3}>
          {defaultDays.map((day) => (
            <Box key={day} mb={2}>
              <Typography fontWeight={600} mb={1}>{day}</Typography>
              <Grid container spacing={1}>
                {defaultTimeSlots.map((slot, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <TextField
                      size="small"
                      label={slot}
                      fullWidth
                      value={(subjects[day] && subjects[day][index]) || ""}
                      onChange={(e) => handleSubjectChange(day, index, e.target.value)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>

        <Box mt={3} textAlign="right">
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>
    </Modal>

      {/* Exam Modal */}
      <Modal open={openExamModal} onClose={() => setOpenExamModal(false)}>
  <Box sx={modalStyle}>
    <Typography variant="h6" mb={2}>Post New Exam Schedule</Typography>

    <TextField label="Branch" fullWidth margin="normal" value={branch} onChange={(e) => setBranch(e.target.value)} />
    <TextField label="Year" type="number" fullWidth margin="normal" value={year} onChange={(e) => setYear(e.target.value)} />
    <TextField label="Exam Type" fullWidth margin="normal" value={examType} onChange={(e) => setExamType(e.target.value)} />
    <TextField label="Subject" fullWidth margin="normal" value={subject} onChange={(e) => setSubject(e.target.value)} />
    <TextField label="Date" type="date" fullWidth margin="normal" value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
    <TextField label="Start Time" fullWidth margin="normal" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
    <TextField label="End Time" fullWidth margin="normal" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
    <TextField label="Venue" fullWidth margin="normal" value={venue} onChange={(e) => setVenue(e.target.value)} />

    <Box mt={2}>
      <Button
        variant="contained"
        onClick={async () => {
          try {
            await axios.post("http://localhost:3000/api/examschedule", {
              branch,
              year,
              examType,
              subject,
              date,
              startTime,
              endTime,
              venue
            });
            alert("Exam Posted!");
            onClose();
          } catch (err) {
            alert("Error posting exam");
          }
        }}
      >
        Submit
      </Button>
    </Box>
  </Box>
</Modal>

    </>
  );
};


export default FacultySchedules;
