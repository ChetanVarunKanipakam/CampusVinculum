import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const DashboardCard = ({ title, icon, items, itemIcon }) => (
  <Card
    elevation={6}
    sx={{
      minWidth: 300,
      maxWidth: 320,
      borderRadius: 4,
      background: "#ffffff",
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
      <List dense>
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
    </CardContent>
  </Card>
);

export default DashboardCard;
