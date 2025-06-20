import React from "react";
import { Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CodeIcon from "@mui/icons-material/Code";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import DashboardCard from "./DashboardCard";

const CardSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        overflowX: "auto",
        pb: 2,
        pt: 3,
        pl: 1,
        "&::-webkit-scrollbar": {
          height: 8,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: 4,
        },
      }}
    >
      <DashboardCard
        title="Skills"
        icon={<SchoolIcon color="primary" />}
        items={["ReactJS", "NodeJS", "MongoDB", "Tailwind CSS"]}
        itemIcon={<CodeIcon fontSize="small" />}
      />

      <DashboardCard
        title="Achievements"
        icon={<EmojiEventsIcon color="success" />}
        items={[
          ["Top 1% in CodeChef", <StarIcon fontSize="small" color="warning" />],
          ["Hackathon Winner", <EmojiObjectsIcon fontSize="small" color="info" />],
          ["Best Project Award 2024", <CheckCircleIcon fontSize="small" color="secondary" />],
        ]}
      />

      <DashboardCard
        title="Clubs"
        icon={<GroupIcon color="secondary" />}
        items={["Tech Club", "Cultural Club", "AI & Robotics Club"]}
        itemIcon={<GroupIcon fontSize="small" />}
      />

      <DashboardCard
        title="Club Notifications"
        icon={<NotificationsActiveIcon color="error" />}
        items={["Tech Talk on June 20th", "Cultural Rehearsal – June 25th"]}
        itemIcon={<NotificationsActiveIcon fontSize="small" />}
      />
    </Box>
  );
};

export default CardSection;
