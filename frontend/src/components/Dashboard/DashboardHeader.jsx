import React from "react";
import { Box } from "@mui/material";
import Carousel from "./Carousel";
import WelcomeText from "./WelcomeText";

const DashboardHeader = () => {
  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" mb={5}>
      <Box
            sx={{
              width: { xs: "100%", md: "100%" },
              height: 400,
              overflow: "hidden",
              borderRadius: 2,
              mr: { md: 3 },
            }}
          >
      <Box mt={{ xs: 3, md: 0 }}>
        <WelcomeText />
      </Box>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
