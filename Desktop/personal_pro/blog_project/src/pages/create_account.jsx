import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function CreateAccount(){

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("")
  //const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [validateForm, setvalidateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
const handleSubmite = async (e) => {
  e.preventDefault();

  if (
    firstName === "" ||
    lastName === "" ||
    userName === "" ||
    email === "" ||
    password === ""
  ) {
    setvalidateForm(true);
    return;
  }

  const user_details = {
    firstName,
    lastName,
    userName,
    email,
    password,
  };

  try {
    setIsLoading(true);

    const resp = await axios.post(
      "https://blog-backend-api-r9h1.onrender.com/api/auth/register",
      user_details
    );

    console.log(resp.data);

    if (resp.data.success) {
      alert(resp.data.message);
      navigate("/login");
    } else {
      alert("An error occurred");
    }

    console.log("Created user:", resp.data.data);

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Registration failed. Please try again."
    );

  } finally {
    setIsLoading(false);
  }
};

  return(
    <div>
       
       <section className=" mt-10">
        
            <div className="object-center object-cover mb-5 mx-auto">
              <Link to="/">
              <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png" alt="" className="w-15 h-14 mx-auto"/>
              </Link>
            </div>
          <h2 className="font-bold text-3xl text-center mb-2">Join the DEV Community</h2>
          <p className="text-center text-gray-400 text-base mb-4">DEV Community is a community of 4,113,455 amazing developers</p>

            <form onSubmit={handleSubmite} className="w-[40%] mx-auto bg-white shadow-sm px-10 py-7 rounded-md">

              <label  htmlFor="profile_image" className="block text-[#1D252C] font-semibold text-base mb-2">Profile Image</label>
              <div className="relative mb-4">
                
                <input type="text" placeholder="No file chosen" className="  pl-32 w-full border border-gray-300  py-4 px-2 rounded-md"/>
                <button  type="button" className="absolute text-base font-semibold rounded-sm py-2 px-3 bg-gray-50 hover:bg-gray-100 left-3 top-1/2 -translate-y-1/2 ">Choose File</button>
              </div>

              <div className="mb-4">
                <label htmlFor="first_name" className="font-semibold text-base text-[#1D252C] mb-2 flex items-start gap-1.5">First Name <span className="text-md  text-red-600"> *</span></label>
                <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} className="border border-gray-300 w-full py-2 px-2 rounded-md"/>
                {validateForm==true && firstName == "" ? <span className="text-xs text-red-600">First name is required</span>: null}
              </div>

              <div className="mb-4">
                <label htmlFor="last_name" className="font-semibold text-base text-[#1D252C] flex items-start gap-1.5">Last Name <span className="text-md mb-2 text-red-600"> *</span></label>
                <input  type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} className="border border-gray-300 w-full py-2 px-2 rounded-md"/>
                {validateForm==true && lastName == "" ? <span className="text-xs text-red-600">Last name is required</span>: null}
              </div>

              <div className="mb-4">
                  <label htmlFor="user_name" className="font-semibold text-base text-[#1D252C] mb-2 flex items-start gap-1.5">User Name <span className="text-md  text-red-600"> *</span></label>

                <input  type="text" onChange={(e) => setUserName(e.target.value)} value={userName} className="border border-gray-300 w-full py-2 px-2 rounded-md"/>
                {validateForm==true && userName == "" ? <span className="text-xs text-red-600">User name is required</span>: null}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="font-semibold text-base text-[#1D252C] flex items-start gap-1.5">Email <span className="text-md mb-2 text-red-600"> *</span></label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="border border-gray-300 w-full py-2 px-2 rounded-md"/>
                {validateForm==true && email == "" ? <span className="text-xs text-red-600">Paasword is required</span>: null}
              </div>

              <div className="mb-7 relative">
                <label htmlFor="password" className="font-semibold text-base text-[#1D252C] flex items-start gap-1.5">Password <span className="text-md mb-2 text-red-600"> *</span></label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="border border-gray-300 w-full py-2 px-2 rounded-md"/>
                {validateForm==true && password == "" ? <span className="text-xs text-red-600">Password is required</span>: null}                
              </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-700 py-4 px-10 text-base font-bold my-5 rounded-md text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </button>
            </div>
             
            </form>
         
       </section>
      
    </div>
  )
}

export default CreateAccount;
   