import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaUserTie } from 'react-icons/fa';
import { GetUserData } from '../../utils/userApi';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../../components/Loading/Loading';
export default function ProfileComponent() {
    const [loading ,setLoading]=useState(true);
    const [user,setUser]=useState(null);
    const userDataCalling = async () => {
        const data = await GetUserData();
        console.log(data);
        if (data) {
        setUser(data);
        }
        setLoading(false);
    };

  useEffect(() => {
    userDataCalling();
  }, []);
  if(loading){
    return <Loading/>
  }
  const roleIcon = {
    Student: <FaUserGraduate className="text-blue-600 text-2xl" />,
    Faculty: <FaChalkboardTeacher className="text-green-600 text-2xl" />,
    Admin: <FaUserShield className="text-red-600 text-2xl" />,
    Alumni: <FaUserTie className="text-purple-600 text-2xl" />,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <div className="flex items-center gap-6">
        <img
          src={user.profilePicture || '/default-avatar.png'}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
        />
        <div>
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm mt-1 text-gray-500">{user.contactInfo}</p>
          <div className="mt-2 flex items-center gap-2">
            {roleIcon[user.role]} <span className="text-lg font-medium">{user.role}</span>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {user.role === 'Student' && (
        <div>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Student Details</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Roll Number: {user.roleDetails.rollNumber}</li>
            <li>Year: {user.roleDetails.year}</li>
            <li>Section: {user.roleDetails.section}</li>
            <li>Department: {user.departmentID?.name || 'N/A'}</li>
            <li>Skills: {user.roleDetails.skills?.join(', ') || 'None'}</li>
            <li>Achievements: {user.roleDetails.achievements?.join(', ') || 'None'}</li>
            <li>Clubs: {user.roleDetails.clubs?.length || 0}</li>
          </ul>
        </div>
      )}

      {user.role === 'Faculty' && (
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">Faculty Details</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Department: {departmentID?.name || 'N/A'}</li>
            <li>Designation: {roleDetails.designation}</li>
            <li>Qualifications: {roleDetails.qualifications}</li>
            <li>Experience: {roleDetails.experienceYears} years</li>
            <li>Research Interests: {roleDetails.researchInterests?.join(', ')}</li>
            <li>Mentor: {roleDetails.isMentor ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      )}

      {/* {user.role === 'Admin' && (
        <div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">Admin Details</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Designation: {roleDetails.designation}</li>
            <li>Department: {departmentID?.name || 'N/A'}</li>
            <li>Office Contact: {roleDetails.officeContact}</li>
          </ul>
        </div>
      )} */}

      {user.role === 'Alumni' && (
        <div>
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Alumni Details</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Graduation Year: {roleDetails.graduationYear}</li>
            <li>Company: {roleDetails.company}</li>
            <li>Current Position: {roleDetails.currentPosition}</li>
            <li>
              LinkedIn:{' '}
              <a href={roleDetails.linkedInProfile} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                {roleDetails.linkedInProfile}
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
