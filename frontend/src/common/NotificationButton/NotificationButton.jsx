// NotificationButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";

const NotificationButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="fixed top-22 right-4 z-50">
      <button
        onClick={handleClick}
        className="relative bg-white p-2 rounded-full shadow-md hover:bg-blue-100 transition duration-300"
      >
        <IoMdNotificationsOutline className="text-2xl text-blue-700" />
        {/* Dot or badge (optional) */}
        {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
      </button>
    </div>
  );
};

export default NotificationButton;
