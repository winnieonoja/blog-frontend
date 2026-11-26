import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";

const API_URL = "https://blog-backend-api-r9h1.onrender.com";

function ManageUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH ALL USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const userLog = JSON.parse(
          localStorage.getItem("userLog") || "null"
        );

        // Check if user is logged in
        if (!userLog?.accessToken) {
          navigate("/login", { replace: true });
          return;
        }

        // Check admin role
        if (userLog.user?.role !== "admin") {
          navigate("/", { replace: true });
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${userLog.accessToken}`
            }
          }
        );

        setUsers(response.data.data.users || []);

      } catch (error) {
        console.error("Fetch users error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("userLog");
          navigate("/login", { replace: true });
          return;
        }

        if (error.response?.status === 403) {
          navigate("/", { replace: true });
          return;
        }

        setError(
          error.response?.data?.message ||
          "Failed to fetch users"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);


  // SEARCH USERS
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`
      .toLowerCase();

    const username = (user.userName || "").toLowerCase();
    const email = (user.email || "").toLowerCase();

    const searchText = search.toLowerCase().trim();

    return (
      fullName.includes(searchText) ||
      username.includes(searchText) ||
      email.includes(searchText)
    );
  });


  return (
    <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1 p-6">

        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            All Registered Users
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage registered blog users.
          </p>
        </div>

        {/* USERS TABLE */}
        <div className="rounded-lg bg-white p-6 shadow">

          {/* TABLE TOP SECTION */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

            <h2 className="text-xl font-semibold">
              Total Users: {users.length}
            </h2>

            {/* SEARCH BOX */}
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />

          </div>

          {/* LOADING */}
          {loading && (
            <p className="text-gray-500">
              Loading users...
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {/* TABLE */}
          {!loading && !error && (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px] text-left">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="p-3">Full Name</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Date Joined</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map((user) => (

                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50"
                    >

                      {/* FULL NAME */}
                      <td className="p-3">
                        {user.firstName} {user.lastName}
                      </td>

                      {/* USERNAME */}
                      <td className="p-3">
                        {user.userName}
                      </td>

                      {/* EMAIL */}
                      <td className="p-3">
                        {user.email}
                      </td>

                      {/* ROLE */}
                      <td className="p-3">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.role}
                        </span>

                      </td>

                      {/* DATE JOINED */}
                      <td className="p-3">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

              {/* EMPTY RESULTS */}
              {filteredUsers.length === 0 && (
                <p className="py-6 text-center text-gray-500">
                  No users found.
                </p>
              )}

            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default ManageUsers;