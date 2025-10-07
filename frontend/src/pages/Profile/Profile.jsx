import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaUserTie } from 'react-icons/fa';
import { GetUserData } from '../../utils/userApi';
import Loading from '../../components/Loading/Loading';
import defaultpic from '../../assets/default-avatar.jpg';
export default function ProfileComponent() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const userDataCalling = async () => {
    const data = await GetUserData();
    if (data) setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    userDataCalling();
  }, []);

  if (loading) return <Loading />;

  const roleIcon = {
    Student: <FaUserGraduate className="text-blue-600 text-3xl" />,
    Faculty: <FaChalkboardTeacher className="text-green-600 text-3xl" />,
    Admin: <FaUserShield className="text-red-600 text-3xl" />,
    Alumni: <FaUserTie className="text-purple-600 text-3xl" />,
  };

  const { roleDetails, departmentID } = user;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-3xl mt-10">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <img
          src={user.profilePicture || defaultpic}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 mt-1">{user.email}</p>
          <p className="text-gray-500 mt-1">{user.contactInfo || 'No contact info'}</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-gray-100 p-2 rounded-full shadow-sm">
            {roleIcon[user.role]} <span className="text-lg font-semibold">{user.role}</span>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Role Specific Details */}
      {user.role === 'Student' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-700">Student Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <p><span className="font-semibold">Roll Number:</span> {roleDetails.rollNumber}</p>
              <p><span className="font-semibold">Year:</span> {roleDetails.year}</p>
              <p><span className="font-semibold">Section:</span> {roleDetails.section}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <p><span className="font-semibold">Department:</span> {departmentID?.name || 'N/A'}</p>
              <p><span className="font-semibold">Skills:</span> {roleDetails.skills?.join(', ') || 'None'}</p>
              <p><span className="font-semibold">Achievements:</span> {roleDetails.achievements?.join(', ') || 'None'}</p>
              <p><span className="font-semibold">Clubs:</span> {roleDetails.clubs?.length || 0}</p>
            </div>
          </div>
        </div>
      )}

      {user.role === 'Faculty' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-green-700">Faculty Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <p><span className="font-semibold">Department:</span> {departmentID?.name || 'N/A'}</p>
              <p><span className="font-semibold">Designation:</span> {roleDetails.designation}</p>
              <p><span className="font-semibold">Qualifications:</span> {roleDetails.qualifications}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <p><span className="font-semibold">Experience:</span> {roleDetails.experienceYears} years</p>
              <p><span className="font-semibold">Research Interests:</span> {roleDetails.researchInterests?.join(', ') || 'None'}</p>
              <p><span className="font-semibold">Mentor:</span> {roleDetails.isMentor ? 'Yes' : 'No'}</p>
            </div>
          </div>
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
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-700">Alumni Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
              <p><span className="font-semibold">Graduation Year:</span> {roleDetails.graduationYear}</p>
              <p><span className="font-semibold">Company:</span> {roleDetails.company}</p>
              <p><span className="font-semibold">Current Position:</span> {roleDetails.currentPosition}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
              <p><span className="font-semibold">LinkedIn:</span> 
                <a href={roleDetails.linkedInProfile} target="_blank" rel="noreferrer" className="text-purple-600 underline ml-1 hover:text-purple-800">
                  {roleDetails.linkedInProfile}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
