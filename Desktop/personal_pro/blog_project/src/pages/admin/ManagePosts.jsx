import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";

const API_URL = "https://blog-backend-api-r9h1.onrender.com";

function ManagePosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingPostId, setDeletingPostId] = useState(null);

  // FETCH ALL POSTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userLog = JSON.parse(
          localStorage.getItem("userLog") || "null"
        );

        if (!userLog?.accessToken) {
          navigate("/login", { replace: true });
          return;
        }

        if (userLog.user?.role !== "admin") {
          navigate("/", { replace: true });
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/post/all-post`
        );

        setPosts(response.data.data.posts || []);

      } catch (error) {
        console.error("Fetch posts error:", error);

        setError(
          error.response?.data?.message ||
          "Failed to fetch posts"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);


  // DELETE POST
  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      setDeletingPostId(postId);

      const userLog = JSON.parse(
        localStorage.getItem("userLog") || "null"
      );

      if (!userLog?.accessToken) {
        navigate("/login", { replace: true });
        return;
      }

      await axios.delete(
        `${API_URL}/api/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${userLog.accessToken}`
          }
        }
      );

      // Remove deleted post from the table
      setPosts((previousPosts) =>
        previousPosts.filter(
          (post) => post._id !== postId
        )
      );

      alert("Post deleted successfully");

    } catch (error) {
      console.error("Delete post error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("userLog");
        navigate("/login", { replace: true });
        return;
      }

      alert(
        error.response?.data?.message ||
        "Failed to delete post"
      );

    } finally {
      setDeletingPostId(null);
    }
  };


  // SEARCH POSTS
  const filteredPosts = posts.filter((post) => {
    const title = (post.title || "").toLowerCase();

    const author = (
      post.author?.userName || ""
    ).toLowerCase();

    const searchText = search.toLowerCase().trim();

    return (
      title.includes(searchText) ||
      author.includes(searchText)
    );
  });


  return (
    <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1 p-6">

        <h1 className="mb-2 text-2xl font-bold">
          All Published Posts
        </h1>

        <p className="mb-6 text-gray-500">
          View and manage blog posts.
        </p>


        <div className="rounded-lg bg-white p-6 shadow">

          {/* HEADER AND SEARCH */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

            <h2 className="text-xl font-semibold">
              Total Posts: {posts.length}
            </h2>

            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />

          </div>


          {/* LOADING */}
          {loading && (
            <p className="text-gray-500">
              Loading posts...
            </p>
          )}


          {/* ERROR */}
          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}


          {/* POSTS TABLE */}
          {!loading && !error && (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px] text-left">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="p-3">Post Title</th>
                    <th className="p-3">Author</th>
                    <th className="p-3">Likes</th>
                    <th className="p-3">Comments</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Actions</th>
                  </tr>

                </thead>


                <tbody>

                  {filteredPosts.map((post) => (

                    <tr
                      key={post._id}
                      className="border-b hover:bg-gray-50"
                    >

                      {/* TITLE */}
                      <td className="p-3">
                        {post.title}
                      </td>


                      {/* AUTHOR */}
                      <td className="p-3">
                        {post.author?.userName || "Unknown"}
                      </td>


                      {/* LIKES */}
                      <td className="p-3">
                        {post.likesCount ?? post.likes?.length ?? 0}
                      </td>


                      {/* COMMENTS */}
                      <td className="p-3">
                        {post.commentsCount ?? 0}
                      </td>


                      {/* DATE */}
                      <td className="p-3">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : "N/A"}
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
                            disabled={deletingPostId === post._id}
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


              {/* EMPTY MESSAGE */}
              {filteredPosts.length === 0 && (
                <p className="py-6 text-center text-gray-500">
                  No posts found.
                </p>
              )}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default ManagePosts;