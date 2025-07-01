import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("campusvinculum");
    navigate("/login"); // Or wherever your login route is
  };

  return (
    <Button variant="outlined" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
}
