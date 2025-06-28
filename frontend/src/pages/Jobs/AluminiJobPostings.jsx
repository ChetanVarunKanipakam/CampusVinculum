import React, { useEffect, useState } from "react";
import { GetUserData } from "@/utils/userApi";    // returns current user’s info (including _id)
import axios from "axios";

const JobPostings = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("campusvinculum");
  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const u = await GetUserData();
        setUser(u);
        const res = await axios.get("http://localhost:3000/api/jobPostings",{ headers: { Authorization: `Bearer ${token}` } }); // adjust route if needed
        setJobs(res);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (loading) return <p>Loading jobs…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  // Filter only jobs posted by this alumnus
  const myJobs = jobs.filter(job => job.userID === user._id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Job Postings</h2>

      {myJobs.length === 0 ? (
        <p>You haven’t posted any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {myJobs.map(job => (
            <li key={job._id} className="border rounded-md p-4 shadow-sm">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600">
                Posted on {new Date(job.postedAt).toLocaleDateString()}
              </p>
              <p>{job.description}</p>
              {job.company && (
                <p>
                  <strong>Company:</strong> {job.company}
                </p>
              )}
              {job.location && (
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
              )}
              {/* Add more fields and actions here as desired */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobPostings;
