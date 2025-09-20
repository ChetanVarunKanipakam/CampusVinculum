import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './common/navbar/navbar.jsx';
import SidebarMenu from './common/sidebar/Sidebar.jsx';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
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
import AluminiDashboard from './pages/Dashboard/AluminiDashboard.jsx';
import AluminiJobPostings from './pages/Jobs/AluminiJobPostings.jsx';
import AluminiJobs from './pages/Jobs/AluminiJobs.jsx';
import FacultySidebarMenu from './common/Sidebar/FacultySidebar.jsx';
import AluminiSidebar from './common/Sidebar/aluminiSidebar.jsx';


import { jwtDecode } from 'jwt-decode';
import Loading from './components/Loading/Loading.jsx';
import ProfileComponent from './pages/Profile/Profile.jsx';

function App() {
  const [auth, setAuth] = useState(null);
  const [user1, setuser1] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setLoading]= useState(false)


  useEffect(() => {
    setLoading(true)
    const login = localStorage.getItem("campusvinculum");
    const user = login ? jwtDecode(login) : null;
    console.log(auth)
    // const login=false;
    if (login) {
      switch (user.role) {
        case 'Student':
          navigate('/dashboard');
          break
        case 'Alumini':
          navigate('/alumini/dashboard');
          break
        case 'Faculty':
          navigate('/faculty/dashboard');
          break
        case 'Admin':
          navigate("/admin");
          break;
        default:
          break;
      }
      console.log(user);
      setLoading(false)
      setuser1(user);
      setAuth(login);
    } else {
      navigate("/login");
      setLoading(false)
    }
    
  }, []);

  if (loading) {
    return (
        <Loading />
    );
  }
  const isDiscussionRoute = location.pathname === "/discussions";
  const isclubDetails = location.pathname.startsWith("/clubs/");
  if (!auth) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/page_not_found" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    );
  }

  
  if (isDiscussionRoute ) {
    return <Discussions />;
  }

  if (user1.role=='Admin'){
    return (
            <Routes>
            <Route path="/admin" element={<AdminDashboard user={user1}/>}>
              <Route index element={<ProfileComponent/>} />
              <Route path="profile" element={<ProfileComponent/>}/>
              <Route path="departments" element={<DepartmentsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="announcements" element={<AnnouncementsPage />} />
            </Route></Routes>);

  }
  if (isclubDetails ) {
    return (
    <Routes>
      <Route path="/clubs/:clubName" element={<ClubDetails />} />
    </Routes>
  );
  }
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <header className="h-16 fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>
      <div className="flex flex-1 pt-16 overflow-hidden">
        <aside className="hidden lg:flex w-64 fixed top-16 bottom-0 left-0 overflow-y-auto z-40 shadow-md">
          { (user1?.role === "Student")? <SidebarMenu /> : (user1?.role === "Faculty")? <FacultySidebarMenu /> : <AluminiSidebar/>}
        </aside>
        <main className="flex-1 ml-0 lg:ml-64 overflow-y-auto bg-[#f0f0fa] px-4 py-6">
          <Routes>
            <Route path="/profile" element={<ProfileComponent/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/live-sessions" element={<LiveSessions />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/notifications" element={<Notification />} />
            
            <Route path="/events/:eventName" element={<EventDetails />} />
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/clubs" element={<FacultyClubs />} />
            <Route path="/faculty/schedules" element={<FacultySchedules />} />
            <Route path="/faculty/announcement" element={<FacultyAnnouncements />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/alumini/jobPostings" element={<AluminiJobPostings />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/alumini" element={<AluminiDashboard />} />
            <Route path="/alumini/dashboard" element={<AluminiDashboard />} />
            <Route path="/alumini/chatbot" element={<Chatbot />} />
            <Route path="/alumini/jobs" element={<AluminiJobs />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
