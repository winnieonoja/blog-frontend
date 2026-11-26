import Navbar from "../components/Navbar";
import { RiCake2Fill,} from "react-icons/ri";
import {  GrNotes,} from "react-icons/gr";
import {  FaRegComment,} from "react-icons/fa";
import {  LiaHashtagSolid,} from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const userLog = JSON.parse(localStorage.getItem("userLog"));
  const currentUser = userLog?.user;

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentsCount, setCommentsCount] = useState(0);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError("");

      const userLog = JSON.parse(
        localStorage.getItem("userLog") || "null"
      );

      if (!userLog?.accessToken || !userLog?.user) {
        setPosts([]);
        setError("Please log in to view your profile.");
        return;
      }

      // Get logged-in user ID
      const userId =
        userLog.user.id || userLog.user._id;

      if (!userId) {
        setError("Unable to identify logged-in user.");
        return;
      }

      // Fetch posts belonging to this user
      const response = await axios.get(
        `https://blog-backend-api-r9h1.onrender.com/api/post/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userLog.accessToken}`,
          },
        }
      );

      console.log("User posts response:", response.data);

      // Your backend returns userPost
      const userPosts = response.data.data.userPost || [];

      setPosts(userPosts);

    } catch (err) {
      console.error(
        "Fetch profile posts error:",
        err.response?.data || err.message
      );

      setError("Unable to load your posts.");

    } finally {
      setIsLoading(false);
    }
  };

  fetchPosts();

}, []);

useEffect(() => {
  const fetchCommentCount = async () => {
    try {
      const userLog = JSON.parse(
        localStorage.getItem("userLog") || "null"
      );

      if (!userLog?.accessToken) {
        setCommentsCount(0);
        return;
      }

      const response = await axios.get(
        "https://blog-backend-api-r9h1.onrender.com/api/comments/my/count",
        {
          headers: {
            Authorization: `Bearer ${userLog.accessToken}`
          }
        }
      );

      console.log("User comment count:", response.data);

      setCommentsCount(
        response.data.data.totalComments
      );

    } catch (error) {
      console.error(
        "Error fetching user comments:",
        error.response?.data || error.message
      );
    }
  };

  fetchCommentCount();

}, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">

      <Navbar />

      {/*  COVER */}
      <section className="relative">

        {/* Black cover */}
        <div className="h-[184px] w-full bg-black"></div>

        {/*  PROFILE CARD */}
        <div className="relative mx-auto -mt-[55px] w-[78%] rounded-xl border border-gray-200 bg-white shadow">

          {/* Edit profile button */}
          <div className="absolute right-8 top-8">
            <button
              type="button" className="rounded-lg bg-[#3b49df] px-6 py-3 text-base font-semibold text-white hover:bg-[#3040c9]">
              Edit profile
            </button>
          </div>


          {/* Profile information */}
          <div className="flex flex-col items-center px-8 pb-12 pt-[112px]">

            <h1 className="mb-3 text-2xl font-bold text-black">
              {currentUser
                ? `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()
                : "Guest"}
            </h1>
            
            <p className="mb-2 text-xl text-black">
              {currentUser?.bio || "No bio added yet."}
            </p>

            {/* Joined date */}
            <div className="flex items-center gap-3 text-gray-500">

              <RiCake2Fill className="text-xl" />

              <p className="text-base">
                Joined on Sep 25, 2026
              </p>
              
            </div>

          </div>


          {/*  AVATAR */}
          <div
            className="absolute left-1/2 top-0 flex h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[10px] border-black bg-[#3b49df] text-5xl text-white">
            <CgProfile size={35} />
          </div>

        </div>

      </section>


      {/*  PROFILE STATISTICS  */}
      <section className="mx-auto mt-5 w-[78%]">

        <div className="w-[400px] rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm">

          {/* Posts */}
          <div className="mb-6 flex items-center gap-5">

            <GrNotes className="text-3xl text-gray-500" />

            <p className="text-xl text-gray-600">
               {posts.length} posts published
            </p>

          </div>

          {/* Comments */}
          <div className="mb-6 flex items-center gap-5">

            <FaRegComment className="text-3xl text-gray-500" />

            <p className="text-xl text-gray-600">
              {commentsCount} comments written
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Profile;