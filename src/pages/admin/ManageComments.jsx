import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";

const API_URL = "https://blog-backend-api-r9h1.onrender.com";

function ManageComments() {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  // FETCH ALL COMMENTS
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError("");

        const userLog = JSON.parse(
          localStorage.getItem("userLog") || "null"
        );

        // Check authentication
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
          `${API_URL}/api/admin/comments`,
          {
            headers: {
              Authorization: `Bearer ${userLog.accessToken}`
            }
          }
        );

        setComments(response.data.data.comments || []);

      } catch (error) {
        console.error("Fetch comments error:", error);

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
          "Failed to fetch comments"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchComments();

  }, [navigate]);


  // DELETE COMMENT
  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    try {
      setDeletingCommentId(commentId);

      const userLog = JSON.parse(
        localStorage.getItem("userLog") || "null"
      );

      if (!userLog?.accessToken) {
        navigate("/login", { replace: true });
        return;
      }

      // Delete comment using the existing comment endpoint
      await axios.delete(
        `${API_URL}/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${userLog.accessToken}`
          }
        }
      );

      // Remove deleted comment from the table
      setComments((previousComments) =>
        previousComments.filter(
          (comment) => comment._id !== commentId
        )
      );

      alert("Comment deleted successfully");

    } catch (error) {
      console.error("Delete comment error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("userLog");
        navigate("/login", { replace: true });
        return;
      }

      alert(
        error.response?.data?.message ||
        "Failed to delete comment"
      );

    } finally {
      setDeletingCommentId(null);
    }
  };


  // SEARCH COMMENTS
  const filteredComments = comments.filter((comment) => {
    const content = (comment.content || "").toLowerCase();

    const author = (
      comment.author?.userName || ""
    ).toLowerCase();

    const postTitle = (
      comment.post?.title || ""
    ).toLowerCase();

    const searchText = search.toLowerCase().trim();

    return (
      content.includes(searchText) ||
      author.includes(searchText) ||
      postTitle.includes(searchText)
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
            All Blog Comments
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage comments across the blog.
          </p>

        </div>


        {/* COMMENTS SECTION */}
        <div className="rounded-lg bg-white p-6 shadow">

          {/* HEADER AND SEARCH */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

            <h2 className="text-xl font-semibold">
              Total Comments: {comments.length}
            </h2>

            <input
              type="text"
              placeholder="Search comments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />

          </div>


          {/* LOADING */}
          {loading && (
            <p className="text-gray-500">
              Loading comments...
            </p>
          )}


          {/* ERROR */}
          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}


          {/* COMMENTS TABLE */}
          {!loading && !error && (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px] text-left">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-3">
                      Comment
                    </th>

                    <th className="p-3">
                      Author
                    </th>

                    <th className="p-3">
                      Post Title
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

                  {filteredComments.map((comment) => (

                    <tr
                      key={comment._id}
                      className="border-b hover:bg-gray-50"
                    >

                      {/* COMMENT CONTENT */}
                      <td className="max-w-[300px] p-3 whitespace-normal break-words">
                        {comment.content}
                      </td>


                      {/* COMMENT AUTHOR */}
                      <td className="p-3">
                        {comment.author?.userName || "Unknown"}
                      </td>


                      {/* ASSOCIATED POST */}
                      <td className="p-3">
                        {comment.post?.title || "Post unavailable"}
                      </td>


                      {/* DATE */}
                      <td className="p-3">
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>


                      {/* ACTIONS */}
                      <td className="p-3">

                        <div className="flex items-center gap-4">

                          {/* VIEW POST */}
                          {comment.post?._id && (

                            <Link
                              to={`/post/${comment.post._id}#comments`}
                              className="text-blue-600 hover:underline"
                            >
                              View
                            </Link>

                          )}


                          {/* DELETE COMMENT */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteComment(comment._id)
                            }
                            disabled={
                              deletingCommentId === comment._id
                            }
                            className="cursor-pointer text-red-600 hover:underline disabled:opacity-50"
                          >

                            {deletingCommentId === comment._id
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
              {filteredComments.length === 0 && (

                <p className="py-6 text-center text-gray-500">
                  No comments found.
                </p>

              )}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default ManageComments;