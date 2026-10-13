import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";

const API_URL = "https://blog-backend-api-r9h1.onrender.com";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingPostId, setDeletingPostId] = useState(null);

  // FETCH DASHBOARD STATISTICS
  useEffect(() => {
    const fetchDashboard = async () => {
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

        // Check if user is an admin
        if (userLog.user?.role !== "admin") {
          navigate("/", { replace: true });
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${userLog.accessToken}`
            }
          }
        );

        setStats(response.data.data);

      } catch (error) {
        console.error("Dashboard error:", error);

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
          "Failed to fetch dashboard statistics"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

  }, [navigate]);


  // DELETE POST
  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingPostId(postId);

      const userLog = JSON.parse(
        localStorage.getItem("userLog") || "null"
      );

      if (!userLog?.accessToken) {
        navigate("/login", { replace: true });
        return;
      }

      const token = userLog.accessToken;

      // Delete selected post
      await axios.delete(
        `${API_URL}/api/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Refresh dashboard statistics
      const response = await axios.get(
        `${API_URL}/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(response.data.data);

      alert("Post deleted successfully");

    } catch (error) {
      console.error("Delete post error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete post"
      );

    } finally {
      setDeletingPostId(null);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">

      {/* ADMIN SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1 p-6">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between gap-4">

          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <Link
            to="/"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            View Blog
          </Link>

        </div>


        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">
            Loading dashboard...
          </p>
        )}


        {/* ERROR */}
        {error && (
          <p className="mb-5 text-red-500">
            {error}
          </p>
        )}


        {/* DASHBOARD CONTENT */}
        {!loading && !error && stats && (
          <>

            {/* STATISTICS CARDS */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* TOTAL USERS */}
              <div className="rounded-lg bg-white p-6 shadow">

                <h2 className="text-gray-500">
                  Total Users
                </h2>

                <p className="mt-3 text-3xl font-bold text-blue-600">
                  {stats.totalUsers}
                </p>

                <Link
                  to="/admin/users"
                  className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                >
                  View All Users
                </Link>

              </div>


              {/* TOTAL POSTS */}
              <div className="rounded-lg bg-white p-6 shadow">

                <h2 className="text-gray-500">
                  Total Posts
                </h2>

                <p className="mt-3 text-3xl font-bold text-green-600">
                  {stats.totalPosts}
                </p>

                <Link
                  to="/admin/posts"
                  className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                >
                  View All Posts
                </Link>

              </div>


              {/* TOTAL COMMENTS */}
              <div className="rounded-lg bg-white p-6 shadow">

                <h2 className="text-gray-500">
                  Total Comments
                </h2>

                <p className="mt-3 text-3xl font-bold text-purple-600">
                  {stats.totalComments}
                </p>

                <Link
                  to="/admin/comments"
                  className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                >
                  View All Comments
                </Link>

              </div>


              {/* TOTAL LIKES */}
              <div className="rounded-lg bg-white p-6 shadow">

                <h2 className="text-gray-500">
                  Total Likes
                </h2>

                <p className="mt-3 text-3xl font-bold text-orange-600">
                  {stats.totalLikes}
                </p>

              </div>

            </div>


            {/* RECENT POSTS */}
            <div className="mt-8 rounded-lg bg-white p-6 shadow">

              {/* TABLE HEADER */}
              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-xl font-bold text-gray-800">
                  Recent Posts
                </h2>

                <Link
                  to="/admin/posts"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View All
                </Link>

              </div>


              {/* POSTS TABLE */}
              {stats.recentPosts?.length > 0 ? (

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[550px] text-left">

                    <thead className="bg-gray-50">

                      <tr className="border-b">

                        <th className="p-3">
                          Post Title
                        </th>

                        <th className="p-3">
                          Author
                        </th>

                        <th className="p-3">
                          Date
                        </th>

                        <th className="p-3">
                          Actions
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {stats.recentPosts.map((post) => (

                        <tr
                          key={post._id}
                          className="border-b hover:bg-gray-50"
                        >

                          {/* POST TITLE */}
                          <td className="p-3">
                            {post.title}
                          </td>


                          {/* AUTHOR */}
                          <td className="p-3">
                            {post.author?.userName || "Unknown"}
                          </td>


                          {/* DATE */}
                          <td className="p-3">
                            {new Date(
                              post.createdAt
                            ).toLocaleDateString()}
                          </td>


                          {/* ACTIONS */}
                          <td className="p-3">

                            <div className="flex items-center gap-4">

                              {/* VIEW POST */}
                              <Link
                                to={`/post/${post._id}`}
                                className="text-blue-600 hover:underline"
                              >
                                View
                              </Link>


                              {/* DELETE POST */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeletePost(post._id)
                                }
                                disabled={
                                  deletingPostId === post._id
                                }
                                className="cursor-pointer text-red-600 hover:underline disabled:opacity-50"
                              >
                                {deletingPostId === post._id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              ) : (

                <p className="text-gray-500">
                  No posts available.
                </p>

              )}

            </div>

          </>
        )}

      </main>

    </div>
  );
}

export default AdminDashboard;