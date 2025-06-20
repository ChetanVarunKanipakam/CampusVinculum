import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { IoMdPeople } from "react-icons/io";

const ClubHeader = ({ clubName, onOpenMembers }) => (
  <AppBar position="fixed" sx={{ zIndex: 1201 }}>
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={onOpenMembers}>
        {clubName}
      </Typography>
      <IconButton color="inherit" onClick={onOpenMembers}>
        <IoMdPeople />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default ClubHeader;
