import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiMessageRounded } from "react-icons/bi";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FeedTabs from "../components/FeedTabs";
import PostCard from "../components/PostCard";
import RightSidebar from "../components/RightSidebar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likedPostIds, setLikedPostIds] = useState([]);

  useEffect(() => {
  let active = true;

  const fetchPosts = async () => {
    try {
      const API =
        "https://blog-backend-api-r9h1.onrender.com/api/post";

      const token = localStorage.getItem("token");

      // Fetch all posts
      const postsResponse = await axios.get(
        `${API}/all-post`
      );

      if (active) {
        setPosts(postsResponse.data.data.posts || []);
      }

      // Fetch posts liked by logged-in user
      if (token) {
        try {
          const likesResponse = await axios.get(
            `${API}/my-liked-posts`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (active) {
            setLikedPostIds(
              likesResponse.data.data || []
            );
          }

        } catch (likesError) {
          console.error(
            "Unable to fetch liked posts:",
            likesError
          );
        }
      }

    } catch (error) {
      console.error("Fetch posts error:", error);

      if (active) {
        setError("Unable to load posts.");
      }

    } finally {
      if (active) {
        setLoading(false);
      }
    }
  };

  fetchPosts();

  return () => {
    active = false;
  };
}, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#171717]">
      <Navbar />

      <main className="mx-auto max-w-[1280px] px-4 py-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_minmax(0,1fr)_300px]">

          {/* Left sidebar */}
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>

          {/* Main feed */}
          <section className="min-w-0">
            <FeedTabs />

            <div className="bg-white p-4 rounded-sm">
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full bg-white shadow-sm rounded-sm p-2 text-base"
              />
            </div>

            <div className="flex justify-between mt-3">
              <div className="border border-gray-300 rounded-full p-1.5 shadow flex gap-4">
                <button className="bg-[#4267b2] cursor-pointer text-white text-sm py-1 px-5 rounded-full">
                  Discover
                </button>

                <button className="text-sm py-1 px-5 cursor-pointer">
                  Following
                </button>

                <button className="text-sm py-1 px-5 cursor-pointer">
                  Curated
                </button>

                <button className="text-sm py-1 px-5 cursor-pointer">
                  Latest
                </button>
              </div>

              <div>
                <button className="hover:bg-gray-100 text-3xl cursor-pointer">
                  ...
                </button>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="bg-white mt-3 p-5 text-center">
                Loading posts...
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-white mt-3 p-5 text-center text-red-500">
                {error}
              </div>
            )}

            {/* Posts */}
            {!loading && !error && (
              <div className="mt-2 space-y-2">
                {posts.length > 0 ? (
                  posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    initialLiked={likedPostIds.includes(post._id)}
                  />
                ))
                ) : (
                  <div className="bg-white p-5 text-center">
                    No posts available.
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <RightSidebar />
          </aside>

        </div>
      </main>
    </div>
  );
}

export default Home;




