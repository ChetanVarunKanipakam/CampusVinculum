import React from "react";
import { Typography } from "@mui/material";

const WelcomeText = () => {
  return (
    <>
      <Typography
        variant="h4"
        fontWeight={1000}
        fontSize={60}
        color="primary"
        sx={{ letterSpacing: 1 }}
      >
        RGUKT <br />
        RK Valley
      </Typography>
      <Typography mt={2} color="textSecondary" fontSize={16}>
        Welcome to RGUKT RK Valley Campus Vinculum, get ready to connect with your peers and grow together...
      </Typography>
    </>
  );
};

export default WelcomeText;
