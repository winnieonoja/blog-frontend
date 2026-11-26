// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaFileAlt,
//   FaComments
// } from "react-icons/fa";

// function AdminSidebar({ activePage, setActivePage }) {

//   const menuItems = [
//     { name: "Dashboard", icon: FaTachometerAlt },
//     { name: "All Users", icon: FaUsers },
//     { name: "All Posts", icon: FaFileAlt },
//     { name: "All Comments", icon: FaComments }
//   ];

//   return (
//     <aside className="w-full bg-[#111827] p-5 text-white md:min-h-screen md:w-60">

//       <h2 className="mb-8 text-2xl font-bold">
//         Blog Admin
//       </h2>

//       <nav className="flex flex-wrap gap-2 md:flex-col">

//         {menuItems.map((item) => {

//           const Icon = item.icon;

//           return (
//             <button
//               key={item.name}
//               type="button"
//               onClick={() => setActivePage(item.name)}
//               className={`flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-left text-sm ${
//                 activePage === item.name
//                   ? "bg-[#3b49df] text-white"
//                   : "text-gray-300 hover:bg-gray-700"
//               }`}
//             >
//               <Icon />

//               {item.name}
//             </button>
//           );

//         })}

//       </nav>

//     </aside>
//   );
// }

// export default AdminSidebar;




// import { useNavigate, NavLink  } from "react-router-dom";

// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaFileAlt,
//   FaComments,
//   FaSignOutAlt
// } from "react-icons/fa";

// function AdminSidebar({ activePage, setActivePage }) {

//   const navigate = useNavigate();

//   const menuItems = [
//     { name: "Dashboard", icon: FaTachometerAlt },
//     { name: "All Users", icon: FaUsers },
//     { name: "All Posts", icon: FaFileAlt },
//     { name: "All Comments", icon: FaComments }
//   ];

//   // LOGOUT FUNCTION
//   const handleLogout = () => {

//     // Remove logged-in user information
//     localStorage.removeItem("userLog");

//     // Redirect to login page
//     navigate("/login", { replace: true });
//   };

//   return (
//     <aside className="flex w-full flex-col bg-[#111827] p-5 text-white md:min-h-screen md:w-60">

//       {/* LOGO */}
//       <h2 className="mb-8 text-2xl font-bold">
//         Blog Admin
//       </h2>

//       {/* NAVIGATION */}
//       <nav className="flex flex-wrap gap-2 md:flex-col">

//         {menuItems.map((item) => {

//           const Icon = item.icon;

//           return (
//             <button
//               key={item.name}
//               type="button"
//               onClick={() => setActivePage(item.name)}
//               className={`flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-left text-sm ${
//                 activePage === item.name
//                   ? "bg-[#3b49df] text-white"
//                   : "text-gray-300 hover:bg-gray-700"
//               }`}
//             >
//               <Icon />

//               {item.name}
//             </button>
//           );

//         })}

//       </nav>

//       {/* LOGOUT BUTTON */}
//       <div className="mt-8 md:mt-auto">

//         <button
//           type="button"
//           onClick={handleLogout}
//           className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-600 hover:text-white"
//         >
//           <FaSignOutAlt />

//           Logout
//         </button>

//       </div>

//     </aside>
//   );
// }

// export default AdminSidebar;

import { Link, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaComments,
  FaSignOutAlt
} from "react-icons/fa";

function AdminSidebar() {

  const navigate = useNavigate();

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("userLog");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-[250px] min-h-screen bg-[#111827] text-white p-6 flex flex-col justify-between">

      <div>

        {/* LOGO */}
        <h1 className="text-xl font-bold italic mb-10">
          Blog Admin
        </h1>

        {/* SIDEBAR LINKS */}
        <ul className="space-y-10 text-sm">

          {/* DASHBOARD */}
          <li className="hover:text-blue-400 flex gap-3 items-center text-gray-200 font-semibold">
            <FaTachometerAlt />

            <Link to="/admin/dashboard">
              Dashboard
            </Link>
          </li>

          {/* ALL USERS */}
          <li className="hover:text-blue-400 flex gap-3 items-center text-gray-200 font-semibold">
            <FaUsers />

            <Link to="/admin/users">
              All Users
            </Link>
          </li>

          {/* ALL POSTS */}
          <li className="hover:text-blue-400 flex gap-3 items-center text-gray-200 font-semibold">
            <FaFileAlt />

            <Link to="/admin/posts">
              All Posts
            </Link>
          </li>

          {/* ALL COMMENTS */}
          <li className="hover:text-blue-400 flex gap-3 items-center text-gray-200 font-semibold">
            <FaComments />

            <Link to="/admin/comments">
              All Comments
            </Link>
          </li>

        </ul>

      </div>


      {/* LOGOUT BUTTON */}
      <div className="mt-8">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-left text-sm text-red-400 hover:bg-red-600 hover:text-white"
        >
          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;