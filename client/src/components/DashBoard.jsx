import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const DashBoard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        // Fetch profile
        const profileResponse = await axios.get("http://localhost:3001/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileResponse.data);

        // Fetch all users
        const usersResponse = await axios.get("http://localhost:3001/allusers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllUsers(usersResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data");
        setLoading(false);
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
      {profile && (
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Score:</strong> {profile.score}</p>
          <p><strong>Admin:</strong> {profile.isAdmin ? "Yes" : "No"}</p>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Username</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Solved</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Score</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {allUsers.map((user, index) => (
              <tr key={user._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.username}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.solved}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default DashBoard;