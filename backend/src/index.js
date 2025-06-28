import connectDB from './db/db.js';
import express from 'express';
import cors from 'cors';
import timetableRoutes from './routes/timetable.routes.js';
import examRoutes from './routes/examschedule.routes.js';
import userRoutes from './routes/users.routes.js';
import adminRoutes from './routes/admin.routes.js';
import alumniRoutes from './routes/alumini.routes.js';
import announcementRoutes from './routes/announcement.routes.js';
import courseRoutes from './routes/courses.routes.js';
import departmentRoutes from './routes/department.routes.js';
import clubRoutes from './routes/clubs.routes.js';
import discussionRoutes from './routes/discussionThreads.routes.js';
import enrollmentRoutes from './routes/enrollements.routes.js';
import eventRoutes from './routes/admin.routes.js'; 
import facultyRoutes from './routes/faculty.routes.js';
import mentorshipRoutes from './routes/mentorship.routes.js';
import postRoutes from './routes/post.routes.js';
import studentRoutes from './routes/students.routes.js';
import membershipRoutes from './routes/clubMemberships.routes.js';
import chatbotRoutes from './routes/chatbotQueries.routes.js';
import jobRoutes from './routes/jobPostings.routes.js';
import {server , app} from './utils/socket.js';


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true             
}));
app.use(express.json());

app.use('/api/timetable', timetableRoutes);
app.use('/api/examschedule', examRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/alumini', alumniRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/discussionThreads', discussionRoutes);
app.use('/api/enrollements', enrollmentRoutes);
app.use('/api/events', eventRoutes); 
app.use('/api/faculty', facultyRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/clubMemberships', membershipRoutes);
app.use('/api/chatbotQueries', chatbotRoutes);
app.use('/api/jobPostings', jobRoutes);



connectDB()
.then(()=>server.listen(process.env.PORT,()=>console.log("helloworld")))
.catch(()=> console.log('internal server error'));