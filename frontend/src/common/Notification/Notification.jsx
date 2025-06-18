// Notifications.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Notifications = () => {
  const navigate = useNavigate();

  // Dummy notification data
  const notifications = [
    {
      id: 1,
      title: "New Message",
      description: "You have a new message from Chitra.",
      time: "Just now",
    },
    {
      id: 2,
      title: "Club Meeting",
      description: "AI Club meeting scheduled for tomorrow at 5 PM.",
      time: "2 hours ago",
    },
    {
      id: 3,
      title: "New Event",
      description: "AI Workshop on Friday. Don’t miss it!",
      time: "1 day ago",
    },
    {
      id: 4,
      title: "Profile Viewed",
      description: "Your profile was viewed 10 times today.",
      time: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-blue-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex mt-9 items-center gap-2 mb-6 text-blue-700 font-semibold hover:underline"
      >
        <IoArrowBack className="text-xl" /> Back
      </button>

      <h1 className="text-3xl font-bold text-blue-700 mb-6">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="bg-white border border-blue-100 rounded-lg shadow-sm p-4 hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-semibold text-blue-800">
                {note.title}
              </h2>
              <span className="text-sm text-gray-500">{note.time}</span>
            </div>
            <p className="text-gray-700">{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
