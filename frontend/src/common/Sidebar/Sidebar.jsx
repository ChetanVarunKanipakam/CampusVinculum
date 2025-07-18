import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { MdLiveTv } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineBriefcase } from "react-icons/hi";
import { MdEvent } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import profPic from "@/assets/profpic.jpg";
 import { GetUserData } from "@/utils/userApi";
// import Loading from "@/components/Loading/Loading";
// import { useSelector } from "react-redux";

const SidebarMenu = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userDataCalling = async () => {
    setLoading(true);
    
    let data =await GetUserData();
    setLoading(false);
    setUserData(data);
  };

  useEffect(() => {
    userDataCalling();
  }, []);

  

  return (
  <>
    <div className="hidden lg:flex flex-col w-60 h-screen fixed top-20 left-0 z-30 p-5 bg-[#95c0ff] opacity-80 text-white shadow-2xl overflow-y-auto">
  
  {/* Navigation Links */}
  <nav className="flex flex-col gap-3">
    {[
      { to: "/dashboard", label: "Dashboard", icon: <MdSpaceDashboard /> },
      { to: "/clubs", label: "Clubs", icon: <FaUsers /> },
      { to: "/discussions", label: "Discussions", icon: <FaComments /> },
      { to: "/chatbot", label: "Chatbot", icon: <BsRobot /> },
      { to: "/live-sessions", label: "Live Sessions", icon: <MdLiveTv /> },
      { to: "/schedules", label: "Schedules", icon: <AiOutlineCalendar /> },
      { to: "/jobs", label: "Job Postings", icon: <HiOutlineBriefcase /> },
      { to: "/events", label: "Events", icon: <MdEvent /> },
    ].map(({ to, label, icon }, index) => (
      <NavLink
        key={index}
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-md font-semibold transition-all text-white ${
            isActive ? "bg-blue-700 shadow" : "hover:bg-blue-500 hover:shadow"
          }`
        }
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </NavLink>
    ))}
  </nav>

  {/* Socials */}
  <div className="mt-10 flex flex-col items-center gap-2">
    <p className="text-white text-sm mb-2">Follow Me</p>
    <div className="flex gap-4 text-white text-2xl">
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      <a href="https://github.com/Vennela115" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
      <a href="https://x.com" target="_blank" rel="noopener noreferrer"><BsTwitterX /></a>
    </div>
  </div>
</div>
</>
);

};

export default SidebarMenu;
