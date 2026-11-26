import { useEffect, useState } from "react";
import { Search, Menu, Bell, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // CHECK LOGIN STATUS
  useEffect(() => {
    const userLog = localStorage.getItem("userLog");

    if (userLog) {
      try {
        const parsedUser = JSON.parse(userLog);

        if (parsedUser?.accessToken && parsedUser?.user) {
          setCurrentUser(parsedUser.user);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error reading userLog:", error);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location]);

  // LOGOUT FUNCTION
  const handleLogout = () => {
    // Remove login information
    localStorage.removeItem("userLog");

    // Update navbar immediately
    setCurrentUser(null);

    // Redirect to homepage
    navigate("/", { replace: true });
  };

  const isLoggedIn = Boolean(currentUser);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-15 items-center gap-5 px-6">

        {/* MOBILE MENU */}
        <button
          type="button"
          aria-label="Open menu"
          className="lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* DEV LOGO */}
        <div>
          <Link to="/">
            <img
              src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
              alt="DEV logo"
              className="h-10 w-15"
            />
          </Link>
        </div>

        {/* SEARCH */}
        <div className="hidden max-w-[975px] flex-1 md:block">
          <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white">

            <Search
              size={32}
              strokeWidth={1.8}
              className="ml-4 text-gray-700"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent px-4 text-lg outline-none"
            />

            {/* POWERED BY ALGOLIA */}
            <div className="mr-4 hidden whitespace-nowrap text-base text-gray-500 lg:block">
              Powered by Algolia
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-4">

          {!isLoggedIn ? (
            <>
              {/* LOG IN */}
              <Link
                to="/login"
                className="rounded-md px-4 py-3 text-base font-medium hover:bg-gray-100"
              >
                Log in
              </Link>

              {/* CREATE ACCOUNT */}
              <Link
                to="/create_account"
                className="rounded-md border border-[#3b49df] px-4 py-3 text-base font-medium text-[#3b49df] hover:bg-[#3b49df] hover:text-white"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              {/* CREATE POST */}
              <Link
                to="/create_post"
                className="rounded-lg border border-[#3b49df] px-4 py-2 text-base font-semibold text-[#3b49df] hover:bg-[#eef0ff]"
              >
                Create Post
              </Link>

              {/* NOTIFICATION */}
              {/* <button
                type="button"
                aria-label="Notifications"
                className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
              >
                <Bell size={25} strokeWidth={1.8} />
              </button> */}<button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                
                <span>Logout</span>
              </button>

              {/* PROFILE */}
              <Link
                to="/profile"
                aria-label="View profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-xl font-semibold text-white"
              >
                <CgProfile size={22} />
              </Link>

              {/* LOGOUT */}
              {/* <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button> */}
            </>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;