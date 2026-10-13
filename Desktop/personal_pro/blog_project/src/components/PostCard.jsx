// function PostCard({ post }) {
//   return (
//     <article className="rounded-md border border-gray-200 bg-white px-5 py-5 hover:border-gray-300">

//       <div className="ml-12">
//         <div className="mb-3">
//           <p className="text-sm font-medium">
//             {post.author}
//           </p>

//           <p className="text-xs text-gray-500">
//             {post.date}
//           </p>
//         </div>

//         <h2 className="mb-2 text-2xl font-bold leading-tight hover:text-[#3b49df]">
//           {post.title}
//         </h2>

//         {post.description && (
//           <p className="mb-3 text-sm text-gray-600">
//             {post.description}
//           </p>
//         )}

//         <div className="mb-4 flex flex-wrap gap-2">
//           {post.tags.map((tag) => (
//             <span
//               key={tag}
//               className="text-sm text-gray-600"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         <div className="flex items-center gap-4 text-sm text-gray-500">
//           <span>
//             ❤️ {post.reactions} reactions
//           </span>

//           <span>
//             💬 {post.comments} comments
//           </span>

//           <span className="ml-auto">
//             {post.readTime}
//           </span>
//         </div>
//       </div>

//     </article>
//   );
// }

// export default PostCard;





// function PostCard({ post }) {
//   return (
//     <article className="rounded-md border border-gray-200 bg-white px-5 py-5 hover:border-gray-300">

//       {/* Cover Image */}
//       {post.image?.url && (
//         <img
//           src={post.image.url}
//           alt={post.title}
//           className="mb-5 h-64 w-full rounded-md object-cover"
//         />
//       )}

//       <div className="ml-12">

//         {/* Author */}
//         <div className="mb-3">
//           <p className="text-sm font-medium">
//             {post.author?.userName || "Unknown author"}
//           </p>

//           <p className="text-xs text-gray-500">
//             {new Date(post.createdAt).toLocaleDateString()}
//           </p>
//         </div>

//         {/* Title */}
//         <h2 className="mb-2 text-2xl font-bold leading-tight hover:text-[#3b49df]">
//           {post.title}
//         </h2>

//         {/* Content */}
//         <p className="mb-3 text-sm text-gray-600">
//           {post.content}
//         </p>

//         {/* Reactions / Comments */}
//         <div className="flex items-center gap-4 text-sm text-gray-500">

//           <span>
//             ❤️ {post.likes?.length || 0} reactions
//           </span>

//           <span>
//             💬 {post.comments?.length || 0} comments
//           </span>

//         </div>

//       </div>
//     </article>
//   );
// }

// export default PostCard;






// import { Link } from "react-router-dom";

// function PostCard({ post }) {
//   return (
//     <article className="rounded-md border border-gray-200 bg-white px-5 py-5 hover:border-gray-300">

//       {/* Cover Image */}
//       {post.image?.url && (
//         <Link to={`/post/${post._id}`}>
//           <img
//             src={post.image.url}
//             alt={post.title}
//             className="mb-5 h-64 w-full rounded-md object-cover"
//           />
//         </Link>
//       )}

//       <div className="ml-12">

//         {/* Author */}
//         <div className="mb-3">
//           <p className="text-sm font-medium">
//             {post.author?.userName || "Unknown author"}
//           </p>

//           <p className="text-xs text-gray-500">
//             {new Date(post.createdAt).toLocaleDateString()}
//           </p>
//         </div>

//         {/* Title */}
//         <Link to={`/post/${post._id}`}>
//           <h2 className="mb-2 text-2xl font-bold leading-tight hover:text-[#3b49df]">
//             {post.title}
//           </h2>
//         </Link>

//         {/* Short preview */}
//         <p className="mb-3 text-sm text-gray-600">
//           {post.content?.length > 150
//             ? `${post.content.substring(0, 150)}...`
//             : post.content}
//         </p>

//         {/* Tags */}
//         {post.tags?.length > 0 && (
//           <div className="mb-4 flex flex-wrap gap-2">
//             {post.tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="text-sm text-gray-600"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Reactions / Comments */}
//         <div className="flex items-center gap-4 text-sm text-gray-500">

//           <span>
//             ❤️ {post.likes?.length || 0} reactions
//           </span>

//           <span>
//             💬 {post.comments?.length || 0} comments
//           </span>

//         </div>

//       </div>
//     </article>
//   );
// }

// export default PostCard;





import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function PostCard({ post, initialLiked = false }) {

  const navigate = useNavigate();

  const [liked, setLiked] = useState(initialLiked);

  const [likesCount, setLikesCount] = useState(
    post.likesCount ?? post.likes?.length ?? 0
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync the heart with the user's saved likes
  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked, post._id]);

  // LIKE / UNLIKE
  const handleLike = async () => {
    if (loading) return;

    // const token = localStorage.getItem("accessToken");
    const userLog = JSON.parse(localStorage.getItem("userLog"));

const token = userLog?.accessToken; 

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.patch(
        `https://blog-backend-api-r9h1.onrender.com/api/post/like/${post._id}`,
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
        "Unable to update like"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="rounded-md border border-gray-200 bg-white px-5 py-5 hover:border-gray-300">

      {/* Cover Image */}
      {post.image?.url && (
        <Link to={`/post/${post._id}`}>
          <img
            src={post.image.url}
            alt={post.title}
            className="mb-5 h-64 w-full rounded-md object-cover"
          />
        </Link>
      )}

      <div className="ml-12">

        {/* Author */}
        <div className="mb-3">
          <p className="text-sm font-medium">
            {post.author?.userName || "Unknown author"}
          </p>

          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Title */}
        <Link to={`/post/${post._id}`}>
          <h2 className="mb-2 text-2xl font-bold leading-tight hover:text-[#3b49df]">
            {post.title}
          </h2>
        </Link>

        {/* Short preview */}
        <p className="mb-3 text-sm text-gray-600">
          {post.content?.length > 150
            ? `${post.content.substring(0, 150)}...`
            : post.content}
        </p>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Reactions / Comments */}
        <div className="flex items-center gap-5 text-sm text-gray-500">

          {/* Like / Unlike */}
          <button
            type="button"
            onClick={handleLike}
            disabled={loading}
            aria-pressed={liked}
            aria-label={liked ? "Unlike post" : "Like post"}
            className="flex cursor-pointer items-center gap-2 transition hover:text-red-500 disabled:opacity-50"
          >
            <span className="text-xl">
              {liked ? "❤️" : "🤍"}
            </span>

            <span>
              {likesCount} reactions
            </span>
          </button>

          {/* Comments */}
          <Link
            to={`/post/${post._id}#comments`}
            className="flex items-center gap-2 transition hover:text-blue-600"
          >
            <span className="text-xl">💬</span>

            <span>
              {post.commentsCount ?? 0} comments
            </span>
          </Link>

        </div>

        {error && (
          <p
            role="alert"
            className="mt-2 text-xs text-red-500"
          >
            {error}
          </p>
        )}

      </div>
    </article>
  );
}

export default PostCard;