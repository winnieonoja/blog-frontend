import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

// API URLs
const API_URL =
  "https://blog-backend-api-r9h1.onrender.com";

const POST_API = `${API_URL}/api/post`;
const COMMENTS_API = `${API_URL}/api/comments`;

// GET LOGGED-IN USER FROM JWT
const getAuthInfo = () => {
  const userLog = JSON.parse(localStorage.getItem("userLog"));
  const token = userLog?.accessToken;

  if (!token) {
    return {
      token: null,
      userId: null,
      role: null
    };
  }

  try {
    const payload = JSON.parse(
      atob(
        token.split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

    return {
      token,
      userId: payload.userId || payload.id,
      role: payload.role
    };

  } catch (error) {
    console.error("Unable to read token:", error);

    return {
      token,
      userId: null,
      role: null
    };
  }
};

function SinglePost() {

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { token, userId, role } = getAuthInfo();

  // POST STATES
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // LIKE STATES
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  // COMMENT STATES
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // EDIT COMMENT STATES
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [commentLoadingId, setCommentLoadingId] = useState(null);

  const [commentError, setCommentError] = useState("");

  // ====================================
  // FETCH SINGLE POST AND COMMENTS
  // ====================================

  useEffect(() => {

    let active = true;

    const fetchSinglePost = async () => {

      setLoading(true);
      setCommentsLoading(true);
      setError("");
      setCommentError("");
      setPost(null);
      setComments([]);

      try {

        const [postResult, commentsResult] =
          await Promise.allSettled([
            axios.get(`${POST_API}/${id}`),
            axios.get(`${COMMENTS_API}/${id}`)
          ]);

        // POST DATA
        if (postResult.status === "fulfilled") {

          const postData = postResult.value.data.data;

          if (active) {
            setPost(postData);

            setLikesCount(
              postData.likes?.length ?? 0
            );

            // Check if logged-in user liked post
            const alreadyLiked = postData.likes?.some(
              (likeId) =>
                String(likeId?._id ?? likeId) ===
                String(userId)
            );

            setLiked(
              Boolean(userId && alreadyLiked)
            );
          }

        } else {

          if (active) {
            setError(
              postResult.reason?.response?.data?.message ||
              "Unable to load this post."
            );
          }
        }

        // COMMENTS DATA
        if (commentsResult.status === "fulfilled") {

          const commentData = commentsResult.value.data.data;

          const fetchedComments =
            commentData?.comments || [];

          if (active) {

            setComments(fetchedComments);

            setCommentsCount(
              commentData?.totalComment ??
              commentData?.totalComments ??
              fetchedComments.length
            );
          }

        } else {

          if (active) {
            setCommentError(
              "Unable to load comments."
            );
          }
        }

      } catch (error) {

        if (active) {
          setError("Something went wrong.");
        }

      } finally {

        if (active) {
          setLoading(false);
          setCommentsLoading(false);
        }
      }
    };

    fetchSinglePost();

    return () => {
      active = false;
    };

  }, [id, userId]);


  // ====================================
  // SCROLL TO COMMENTS
  // ====================================

  useEffect(() => {

    if (
      !loading &&
      !commentsLoading &&
      location.hash === "#comments"
    ) {

      const element =
        document.getElementById("comments");

      element?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  }, [loading, commentsLoading, location.hash]);


  // ====================================
  // LIKE / UNLIKE POST
  // ====================================

  const handleLike = async () => {

    if (likeLoading) return;

    if (!token) {
      navigate("/login");
      return;
    }

    try {

      setLikeLoading(true);
      setError("");

      const response = await axios.patch(
        `${POST_API}/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const result = response.data.data;

      setLiked(result.liked);

      setLikesCount(result.likesCount);

    } catch (error) {

      console.error("Like error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to update like."
      );

    } finally {
      setLikeLoading(false);
    }
  };


  // ====================================
  // ADD COMMENT
  // ====================================

  const handleAddComment = async (e) => {

    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    if (!newComment.trim()) return;

    try {

      setSubmitting(true);
      setCommentError("");

      const response = await axios.post(
        `${COMMENTS_API}/${id}`,
        {
          content: newComment.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const createdComment = response.data.data;

      // Add new comment to the beginning
      setComments((prev) => [
        createdComment,
        ...prev
      ]);

      // Increase total comments
      setCommentsCount((prev) => prev + 1);

      // Clear textarea
      setNewComment("");

    } catch (error) {

      console.error("Add comment error:", error);

      setCommentError(
        error.response?.data?.message ||
        "Unable to add comment."
      );

    } finally {
      setSubmitting(false);
    }
  };


  // ====================================
  // START EDITING COMMENT
  // ====================================

  const handleEditClick = (comment) => {

    setEditingCommentId(comment._id);

    setEditContent(comment.content);

    setCommentError("");
  };


  // ====================================
  // UPDATE COMMENT
  // ====================================

  const handleUpdateComment = async (commentId) => {

    if (!editContent.trim()) return;

    try {

      setCommentLoadingId(commentId);
      setCommentError("");

      const response = await axios.patch(
        `${COMMENTS_API}/${commentId}`,
        {
          content: editContent.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedComment = response.data.data;

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? updatedComment
            : comment
        )
      );

      setEditingCommentId(null);
      setEditContent("");

    } catch (error) {

      console.error("Update comment error:", error);

      setCommentError(
        error.response?.data?.message ||
        "Unable to update comment."
      );

    } finally {
      setCommentLoadingId(null);
    }
  };


  // ====================================
  // DELETE COMMENT
  // ====================================

  const handleDeleteComment = async (commentId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    try {

      setCommentLoadingId(commentId);
      setCommentError("");

      await axios.delete(
        `${COMMENTS_API}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Remove deleted comment
      setComments((prev) =>
        prev.filter(
          (comment) => comment._id !== commentId
        )
      );

      // Decrease comment count
      setCommentsCount((prev) =>
        Math.max(0, prev - 1)
      );

    } catch (error) {

      console.error("Delete comment error:", error);

      setCommentError(
        error.response?.data?.message ||
        "Unable to delete comment."
      );

    } finally {
      setCommentLoadingId(null);
    }
  };


  // ====================================
  // LOADING PAGE
  // ====================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">

        <Navbar />

        <div className="py-20 text-center text-gray-500">
          Loading post...
        </div>

      </div>
    );
  }


  // ====================================
  // POST NOT FOUND
  // ====================================

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">

        <Navbar />

        <div className="py-20 text-center">

          <p className="text-red-500">
            {error || "Post not found."}
          </p>

          <Link
            to="/"
            className="mt-4 inline-block text-blue-600"
          >
            Back to homepage
          </Link>

        </div>

      </div>
    );
  }


  // ====================================
  // SINGLE POST PAGE
  // ====================================

  return (

    <div className="min-h-screen bg-[#f5f5f5] text-[#171717]">

      <Navbar />

      <main className="mx-auto max-w-[850px] px-4 py-6">

        {/* BACK BUTTON */}

        <Link
          to="/"
          className="mb-4 inline-block text-sm text-blue-600 hover:underline"
        >
          ← Back to homepage
        </Link>


        {/* POST CONTAINER */}

        <article className="overflow-hidden rounded-md border border-gray-200 bg-white">

          {/* POST IMAGE */}

          {post.image?.url && (

            <img
              src={post.image.url}
              alt={post.title}
              className="max-h-[450px] w-full object-cover"
            />

          )}


          <div className="p-6 md:p-10">

            {/* AUTHOR INFORMATION */}

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">

                {post.author?.userName
                  ?.charAt(0)
                  .toUpperCase() || "U"}

              </div>

              <div>

                <p className="font-semibold">
                  {post.author?.userName || "Unknown author"}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }
                  )}
                </p>

              </div>

            </div>


            {/* POST TITLE */}

            <h1 className="mb-6 text-3xl font-bold leading-tight md:text-4xl">

              {post.title}

            </h1>

            {/* TAGS */}

            {post.tags?.length > 0 && (

              <div className="mb-6 flex flex-wrap gap-3">

                {post.tags.map((tag) => (

                  <span
                    key={tag}
                    className="text-sm text-gray-500"
                  >
                    #{tag}
                  </span>

                ))}

              </div>

            )}


            {/* POST CONTENT */}

            <div className="mb-8 whitespace-pre-wrap break-words text-base leading-8 text-gray-700">

              {post.content}

            </div>

            {/* POST REACTIONS */}

            <div className="flex items-center gap-6 border-y border-gray-200 py-4">

              {/* LIKE BUTTON */}

              <button
                type="button"
                onClick={handleLike}
                disabled={likeLoading}
                aria-pressed={liked}
                aria-label={liked ? "Unlike post" : "Like post"}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 transition hover:text-red-500 disabled:opacity-50"
              >

                <span className="text-2xl">
                  {liked ? "❤️" : "🤍"}
                </span>

                <span>
                  {likesCount} reactions
                </span>

              </button>

              {/* COMMENT LINK */}

              <a href="#comments" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600" >

                <span className="text-2xl">
                  💬
                </span>

                <span>
                  {commentsCount} comments
                </span>

              </a>

            </div>

            {error && (
              <p className="mt-3 text-sm text-red-500">
                {error}
              </p>
            )}

            {/* COMMENTS SECTION */}

            <section
              id="comments"
              className="mt-10 scroll-mt-24"
            >

              <h2 className="mb-6 text-2xl font-bold">
                Comments ({commentsCount})
              </h2>


              {/* ADD COMMENT FORM */}

              {token ? (

                <form
                  onSubmit={handleAddComment}
                  className="mb-8"
                >

                  <textarea
                    value={newComment}
                    onChange={(e) =>
                      setNewComment(e.target.value)
                    }
                    placeholder="Write a comment..."
                    rows={4}
                    className="w-full resize-none rounded-md border border-gray-300 p-4 text-sm outline-none focus:border-blue-500"
                  />

                  <div className="mt-3 flex justify-end">

                    <button
                      type="submit"
                      disabled={
                        submitting || !newComment.trim()
                      }
                      className="cursor-pointer rounded-md bg-[#3b49df] px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      {submitting
                        ? "Posting..."
                        : "Post Comment"}

                    </button>

                  </div>

                </form>

              ) : (

                <div className="mb-8 rounded-md bg-gray-100 p-5 text-center">

                  <p className="mb-3 text-sm text-gray-600">
                    Please log in to leave a comment.
                  </p>

                  <Link
                    to="/login"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Log in
                  </Link>

                </div>

              )}


              {/* COMMENT ERROR */}

              {commentError && (

                <p
                  role="alert"
                  className="mb-4 text-sm text-red-500"
                >
                  {commentError}
                </p>

              )}


              {/* COMMENTS LOADING */}

              {commentsLoading && (

                <p className="text-sm text-gray-500">
                  Loading comments...
                </p>

              )}


              {/* NO COMMENTS */}

              {!commentsLoading &&
                comments.length === 0 &&
                !commentError && (

                <div className="rounded-md bg-gray-50 p-6 text-center">

                  <p className="text-sm text-gray-500">
                    No comments yet. Be the first to comment!
                  </p>

                </div>

              )}


              {/* COMMENTS LIST */}

              <div className="space-y-6">

                {comments.map((comment) => {

                  const commentAuthorId =
                    comment.author?._id ??
                    comment.author;

                  const postAuthorId =
                    post.author?._id ??
                    post.author;

                  const isCommentOwner =
                    Boolean(
                      userId &&
                      String(commentAuthorId) === String(userId)
                    );

                  const isPostOwner =
                    Boolean(
                      userId &&
                      String(postAuthorId) === String(userId)
                    );

                  const canDelete =
                    isCommentOwner ||
                    isPostOwner ||
                    (Boolean(token) && role === "admin");

                  const isEditing =
                    editingCommentId === comment._id;

                  return (

                    <div key={comment._id} className="rounded-md border border-gray-200 p-5" >

                      {/* COMMENT AUTHOR */}

                      <div className="mb-3 flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">

                          {comment.author?.userName
                            ?.charAt(0)
                            .toUpperCase() || "U"}

                        </div>

                        <div>

                          <p className="text-sm font-semibold">

                            {comment.author?.userName ||
                              "Unknown user"}

                          </p>

                          <p className="text-xs text-gray-500">

                            {new Date(
                              comment.createdAt
                            ).toLocaleDateString()}

                          </p>

                        </div>

                      </div>


                      {/* EDIT COMMENT FORM */}

                      {isEditing ? (

                        <div>

                          <textarea
                            value={editContent}
                            onChange={(e) =>
                            setEditContent(e.target.value)
                            }
                            rows={3}
                            className="w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-blue-500"
                          />

                          <div className="mt-3 flex gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateComment(comment._id)
                              }
                              disabled={
                                commentLoadingId === comment._id ||
                                !editContent.trim()
                              }
                              className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                            >

                              {commentLoadingId === comment._id
                                ? "Saving..."
                                : "Save"}

                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setEditingCommentId(null)
                              }
                              className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm"
                            >
                              Cancel
                            </button>

                          </div>

                        </div>

                      ) : (

                        <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">

                          {comment.content}

                        </p>

                      )}


                      {/* COMMENT ACTIONS */}

                      {!isEditing && (

                        <div className="mt-4 flex items-center gap-5">

                          {/* EDIT BUTTON */}

                          {isCommentOwner && (

                            <button
                              type="button"
                              onClick={() =>
                                handleEditClick(comment)
                              }
                              className="cursor-pointer text-xs text-blue-600 hover:underline"
                            >
                              Edit
                            </button>

                          )}


                          {/* DELETE BUTTON */}

                          {canDelete && (

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteComment(comment._id)
                              }
                              disabled={
                                commentLoadingId === comment._id
                              }
                              className="cursor-pointer text-xs text-red-500 hover:underline disabled:opacity-50"
                            >

                              {commentLoadingId === comment._id
                                ? "Deleting..."
                                : "Delete"}

                            </button>

                          )}

                        </div>

                      )}

                    </div>

                  );

                })}

              </div>

            </section>

          </div>

        </article>

      </main>

    </div>

  );
}

export default SinglePost;