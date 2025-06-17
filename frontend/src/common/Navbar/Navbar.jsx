import React, { useEffect } from "react";
import styles from "../../styles/navbar/navbar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { BsRobot, BsTwitterX } from "react-icons/bs";
import { MdLiveTv, MdEvent } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineBriefcase } from "react-icons/hi";
import logo from "@/assets/logo.png";
import profPic from "@/assets/profpic.jpg";

const Navbar = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div className={`${styles.main}`}>
        <header className={`${styles.header} flex justify-between`}>
          <div className={`${styles.logo_box}`}>
            <img src={logo} alt="logo" className={`${styles.logo}`} />
          </div>
          <button className="flex lg:hidden items-center pr-5" onClick={() => {}}>
            <RxHamburgerMenu />
          </button>
        </header>

        {/* Mobile Sidebar */}
        <div className="lg:hidden w-full md:w-4/12 h-full shadow-2xl background_gradient_color z-20 fixed left-0">
          <div className="w-full h-full flex flex-col justify-start gap-y-3 md:gap-y-5 items-center">
            <div className="w-full flex flex-col items-center">
              <div className="w-4/12 md:w-6/12 flex mt-8">
                <Link to="/dashboard" className="w-full rounded-full">
                  <img
                    src={profPic}
                    alt="vennela"
                    className="w-full rounded-full"
                  />
                </Link>
              </div>
              <div className="mt-3 md:mt-4 mb-1 md:mb-4 flex flex-col items-center">
                <Link
                  to="/dashboard"
                  className="text-blue-700 font-bold text-xl"
                >
                  vennela
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-600 font-bold text-base"
                >
                  Profile
                </Link>
              </div>

              {/* Menu Items */}
              <div className="w-8/12 flex">
                <NavLink
                  to="/dashboard"
                  className="w-full text-base font-bold py-1 px-3 text-blue-800 hover:bg-blue-600 hover:text-white rounded flex items-center gap-x-2"
                >
                  <MdSpaceDashboard /> Dashboard
                </NavLink>
              </div>
              <div className="w-8/12 flex">
                <NavLink
                  to="/clubs"
                  className="w-full text-base font-bold py-1 px-3 text-blue-800 hover:bg-blue-600 hover:text-white rounded flex items-center gap-x-2"
                >
                  <FaUsers /> Clubs
                </NavLink>
              </div>
              <div className="w-8/12 flex">
                <NavLink
                  to="/discussions"
                  className="w-full text-base font-bold py-1 px-3 text-blue-800 hover:bg-blue-600 hover:text-white rounded flex items-center gap-x-2"
                >
                  <FaComments /> Discussions
                </NavLink>
              </div>
              <div className="w-8/12 flex">
                <NavLink
                  to="/chatbot"
                  className="w-full text-base font-bold py-1 px-3 text-blue-800 hover:bg-blue-600 hover:text-white rounded flex items-center gap-x-2"
                >
                  <BsRobot /> Chatbot
                </NavLink>
              </div>
              <div className="w-8/12 flex">
                <NavLink
                  to="/live-sessions"
                  className="w-full text-base font-bold py-1 px-3 text-blue-800 hover:bg-blue-600 hover:text-white rounded flex items-center gap-x-2"
                >
                  <MdLiveTv /> Live Sessions
                </NavLink>
              </div>
              <div className="w-8/12 flex">
                <NavLink
                  to="/schedules"
                  className="w-full text-base font-bold py-1 px-3 text-blue-800 hover:bg-blue-600 hover:text-white rounded flex items-center gap-x-2"
                >
                  <AiOutlineCalendar /> Schedules
                </NavLink>
              </div>
              <div className="w-8/12 flex">
                <NavLink
                  to="/jobs"
                  className="w-full text-base font-bold py-1 px-3 text-blue-800 hover:bg-blue-600 hover:text-white rounded flex items-center gap-x-2"
                >
                  <HiOutlineBriefcase /> Job Postings
                </NavLink>
              </div>
              <div className="w-8/12 flex">
                <NavLink
                  to="/events"
                  className="w-full text-base font-bold py-1 px-3 text-blue-800 hover:bg-blue-600 hover:text-white rounded flex items-center gap-x-2"
                >
                  <MdEvent /> Events
                </NavLink>
              </div>

              {/* Social Links */}
              <div className="w-full flex flex-col gap-y-2 items-center mt-6">
                <hr className="border border-blue-700 mb-3 w-full" />
                <div className="text-xl text-blue-700 font-bold">Follow Me</div>
                <div className="w-8/12 flex justify-center gap-x-2 text-2xl text-blue-900">
                  <a href="https://in.linkedin.com/in/" target="_blank">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/Vennela115" target="_blank">
                    <FaGithub />
                  </a>
                  <a href="https://x.com/" target="_blank">
                    <BsTwitterX />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
