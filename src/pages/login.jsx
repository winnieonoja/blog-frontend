import { IoLogoApple } from "react-icons/io";
import { AiFillGithub } from "react-icons/ai";
import { VscTwitter } from "react-icons/vsc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login(){

  const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [validateForm, setvalidateForm] = useState(false);
      const navigate = useNavigate();
      const [isLoading, setIsLoading] = useState(false);
      
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (email === "" || password === "") {
    setvalidateForm(true);
    return;
  }

  try {
    setIsLoading(true);

    const resp = await axios.post(
      "https://blog-backend-api-r9h1.onrender.com/api/auth/login",
      {
        email,
        password
      }
    );

    const data = resp.data;

    console.log("Login response:", data);

    if (data.success) {
      const userLog = {
        accessToken: data.data.accessToken,
        user: data.data.user
      };

      // Save login details
      localStorage.setItem("userLog", JSON.stringify(userLog));

      alert(data.message);

      // Redirect based on role
      if (data.data.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } else {
      alert(data.message || "Invalid email or password");
    }

  } catch (err) {
    console.error("Login error:", err);

    alert(
      err.response?.data?.message ||
      "Login failed. Please try again."
    );

  } finally {
    setIsLoading(false);
  }
};

  return(
    <div className="d">
      <section>
        <form onSubmit={handleSubmit}  className="w-[50%] mx-auto mt-10">
          <div className="object-center object-cover mb-5 mx-auto">
            <Link to="/">
              <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png" alt="" className="w-15 h-14 mx-auto"/>
              </Link>
          </div>
          <h2 className="font-bold text-3xl text-center mb-2">Join the DEV Community</h2>
          <p className="text-center text-gray-400 text-base mb-4">DEV Community is a community of 4,113,455 amazing developers</p>

              <button type="button" className="w-full mb-3 border border-gray-200 rounded-lg py-3 px-5 flex items-center">
               <IoLogoApple className="text-2xl" />
               <span className="flex-1 text-center font-medium">Continue with Apple</span>
              </button>

              <button type="button" className="w-full mb-3  border border-gray-200 rounded-lg py-3 px-5 flex items-center">
               {/* <IoLogoApple className="text-2xl" /> */}
               <img src="/communication.png" alt="" className="w-5 h-5" />
               <span className="flex-1 text-center font-medium">Continue with Facebook</span>
              </button>

              <button type="button" className="w-full mb-3 border border-gray-200 rounded-lg py-3 px-5 flex items-center">
               <AiFillGithub  className="text-2xl" />
               <span className="flex-1 text-center font-medium">Continue with GitHub</span>
              </button>

              <button type="button" className="w-full mb-3 border border-gray-200 rounded-lg py-3 px-5 flex items-center">
              
               <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20role%3D%22img%22%20aria-hidden%3D%22true%22%20class%3D%22crayons-icon%20crayons-icon--default%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M18.09%2018.75c2.115-1.973%203.052-5.25%202.49-8.393h-8.392v3.473h4.777a3.945%203.945%200%200%201-1.777%202.67l2.902%202.25Z%22%20fill%3D%22%234285F4%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Cpath%20d%3D%22M4.215%2015.982A9%209%200%200%200%2018.09%2018.75l-2.902-2.25a5.37%205.37%200%200%201-8.018-2.813l-2.955%202.296Z%22%20fill%3D%22%2334A853%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Cpath%20d%3D%22M7.17%2013.687c-.375-1.17-.375-2.25%200-3.42L4.215%207.965a9.06%209.06%200%200%200%200%208.025l2.955-2.303Z%22%20fill%3D%22%23FBBC02%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Cpath%20d%3D%22M7.17%2010.267c1.035-3.24%205.438-5.115%208.393-2.347l2.58-2.528A8.85%208.85%200%200%200%204.215%207.965l2.955%202.302Z%22%20fill%3D%22%23EA4335%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E" alt="" />
               <span className="flex-1 text-center font-medium">Continue with Google</span>
              </button>

              <button type="button" className="w-full mb-3 border border-gray-200 rounded-lg py-3 px-5 flex items-center">
               
               <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20310.59%20130.78%22%20role%3D%22img%22%20aria-labelledby%3D%22a3pun8vqchbfhr8thlxcy4tol1qplxql%22%20aria-hidden%3D%22true%22%20class%3D%22crayons-icon%20crayons-icon--default%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23242425%3B%7D.cls-2%7Bfill%3A%23e73427%3B%7D.cls-3%7Bfill%3A%231d539f%3B%7D.cls-4%7Bfill%3A%23f8b92a%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Ctitle%20id%3D%22a3pun8vqchbfhr8thlxcy4tol1qplxql%22%3Emlh-logo-color-dark%3C%2Ftitle%3E%3Cg%20id%3D%22Layer_2%22%20data-name%3D%22Layer%202%22%3E%3Cg%20id%3D%22Layer_1-2%22%20data-name%3D%22Layer%201%22%3E%3Cg%20id%3D%22mlh-logo-color-dark%22%3E%3Cg%20id%3D%22Major_League_Hacking%22%20data-name%3D%22Major%20League%20Hacking%22%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M15.65%2C114.54a2.79%2C2.79%2C0%2C0%2C1%2C1.68%2C2.51v13.22a.45.45%2C0%2C0%2C1-.45.44H13.62a.39.39%2C0%2C0%2C1-.3-.12.47.47%2C0%2C0%2C1-.12-.32v-12H10.57v12a.45.45%2C0%2C0%2C1-.12.31.34.34%2C0%2C0%2C1-.3.13h-3a.44.44%2C0%2C0%2C1-.44-.44h0v-12H4.13v12a.39.39%2C0%2C0%2C1-.33.44H.45A.4.4%2C0%2C0%2C1%2C0%2C130.4V114.76a.39.39%2C0%2C0%2C1%2C.33-.44H14.57A2.52%2C2.52%2C0%2C0%2C1%2C15.65%2C114.54Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M32%2C114.32A2.75%2C2.75%2C0%2C0%2C1%2C34.55%2C116a2.56%2C2.56%2C0%2C0%2C1%2C.23%2C1.06v13.22a.42.42%2C0%2C0%2C1-.42.44H31.08a.45.45%2C0%2C0%2C1-.45-.44h0v-4.2a.44.44%2C0%2C0%2C0-.11-.31.38.38%2C0%2C0%2C0-.31-.13H25.57a.45.45%2C0%2C0%2C0-.45.44h0v4.2a.38.38%2C0%2C0%2C1-.32.44H21.45a.38.38%2C0%2C0%2C1-.45-.32V117.06a2.75%2C2.75%2C0%2C0%2C1%2C.21-1.06%2C2.6%2C2.6%2C0%2C0%2C1%2C.59-.91%2C2.91%2C2.91%2C0%2C0%2C1%2C.91-.59%2C2.58%2C2.58%2C0%2C0%2C1%2C1.06-.22Zm-1.41%2C7.81V118h-5.5v4.12Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M49.52%2C114.45a.37.37%2C0%2C0%2C1%2C.13.31V128a2.58%2C2.58%2C0%2C0%2C1-.22%2C1.06%2C3%2C3%2C0%2C0%2C1-.59.91%2C2.47%2C2.47%2C0%2C0%2C1-.9.59%2C2.8%2C2.8%2C0%2C0%2C1-1.07.21h-7a2.8%2C2.8%2C0%2C0%2C1-1.07-.21A2.74%2C2.74%2C0%2C0%2C1%2C37.12%2C128v-5a.4.4%2C0%2C0%2C1%2C.33-.45H40.8a.41.41%2C0%2C0%2C1%2C.45.33v3.47a.41.41%2C0%2C0%2C0%2C.12.31.46.46%2C0%2C0%2C0%2C.32.11h3.4a.44.44%2C0%2C0%2C0%2C.31-.11.38.38%2C0%2C0%2C0%2C.13-.31V114.76a.45.45%2C0%2C0%2C1%2C.12-.31.37.37%2C0%2C0%2C1%2C.31-.13h3.26A.39.39%2C0%2C0%2C1%2C49.52%2C114.45Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M64.35%2C114.32a2.58%2C2.58%2C0%2C0%2C1%2C1.06.22A2.64%2C2.64%2C0%2C0%2C1%2C66.86%2C116a2.56%2C2.56%2C0%2C0%2C1%2C.23%2C1.06v10.89a2.64%2C2.64%2C0%2C0%2C1-.23%2C1.07%2C2.78%2C2.78%2C0%2C0%2C1-.58.9%2C2.51%2C2.51%2C0%2C0%2C1-.91.59%2C2.54%2C2.54%2C0%2C0%2C1-1.06.21H56.05A2.61%2C2.61%2C0%2C0%2C1%2C55%2C130.5a2.71%2C2.71%2C0%2C0%2C1-1.68-2.5V117.11a2.8%2C2.8%2C0%2C0%2C1%2C.21-1.07%2C2.45%2C2.45%2C0%2C0%2C1%2C.58-.9%2C2.91%2C2.91%2C0%2C0%2C1%2C.91-.59%2C2.55%2C2.55%2C0%2C0%2C1%2C1.06-.22Zm-1.41%2C4h-5.5v8.44H63Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M85.06%2C130.35a.22.22%2C0%2C0%2C1%2C0%2C.27.27.27%2C0%2C0%2C1-.25.11H81.09a.7.7%2C0%2C0%2C1-.37-.11.75.75%2C0%2C0%2C1-.29-.27L78%2C125.9a.17.17%2C0%2C0%2C0-.17-.09H75a.1.1%2C0%2C0%2C0-.12.08%2C0%2C0%2C0%2C0%2C0%2C0%2C0v4.36a.38.38%2C0%2C0%2C1-.34.43H71.21a.39.39%2C0%2C0%2C1-.44-.32.24.24%2C0%2C0%2C1%2C0-.12V114.76a.38.38%2C0%2C0%2C1%2C.32-.44H81.81a2.62%2C2.62%2C0%2C0%2C1%2C1.06.22A2.78%2C2.78%2C0%2C0%2C1%2C84.32%2C116a2.58%2C2.58%2C0%2C0%2C1%2C.22%2C1.06v6.16a2.66%2C2.66%2C0%2C0%2C1-.53%2C1.61%2C2.58%2C2.58%2C0%2C0%2C1-1.35%2C1h-.07c-.11%2C0-.14.08-.08.14v0ZM80.4%2C118.14H74.75v4H80.4Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M107.12%2C126.74a.39.39%2C0%2C0%2C1%2C.31.12.47.47%2C0%2C0%2C1%2C.12.32v3.1a.45.45%2C0%2C0%2C1-.12.31.37.37%2C0%2C0%2C1-.31.13H97a.4.4%2C0%2C0%2C1-.45-.32V114.76a.39.39%2C0%2C0%2C1%2C.33-.44h3.35a.39.39%2C0%2C0%2C1%2C.44.33.2.2%2C0%2C0%2C1%2C0%2C.11v11.56a.4.4%2C0%2C0%2C0%2C.13.31.47.47%2C0%2C0%2C0%2C.32.12Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M122.28%2C114.45a.4.4%2C0%2C0%2C1%2C.13.31v2.95a.37.37%2C0%2C0%2C1-.13.31.45.45%2C0%2C0%2C1-.31.12h-7.86a.09.09%2C0%2C0%2C0-.11.08s0%2C0%2C0%2C0v2.55c0%2C.06%2C0%2C.09.11.09h6.7a.37.37%2C0%2C0%2C1%2C.3.13.45.45%2C0%2C0%2C1%2C.12.31v2.35a.45.45%2C0%2C0%2C1-.12.31.37.37%2C0%2C0%2C1-.3.13h-6.7a.1.1%2C0%2C0%2C0-.11.08%2C0%2C0%2C0%2C0%2C0%2C0%2C0v2.53a.09.09%2C0%2C0%2C0%2C.07.12H122a.44.44%2C0%2C0%2C1%2C.44.43v3a.43.43%2C0%2C0%2C1-.43.44H110.32a.4.4%2C0%2C0%2C1-.45-.32V114.76a.45.45%2C0%2C0%2C1%2C.45-.44H122A.42.42%2C0%2C0%2C1%2C122.28%2C114.45Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M137.15%2C114.32a2.6%2C2.6%2C0%2C0%2C1%2C1.07.22%2C2.69%2C2.69%2C0%2C0%2C1%2C1.46%2C1.45%2C2.55%2C2.55%2C0%2C0%2C1%2C.22%2C1.06v13.22a.42.42%2C0%2C0%2C1-.42.44h-3.31a.44.44%2C0%2C0%2C1-.44-.44h0v-4.2a.45.45%2C0%2C0%2C0-.12-.31.37.37%2C0%2C0%2C0-.31-.13h-4.57a.45.45%2C0%2C0%2C0-.45.44h0v4.2a.39.39%2C0%2C0%2C1-.33.44H126.6a.38.38%2C0%2C0%2C1-.44-.32.24.24%2C0%2C0%2C1%2C0-.12V117.06a2.75%2C2.75%2C0%2C0%2C1%2C.21-1.06%2C2.6%2C2.6%2C0%2C0%2C1%2C.59-.91%2C2.91%2C2.91%2C0%2C0%2C1%2C.91-.59%2C2.55%2C2.55%2C0%2C0%2C1%2C1.06-.22Zm-1.4%2C7.81V118h-5.51v4.12Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M157.2%2C121.9a.41.41%2C0%2C0%2C1%2C.12.32V128a2.58%2C2.58%2C0%2C0%2C1-.22%2C1.06%2C3.21%2C3.21%2C0%2C0%2C1-.58.91%2C2.6%2C2.6%2C0%2C0%2C1-.91.59%2C2.78%2C2.78%2C0%2C0%2C1-1.06.21h-8.3a2.73%2C2.73%2C0%2C0%2C1-2.74-2.74v-10.9a2.78%2C2.78%2C0%2C0%2C1%2C.21-1.06%2C2.44%2C2.44%2C0%2C0%2C1%2C.58-.91%2C3%2C3%2C0%2C0%2C1%2C.9-.59%2C2.81%2C2.81%2C0%2C0%2C1%2C1.07-.22H156a.45.45%2C0%2C0%2C1%2C.45.45h0v3.09a.45.45%2C0%2C0%2C1-.45.45h-7.85a.47.47%2C0%2C0%2C0-.32.12.44.44%2C0%2C0%2C0-.13.31v7.59a.42.42%2C0%2C0%2C0%2C.13.3.43.43%2C0%2C0%2C0%2C.32.12h4.64a.4.4%2C0%2C0%2C0%2C.42-.38v-4.14a.42.42%2C0%2C0%2C1%2C.42-.44h3.28A.43.43%2C0%2C0%2C1%2C157.2%2C121.9Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M174.49%2C114.45a.44.44%2C0%2C0%2C1%2C.13.31V128a2.59%2C2.59%2C0%2C0%2C1-.23%2C1.06%2C3%2C3%2C0%2C0%2C1-.58.91%2C2.6%2C2.6%2C0%2C0%2C1-.91.59%2C2.8%2C2.8%2C0%2C0%2C1-1.07.21h-8.3a2.78%2C2.78%2C0%2C0%2C1-1.06-.21A2.75%2C2.75%2C0%2C0%2C1%2C161%2C129.1a2.8%2C2.8%2C0%2C0%2C1-.21-1.07V114.76a.39.39%2C0%2C0%2C1%2C.33-.44h3.35a.39.39%2C0%2C0%2C1%2C.44.33.2.2%2C0%2C0%2C1%2C0%2C.11v11.56a.4.4%2C0%2C0%2C0%2C.13.31.47.47%2C0%2C0%2C0%2C.32.12H170a.42.42%2C0%2C0%2C0%2C.3-.12.37.37%2C0%2C0%2C0%2C.12-.31V114.76a.45.45%2C0%2C0%2C1%2C.45-.44h3.26A.39.39%2C0%2C0%2C1%2C174.49%2C114.45Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M190.73%2C114.45a.44.44%2C0%2C0%2C1%2C.13.31v2.95a.4.4%2C0%2C0%2C1-.13.31.47.47%2C0%2C0%2C1-.32.12h-7.85a.1.1%2C0%2C0%2C0-.12.08v2.59c0%2C.06%2C0%2C.09.12.09h6.7a.39.39%2C0%2C0%2C1%2C.3.13.45.45%2C0%2C0%2C1%2C.12.31v2.35a.45.45%2C0%2C0%2C1-.12.31.39.39%2C0%2C0%2C1-.3.13h-6.7a.11.11%2C0%2C0%2C0-.12.08v2.57a.1.1%2C0%2C0%2C0%2C.08.12h7.89a.45.45%2C0%2C0%2C1%2C.45.43v3a.44.44%2C0%2C0%2C1-.43.44H178.77a.39.39%2C0%2C0%2C1-.45-.32.24.24%2C0%2C0%2C1%2C0-.12V114.76a.45.45%2C0%2C0%2C1%2C.45-.44h11.64A.42.42%2C0%2C0%2C1%2C190.73%2C114.45Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M215.88%2C114.32a.42.42%2C0%2C0%2C1%2C.44.42v15.54a.43.43%2C0%2C0%2C1-.43.44h-3.27a.45.45%2C0%2C0%2C1-.45-.44h0v-5.45a.4.4%2C0%2C0%2C0-.38-.42h-4.67a.45.45%2C0%2C0%2C0-.32.12.37.37%2C0%2C0%2C0-.13.31v5.45a.39.39%2C0%2C0%2C1-.33.44.21.21%2C0%2C0%2C1-.11%2C0H203a.39.39%2C0%2C0%2C1-.44-.33.2.2%2C0%2C0%2C1%2C0-.11V114.76a.39.39%2C0%2C0%2C1%2C.33-.44h3.35a.39.39%2C0%2C0%2C1%2C.44.33.2.2%2C0%2C0%2C1%2C0%2C.11V120a.39.39%2C0%2C0%2C0%2C.33.44h4.75a.39.39%2C0%2C0%2C0%2C.31-.12.47.47%2C0%2C0%2C0%2C.12-.32v-5.25a.45.45%2C0%2C0%2C1%2C.45-.44h3.25Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M231.06%2C114.32a2.6%2C2.6%2C0%2C0%2C1%2C1.07.22%2C2.69%2C2.69%2C0%2C0%2C1%2C1.46%2C1.45%2C2.55%2C2.55%2C0%2C0%2C1%2C.22%2C1.06v13.22a.42.42%2C0%2C0%2C1-.42.44h-3.28a.44.44%2C0%2C0%2C1-.44-.44v-4.2a.45.45%2C0%2C0%2C0-.12-.31.37.37%2C0%2C0%2C0-.31-.13h-4.65a.44.44%2C0%2C0%2C0-.44.44h0v4.2a.39.39%2C0%2C0%2C1-.33.44h-3.35a.39.39%2C0%2C0%2C1-.45-.32V117.06a2.75%2C2.75%2C0%2C0%2C1%2C.21-1.06%2C2.6%2C2.6%2C0%2C0%2C1%2C.59-.91%2C3%2C3%2C0%2C0%2C1%2C.91-.59%2C2.62%2C2.62%2C0%2C0%2C1%2C1.06-.22Zm-1.4%2C7.81V118h-5.51v4.12Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M241.68%2C118.42a.39.39%2C0%2C0%2C0-.12.31v7.59a.39.39%2C0%2C0%2C0%2C.12.31.47.47%2C0%2C0%2C0%2C.32.12h7.53a.42.42%2C0%2C0%2C1%2C.44.42v3.12a.42.42%2C0%2C0%2C1-.42.44h-9.37a2.71%2C2.71%2C0%2C0%2C1-1.06-.21%2C2.6%2C2.6%2C0%2C0%2C1-.91-.59%2C2.92%2C2.92%2C0%2C0%2C1-.79-2V117.07a2.71%2C2.71%2C0%2C0%2C1%2C.21-1.06%2C2.44%2C2.44%2C0%2C0%2C1%2C.58-.91%2C2.91%2C2.91%2C0%2C0%2C1%2C.91-.59%2C2.55%2C2.55%2C0%2C0%2C1%2C1.06-.22h9.35a.44.44%2C0%2C0%2C1%2C.44.43v3.11a.44.44%2C0%2C0%2C1-.42.45H242A.45.45%2C0%2C0%2C0%2C241.68%2C118.42Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M263%2C121.23a.12.12%2C0%2C0%2C0%2C0%2C.16l5.44%2C9a.22.22%2C0%2C0%2C1%2C0%2C.27.27.27%2C0%2C0%2C1-.25.11h-3.9a.7.7%2C0%2C0%2C1-.37-.11.66.66%2C0%2C0%2C1-.28-.27L260.13%2C124c0-.09-.09-.09-.12%2C0l-1.94%2C2.13a.9.9%2C0%2C0%2C0-.2.34%2C1.1%2C1.1%2C0%2C0%2C0-.08.4v3.47a.41.41%2C0%2C0%2C1-.33.45h-3.28a.39.39%2C0%2C0%2C1-.44-.33.24.24%2C0%2C0%2C1%2C0-.12V114.76a.39.39%2C0%2C0%2C1%2C.33-.44h3.35a.39.39%2C0%2C0%2C1%2C.44.33.2.2%2C0%2C0%2C1%2C0%2C.11v7l6.05-7.08a1%2C1%2C0%2C0%2C1%2C.26-.27.93.93%2C0%2C0%2C1%2C.4-.09h3.89c.13%2C0%2C.2%2C0%2C.23.09s0%2C.15-.08.24Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M275.65%2C130.28a.38.38%2C0%2C0%2C1-.32.44H272a.39.39%2C0%2C0%2C1-.45-.32V114.76a.39.39%2C0%2C0%2C1%2C.33-.44h3.35a.39.39%2C0%2C0%2C1%2C.44.33.2.2%2C0%2C0%2C1%2C0%2C.11Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M291.4%2C114.54a2.76%2C2.76%2C0%2C0%2C1%2C1.46%2C1.45%2C2.57%2C2.57%2C0%2C0%2C1%2C.21%2C1.06v13.22a.42.42%2C0%2C0%2C1-.42.44h-3.24a.39.39%2C0%2C0%2C1-.31-.12.47.47%2C0%2C0%2C1-.12-.32V118.72a.37.37%2C0%2C0%2C0-.13-.31.45.45%2C0%2C0%2C0-.31-.12H283.9a.47.47%2C0%2C0%2C0-.32.12.4.4%2C0%2C0%2C0-.13.31v11.56a.39.39%2C0%2C0%2C1-.33.44h-3.35a.39.39%2C0%2C0%2C1-.44-.32.24.24%2C0%2C0%2C1%2C0-.12V114.76a.39.39%2C0%2C0%2C1%2C.33-.44h10.71A2.45%2C2.45%2C0%2C0%2C1%2C291.4%2C114.54Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M310.41%2C121.9a.42.42%2C0%2C0%2C1%2C.13.32V128a2.59%2C2.59%2C0%2C0%2C1-.23%2C1.06%2C2.82%2C2.82%2C0%2C0%2C1-.58.91%2C2.51%2C2.51%2C0%2C0%2C1-.91.59%2C2.71%2C2.71%2C0%2C0%2C1-1.06.21h-8.3a2.78%2C2.78%2C0%2C0%2C1-1.06-.21%2C2.74%2C2.74%2C0%2C0%2C1-1.64-2.56V117.11A2.8%2C2.8%2C0%2C0%2C1%2C297%2C116a2.45%2C2.45%2C0%2C0%2C1%2C.58-.9%2C2.91%2C2.91%2C0%2C0%2C1%2C.91-.59%2C2.55%2C2.55%2C0%2C0%2C1%2C1.06-.22h9.68a.44.44%2C0%2C0%2C1%2C.44.44v3.1a.44.44%2C0%2C0%2C1-.44.44h-7.86a.45.45%2C0%2C0%2C0-.31.12.37.37%2C0%2C0%2C0-.13.31v7.59a.37.37%2C0%2C0%2C0%2C.13.31.4.4%2C0%2C0%2C0%2C.31.11h4.59a.4.4%2C0%2C0%2C0%2C.42-.38v-4.14a.42.42%2C0%2C0%2C1%2C.42-.44h3.28A.43.43%2C0%2C0%2C1%2C310.41%2C121.9Z%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22M%22%3E%3Cpath%20class%3D%22cls-2%22%20d%3D%22M98.85%2C1.41A17.32%2C17.32%2C0%2C0%2C1%2C108%2C10.57a16.51%2C16.51%2C0%2C0%2C1%2C1.41%2C6.68v86.06a2.78%2C2.78%2C0%2C0%2C1-2.75%2C2.8H86a2.43%2C2.43%2C0%2C0%2C1-1.92-.82%2C2.82%2C2.82%2C0%2C0%2C1-.74-2V25.12H66.79v78.22a2.87%2C2.87%2C0%2C0%2C1-.74%2C2%2C2.52%2C2.52%2C0%2C0%2C1-1.93.82H45.47a2.78%2C2.78%2C0%2C0%2C1-2.82-2.74V25.12H26.07v78.22a2.49%2C2.49%2C0%2C0%2C1-2.82%2C2.81H2.82A2.49%2C2.49%2C0%2C0%2C1%2C0%2C103.34V2.81A2.49%2C2.49%2C0%2C0%2C1%2C2.82%2C0H92.11A16.46%2C16.46%2C0%2C0%2C1%2C98.85%2C1.41Z%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22L%22%3E%3Cpath%20class%3D%22cls-3%22%20d%3D%22M199.19%2C80.38a2.69%2C2.69%2C0%2C0%2C1%2C2%2C.83%2C2.89%2C2.89%2C0%2C0%2C1%2C.78%2C2.05v20a2.83%2C2.83%2C0%2C0%2C1-.78%2C2%2C2.67%2C2.67%2C0%2C0%2C1-2%2C.84h-70.5c-2%2C0-3-1-3-2.88V2.88c0-1.92%2C1-2.88%2C3-2.88h21.64c2%2C0%2C3%2C1%2C3%2C2.88V77.65a2.49%2C2.49%2C0%2C0%2C0%2C.91%2C2%2C3.09%2C3.09%2C0%2C0%2C0%2C2.11.77Z%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20id%3D%22H%22%3E%3Cpath%20class%3D%22cls-4%22%20d%3D%22M307.54%2C0a2.94%2C2.94%2C0%2C0%2C1%2C2.14.84%2C2.76%2C2.76%2C0%2C0%2C1%2C.91%2C2.05V103.57a2.76%2C2.76%2C0%2C0%2C1-.91%2C2.05%2C2.94%2C2.94%2C0%2C0%2C1-2.14.84H285.62a2.93%2C2.93%2C0%2C0%2C1-2.13-.84%2C2.69%2C2.69%2C0%2C0%2C1-.91-2.05V68.44a2.63%2C2.63%2C0%2C0%2C0-.79-2%2C2.82%2C2.82%2C0%2C0%2C0-2.05-.76H249a3.09%2C3.09%2C0%2C0%2C0-2.13.76%2C2.5%2C2.5%2C0%2C0%2C0-.91%2C2v35.13c0%2C1.92-1%2C2.89-3%2C2.89H221.2c-2%2C0-3-1-3-2.89V2.89c0-1.93%2C1-2.89%2C3-2.89H243c2%2C0%2C3%2C1%2C3%2C2.89V37c0%2C1.92%2C1%2C2.88%2C3%2C2.88h30.81a2.74%2C2.74%2C0%2C0%2C0%2C2.06-.83%2C2.93%2C2.93%2C0%2C0%2C0%2C.79-2V2.89a2.71%2C2.71%2C0%2C0%2C1%2C.9-2.05A2.92%2C2.92%2C0%2C0%2C1%2C285.62%2C0Z%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="" />
               <span className="flex-1 text-center font-medium">Continue with MLH</span>
              </button>

              <button type="button" className="w-full  border border-gray-200 rounded-lg py-3 px-5 flex items-center">
               <VscTwitter  className="text-2xl" />
               <span className="flex-1 text-center font-medium">Continue with Twitter (X)</span>
              </button>

              <div className="relative my-10 flex items-center">
                <hr className="w-full border-gray-300" />
                <p className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-gray-500">or</p>  
             </div>

             <div className="mb-4">
                <label htmlFor="email" className="font-semibold text-base text-[#1D252C] mb-2 flex items-start gap-1.5">Email </label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="border border-gray-300 w-full py-2 px-2 rounded-md"/>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="font-semibold text-base text-[#1D252C] mb-2 flex items-start gap-1.5">Password  </label>
                <input  type="password" onChange={(e) => setPassword(e.target.value)} value={password}className="border border-gray-300 w-full py-2 px-2 rounded-md"/>
              </div>

              <div className="flex justify-between gap-2">
                <div className="flex gap-2">
                <input type="checkbox" />
                <p className="text-sm">Remeber me</p>
              </div>
              <div><button className="text-blue-400 text-sm">Forgot password?</button></div>
              </div>

              <div className="mb-4">
                <button type="submit" disabled={isLoading}  className="bg-blue-800 text-white mt-7 text-wh w-full py-3 px-2 rounded-md disabled:opacity-60 disabled:cursor-not-allowed">{isLoading ? "Logging in..." : "Login"}</button> 
              </div>

              <div className="flex justify-center text-center">
                <p className="max-w-md text-sm text-gray-400">
                  By signing in, you are agreeing to our{" "}
                  <span className="text-blue-800">privacy policy, terms of use</span>
                  <br /> and <span className="text-blue-800">code of conduct.</span>
                </p>
              </div>
            <hr className="w-full border-gray-200 my-8" />
            <p className="text-center text-base mb-20">New to DEV Community? <span className="text-blue-500"><Link to="/create_account">Create account</Link> </span>.</p>


  
        </form>
      </section>
    </div>
  )
}

export default Login;