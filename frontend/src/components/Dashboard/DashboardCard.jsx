import React from "react";
import {
  Card, CardContent, Box, Typography, List,
  ListItem, ListItemIcon, ListItemText, TextField, IconButton
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const DashboardCard = ({ title, icon, items = [], itemIcon, inputValue, onInputChange, onAdd }) => (
  <Card
    elevation={6}
    sx={{
      minWidth: 300,
      maxWidth: 320,
      borderRadius: 4,
      background: "#95c0ff",
      opacity: 0.8,
      flexShrink: 0,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 10,
      },
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h6" fontWeight={600} ml={1}>
          {title}
        </Typography>
      </Box>
      <List dense sx={{ maxHeight: 160, overflowY: "auto" }}>
        {items.map((item, i) => {
          const label = Array.isArray(item) ? item[0] : item;
          const iconComp = Array.isArray(item) ? item[1] : itemIcon;
          return (
            <ListItem key={i}>
              <ListItemIcon>{iconComp}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          );
        })}
      </List>
      {onAdd && (
        <Box mt={1} display="flex" alignItems="center" gap={1}>
          <TextField
            size="small"
            variant="outlined"
            placeholder={`Add ${title.slice(0, -1)}`}
            value={inputValue}
            onChange={onInputChange}
            sx={{ flex: 1 }}
          />
          <IconButton onClick={onAdd} color="primary">
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
      )}
    </CardContent>
  </Card>
);

export default DashboardCard;
