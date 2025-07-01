import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import DashboardCard from "./DashboardCard";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CodeIcon from "@mui/icons-material/Code";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { motion } from "framer-motion";

const CardSection = ({ skillsset = [], achievementsset = [], clubs = [], clubNotifs = [] }) => {
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newAchievement, setNewAchievement] = useState("");
  const token = localStorage.getItem("campusvinculum");

  useEffect(() => {
    setSkills(skillsset || []);
  }, [skillsset]);

  useEffect(() => {
    setAchievements(achievementsset || []);
  }, [achievementsset]);

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    await axios.post(
      "http://localhost:3000/api/students/skills",
      { skill: newSkill },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSkills((prev) => [...prev, newSkill]);
    setNewSkill("");
  };

  const handleAddAchievement = async () => {
    if (!newAchievement.trim()) return;
    await axios.post(
      "http://localhost:3000/api/students/achievements",
      { achievement: newAchievement },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAchievements((prev) => [...prev, newAchievement]);
    setNewAchievement("");
  };

  const handleDeleteSkill = async (skill) => {
    await axios.delete("http://localhost:3000/api/students/skills", {
      data: { skill },
      headers: { Authorization: `Bearer ${token}` },
    });
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleDeleteAchievement = async (achievement) => {
    await axios.delete("http://localhost:3000/api/students/achievements", {
      data: { achievement },
      headers: { Authorization: `Bearer ${token}` },
    });
    setAchievements((prev) => prev.filter((a) => a !== achievement));
  };

  return (
    <Box sx={{ display: "flex", gap: 3, overflowX: "auto", pb: 2, pt: 3, pl: 1 }}>
      {[{ title: "Skills", icon: <SchoolIcon color="primary" />, items: skills.map((s) => [s, <Box display="flex" alignItems="center"><CodeIcon fontSize="small" /><IconButton size="small" onClick={() => handleDeleteSkill(s)}><DeleteIcon fontSize="small" color="error" /></IconButton></Box>]), inputValue: newSkill, onInputChange: (e) => setNewSkill(e.target.value), onAdd: handleAddSkill },
        { title: "Achievements", icon: <EmojiEventsIcon color="success" />, items: achievements.map((a) => [a, <Box display="flex" alignItems="center"><AddCircleOutlineIcon fontSize="small" color="success" /><IconButton size="small" onClick={() => handleDeleteAchievement(a)}><DeleteIcon fontSize="small" color="error" /></IconButton></Box>]), inputValue: newAchievement, onInputChange: (e) => setNewAchievement(e.target.value), onAdd: handleAddAchievement },
        { title: "Clubs", icon: <GroupIcon color="secondary" />, items: clubs.map((c) => [c, <GroupIcon fontSize="small" />]) },
        { title: "Club Notifications", icon: <NotificationsActiveIcon color="error" />, items: clubNotifs.map((n) => [n, <NotificationsActiveIcon fontSize="small" />]) }].map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0, 123, 255, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <DashboardCard {...card} />
        </motion.div>
      ))}
    </Box>
  );
};

export default CardSection;
