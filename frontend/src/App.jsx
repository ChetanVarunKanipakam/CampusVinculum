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

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
      navigate("/dashboard");
      setAuth(true);

  }, []);


  return  <>
      {/* <BrowserRouter> */}
      <Navbar/>
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<ErrorPage />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/clubs" element={<Clubs/>} />

            <Route path="/chatbot" element={<Chatbot/>} />
            <Route path="/live-sessions" element={<LiveSessions />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/events" element={<Events />} />
            <Route
              path="/"
              element={<Dashboard/>}
            />
          </>
        ) : (
          <>
            {/* <Route path="/user/forgot_password" element={<ForgotPassword />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route path="/user/page_not_found" element={<ErrorPage />} />
      </Routes>
   </>
}

export default App
