import PostAnnouncementForm from "@/components/Announcement/PostAnnouncementForm";
import FacultySidebar from "../../common/Sidebar/FacultySidebar";
import { Box } from "@mui/material";

const FacultyAnnouncements = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar Section */}
        <Box
          sx={{
            width: 240,
            bgcolor: "#e0e0e0",
            height: "100vh",
            flexShrink: 0,
            borderRight: "1px solid #ccc",
          }}
        >
          <FacultySidebar />
        </Box>
      <PostAnnouncementForm />
    </Box>
  );
};

export default FacultyAnnouncements;