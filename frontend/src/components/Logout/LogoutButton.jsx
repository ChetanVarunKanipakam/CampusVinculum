import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Loading from "../Loading/Loading";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [loading,setLoading]= useState(false)

  const handleLogout = () => {
    setLoading(true)
    localStorage.removeItem("campusvinculum");
    setLoading(false)
    navigate("/login"); // Or wherever your login route is'
    window.location.reload();
    
  };

  if (loading) {
    return (
        <Loading />
    );
  }
  return ( 
    <Button variant="outlined" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
}
