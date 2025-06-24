import { useEffect,useState } from 'react'

import './App.css'
import Navbar from './common/navbar/navbar.jsx';
import SidebarMenu from './common/sidebar/Sidebar.jsx';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Clubs from './pages/Clubs/Clubs.jsx';
import Chatbot from './pages/Chatbot/Chatbot.jsx';
import Events from './pages/Events/Events.jsx';
import Schedules from './pages/Schedules/Schedules.jsx';
import Jobs from './pages/Jobs/Jobs.jsx';
import LiveSessions from './pages/LiveSessions/LiveSessions.jsx';
import Notification from './common/Notification/Notification.jsx';
import ClubDetails from './pages/ClubDetails/ClubDetails.jsx';
import EventDetails from './pages/EventDetials/EventDetials.jsx';
import Discussions from './pages/Discussions/Discussions.jsx';
import FacultyDashboard from './pages/Dashboard/FacultyDashboard.jsx';
import FacultyClubs from './pages/Clubs/FacultyClubs.jsx';
import FacultySchedules from './pages/Schedules/FacultySchedule.jsx';
import FacultyAnnouncements from './pages/Announcements/Announcements.jsx';
import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx';
import DepartmentsPage from './pages/AdminDepartements/AdminDepartements.jsx';
import UsersPage from './pages/AdminUsersPage/AdminUser.jsx';
import AnnouncementsPage from './pages/AdminAnnouncements/AdminAnnouncements.jsx';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const login = localStorage.getItem("campusvinculum");
    const user = login ? jwtDecode(login) : null; 

    if (login) {
      switch(user.role){
        case 'Student': navigate("/dashboard");
        break;
        case 'Faculty': navigate("/faculty/dashboard");
        break;
        case 'Admin': navigate("/admin");
      }
      
      setAuth(login);
    } else {
      navigate("/login");
    }
  }, []);


  return ( 

     <div className="w-screen h-screen flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>

      {auth?(<div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar - Fixed on large screens, scrollable */}
        <aside className="hidden lg:flex w-64 fixed top-16 bottom-0 left-0 overflow-y-auto z-40 shadow-md">
          <SidebarMenu />
        </aside>

        {/* Main Content - Scrollable */}
        <main className="flex-1 ml-0 lg:ml-64 overflow-y-auto bg-[#f0f0fa] px-4 py-6">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<DepartmentsPage />} />
              <Route path="departments" element={<DepartmentsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="announcements" element={<AnnouncementsPage />} />
            </Route>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/live-sessions" element={<LiveSessions />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/clubs/:clubName" element={<ClubDetails />} />
            <Route path="/events/:eventName" element={<EventDetails />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/clubs" element={<FacultyClubs />} />
            <Route path="/faculty/schedules" element={<FacultySchedules />} />
            <Route path="/faculty/announcement" element={<FacultyAnnouncements />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={<Dashboard />} />
            
          </Routes>
        </main>
      </div>):
         (<Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/page_not_found" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      )}
    </div>
   
          

        
 
            
      );
}

export default App
