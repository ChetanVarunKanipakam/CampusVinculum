import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const ClubMembersDialog = ({ open, onClose, members }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Group Members</DialogTitle>
    <DialogContent>
      {members.map((member, i) => (
        <Typography key={i} sx={{ my: 1 }}>• {member}</Typography>
      ))}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default ClubMembersDialog;
