import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Box } from "@mui/material";

const drawerWidth = 240;

const ClubSidebar = ({ selectedTab, setSelectedTab }) => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: "border-box",
        background: "#f0f4f8",
      },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: "auto" }}>
      <List>
        {["discussions", "events"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton selected={selectedTab === text} onClick={() => setSelectedTab(text)}>
              <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  </Drawer>
);

export default ClubSidebar;
