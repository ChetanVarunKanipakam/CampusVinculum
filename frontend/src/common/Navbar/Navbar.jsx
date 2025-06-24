import React, { useState, useEffect } from "react";
import styles from "../../styles/navbar/navbar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import {
  MdSpaceDashboard, MdLiveTv, MdEvent
} from "react-icons/md";
import { FaUsers, FaLinkedin, FaGithub, FaComments } from "react-icons/fa";
import { BsRobot, BsTwitterX } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineBriefcase } from "react-icons/hi";
import logo from "@/assets/logo.png";
import profPic from "@/assets/profpic.jpg";
import { GetUserData } from "../../utils/userApi";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Loading,setLoading] = useState(false);
  const [userData,setUserData]=useState([]);


  const toggleSidebar = () => setIsOpen(!isOpen);

  const userDataCalling = async () => {
      setLoading(true);
      
      let data =await GetUserData();
      console.log(data);
      setLoading(false);
      setUserData(data);
    };
  
    useEffect(() => {
      console.log(userData);
      userDataCalling();
    }, []);
  

  return (
    <div className={`${styles.main}`}>
      <header className="w-full shadow-md h-20 bg-[#95c0ff] flex justify-between items-center px-6 z-40 relative">
      {/* Left: Logo and Profile */}
      <div className="flex items-center gap-x-6">
        <Link to="/">
          <img src={logo} alt="Campus Vinculum" className="h-12 w-auto" />
        </Link>
      </div>
        <div className="hidden md:flex items-center justify-items-end gap-3">
          <Link to="/profile" className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-600 shadow-lg">
            <img src={profPic} alt={userData.name} className="w-full h-full object-cover" />
          </Link>
          <div>
            <Link to="/profile" className="text-xl font-semibold text-blue-900 hover:underline">
              {userData.name}
            </Link>
            <div className="text-sm text-gray-600">{userData.role}</div>
          </div>
        </div>
      

      {/* Hamburger for mobile */}
      <button onClick={toggleSidebar} className="lg:hidden text-3xl text-blue-900">
        {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
      </button>
    </header>

      {/* Mobile Sidebar */}
      <div
        className={`transition-all duration-300 lg:hidden fixed top-0 left-0 h-full w-8/12 max-w-xs z-20 bg-[#95c0ff] shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="w-full h-full flex flex-col justify-start gap-y-3 items-center overflow-y-auto pb-10">
          <div className="w-4/12 mt-8">
            <Link to="/dashboard" onClick={toggleSidebar}>
              <img src={profPic} alt="vennela" className="rounded-full w-full" />
            </Link>
          </div>
          <div className="mt-3 mb-4 flex flex-col items-center">
            <Link to="/dashboard" onClick={toggleSidebar} className="text-blue-700 font-bold text-xl">
              {userData.name}
            </Link>
            <span className="text-gray-600 font-bold text-base">{userData.role}</span>
          </div>

          {/* Menu Items */}
          {[
            { to: "/dashboard", label: "Dashboard", icon: <MdSpaceDashboard /> },
            { to: "/clubs", label: "Clubs", icon: <FaUsers /> },
            { to: "/discussions", label: "Discussions", icon: <FaComments /> },
            { to: "/chatbot", label: "Chatbot", icon: <BsRobot /> },
            { to: "/live-sessions", label: "Live Sessions", icon: <MdLiveTv /> },
            { to: "/schedules", label: "Schedules", icon: <AiOutlineCalendar /> },
            { to: "/jobs", label: "Job Postings", icon: <HiOutlineBriefcase /> },
            { to: "/events", label: "Events", icon: <MdEvent /> },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `w-8/12 text-base font-bold py-1 px-3 rounded flex items-center gap-x-2 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-blue-800 hover:bg-blue-600 hover:text-white"
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}

          {/* Socials */}
          <div className="w-full flex flex-col gap-y-2 items-center mt-6 px-4">
            <hr className="border border-blue-700 mb-3 w-full" />
            <div className="text-xl text-blue-700 font-bold">Follow Me</div>
            <div className="flex justify-center gap-x-4 text-2xl text-blue-900">
              <a href="https://in.linkedin.com/in/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
              <a href="https://github.com/Vennela115" target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href="https://x.com/" target="_blank" rel="noreferrer"><BsTwitterX /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
