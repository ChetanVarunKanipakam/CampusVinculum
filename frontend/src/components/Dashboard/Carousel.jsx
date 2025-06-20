import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import img1 from "@/assets/rgukt.jpg";
import img2 from "@/assets/rgukt1.jpg";
import img3 from "@/assets/rgukt2.jpg";

const images = [img1, img2, img3];

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "100%" },
        height: 400,
        overflow: "hidden",
        borderRadius: 2,
        mr: { md: 3 },
      }}
    >
      <img
        src={images[currentImage]}
        alt={`slide-${currentImage}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
          transition: "all 1s ease-in-out",
        }}
      />
    </Box>
  );
};

export default Carousel;
