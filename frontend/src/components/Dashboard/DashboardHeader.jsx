import React from "react";
import { Box } from "@mui/material";
import Carousel from "./Carousel";
import WelcomeText from "./WelcomeText";

const DashboardHeader = () => {
  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" mb={5}>
      <Carousel />
      <Box mt={{ xs: 3, md: 0 }}>
        <WelcomeText />
      </Box>
    </Box>
  );
};

export default DashboardHeader;
