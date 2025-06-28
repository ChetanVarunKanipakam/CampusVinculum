import PostAnnouncementForm from "@/components/Announcement/PostAnnouncementForm";
import FacultySidebar from "../../common/Sidebar/FacultySidebar";
import { Box } from "@mui/material";

const FacultyAnnouncements = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar Section */}
        
      <PostAnnouncementForm />
    </Box>
  );
};

export default FacultyAnnouncements;