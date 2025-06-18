import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

// Import models
import User from '../models/user.model.js';
import Student from '../models/student.model.js';
import Faculty from '../models/faculty.model.js';
import Admin from '../models/admin.model.js';
import Alumni from '../models/alumini.model.js';
import Department from '../models/department.model.js';
import Course from '../models/course.model.js';
import Enrollment from '../models/enrollment.model.js';
import Event from '../models/event.model.js';
import ExamSchedule from '../models/examSchedule.model.js';
import JobPosting from '../models/jobPosting.model.js';
import Mentorship from '../models/mentorship.model.js';
import Post from '../models/post.model.js';
import DiscussionThread from '../models/discussionThread.model.js';
import Club from '../models/club.model.js';
import ClubMembership from '../models/clubMembership.model.js';
import Announcement from '../models/announcement.model.js';
import ChatbotQuery from '../models/chatbotQuery.model.js';

await mongoose.connect('mongodb://localhost:27017/universityDB');
console.log('🟢 MongoDB Connected');

const NUM_USERS = 30;
const NUM_DEPARTMENTS = 3;
const NUM_COURSES = 5;

await mongoose.connection.db.dropDatabase(); // Reset DB

// Departments
const departments = await Department.insertMany(
  Array.from({ length: NUM_DEPARTMENTS }, () => ({
    name: faker.commerce.department(),
    description: faker.lorem.sentence()
  }))
);

// Users
const users = await User.insertMany(
  Array.from({ length: NUM_USERS }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(['Student', 'Faculty', 'Admin', 'Alumni']),
    departmentID: faker.helpers.arrayElement(departments)._id,
    profilePicture: faker.image.avatar(),
    contactInfo: faker.phone.number()
  }))
);

// Group by role
const studentUsers = users.filter(u => u.role === 'Student');
const facultyUsers = users.filter(u => u.role === 'Faculty');
const alumniUsers = users.filter(u => u.role === 'Alumni');
const adminUsers = users.filter(u => u.role === 'Admin');

// Courses
const courses = await Course.insertMany(
  Array.from({ length: NUM_COURSES }, () => ({
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    credits: faker.number.int({ min: 1, max: 5 }),
    departmentID: faker.helpers.arrayElement(departments)._id
  }))
);

// Students
await Student.insertMany(studentUsers.map(user => ({
  userID: user._id,
  enrollmentNumber: faker.string.uuid(),
  batch: '2020-2024',
  departmentID: user.departmentID,
  courseID: faker.helpers.arrayElement(courses)._id,
  dateOfAdmission: faker.date.past(),
  academicStatus: faker.helpers.arrayElement(['Active', 'Graduated', 'Dropped'])
})));

// Faculty
await Faculty.insertMany(facultyUsers.map(user => ({
  userID: user._id,
  departmentID: user.departmentID,
  designation: 'Professor',
  qualifications: 'Ph.D.',
  experienceYears: faker.number.int({ min: 1, max: 30 }),
  researchInterests: ['AI', 'ML'],
  isMentor: faker.datatype.boolean()
})));

// Admin
await Admin.insertMany(adminUsers.map(user => ({
  userID: user._id,
  designation: faker.person.jobTitle(),
  departmentID: user.departmentID,
  officeContact: faker.phone.number()
})));

// Alumni
await Alumni.insertMany(alumniUsers.map(user => ({
  userID: user._id,
  graduationYear: faker.date.past().getFullYear(),
  currentPosition: faker.person.jobTitle(),
  company: faker.company.name(),
  linkedInProfile: faker.internet.url()
})));

// Enrollments
await Enrollment.insertMany(Array.from({ length: 10 }, () => ({
  userID: faker.helpers.arrayElement(users)._id,
  courseID: faker.helpers.arrayElement(courses)._id,
  enrollmentDate: faker.date.past(),
  grade: faker.helpers.arrayElement(['A', 'B', 'C', 'D'])
})));

// Clubs
const clubs = await Club.insertMany(Array.from({ length: 3 }, () => ({
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  createdDate: new Date(),
  adminID: faker.helpers.arrayElement(users)._id
})));

// Club Memberships
await ClubMembership.insertMany(Array.from({ length: 5 }, () => ({
  clubID: faker.helpers.arrayElement(clubs)._id,
  userID: faker.helpers.arrayElement(users)._id,
  role: faker.helpers.arrayElement(['Member', 'StudentCoordinator', 'FacultyCoordinator']),
  joinDate: faker.date.past()
})));

// Events
await Event.insertMany(Array.from({ length: 5 }, () => ({
  title: faker.company.catchPhrase(),
  description: faker.lorem.sentence(),
  date: faker.date.future(),
  time: "10:00 AM",
  venue: faker.location.streetAddress(),
  organizedBy: faker.helpers.arrayElement(users)._id,
  clubID: faker.helpers.arrayElement(clubs)._id
})));

// Threads
const threads = await DiscussionThread.insertMany(Array.from({ length: 3 }, () => ({
  title: faker.lorem.words(3),
  createdBy: faker.helpers.arrayElement(users)._id,
  createdDate: faker.date.past(),
  category: faker.helpers.arrayElement(['Academics', 'Events', 'Clubs', 'Placements'])
})));

// Posts
await Post.insertMany(Array.from({ length: 10 }, () => ({
  threadID: faker.helpers.arrayElement(threads)._id,
  content: faker.lorem.sentence(),
  postedBy: faker.helpers.arrayElement(users)._id,
  postedDate: faker.date.past(),
  modifiedDate: faker.date.recent()
})));

// Chatbot Queries
await ChatbotQuery.insertMany(Array.from({ length: 5 }, () => ({
  userID: faker.helpers.arrayElement(users)._id,
  queryText: faker.lorem.sentence(),
  responseText: faker.lorem.sentence(),
  queryDate: faker.date.recent()
})));

// Job Postings
await JobPosting.insertMany(Array.from({ length: 3 }, () => ({
  title: faker.company.catchPhrase(),
  description: faker.lorem.paragraph(),
  postedBy: faker.helpers.arrayElement(alumniUsers)._id,
  companyName: faker.company.name(),
  location: faker.location.city(),
  applicationDeadline: faker.date.future()
})));

// Mentorships
await Mentorship.insertMany(Array.from({ length: 3 }, () => ({
  alumniID: faker.helpers.arrayElement(alumniUsers)._id,
  studentID: faker.helpers.arrayElement(studentUsers)._id,
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  status: 'Ongoing'
})));

// Announcements
await Announcement.insertMany(Array.from({ length: 5 }, () => ({
  title: faker.company.buzzNoun(),
  content: faker.lorem.paragraph(),
  postedBy: faker.helpers.arrayElement(users)._id,
  postedDate: faker.date.recent(),
  modifiedDate: faker.date.recent(),
  targetAudience: faker.helpers.arrayElement(['Student', 'Faculty', 'Admin', 'Alumni'])
})));

// Exam Schedules
await ExamSchedule.insertMany(Array.from({ length: 5 }, () => ({
  course: faker.helpers.arrayElement(courses)._id,
  examType: faker.helpers.arrayElement(['Midterm', 'Final', 'Quiz']),
  date: faker.date.future(),
  startTime: "10:00 AM",
  endTime: "12:00 PM",
  venue: faker.location.streetAddress()
})));

console.log('✅ Dummy Data Inserted Successfully');
await mongoose.disconnect();
