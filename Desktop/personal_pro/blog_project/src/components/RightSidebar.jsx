import { GiCircle } from "react-icons/gi";

function RightSidebar() {
  return (
    <div className="space-y-5">

      {/* DEV Challenges */}
      <section className="rounded-md border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          🚀 DEV Challenges
        </h2>

        <div className="space-y-3 text-sm">
          <p className="font-medium">
            What's a billboard?
          </p>

          <p className="text-gray-600">
            Manage preferences
          </p>
        </div>
      </section>

       {/* signup checklist card */}
      <section className="bg-[#4267b2] py-7 px-5 text-white">
        <h2 className="font-semibold text-2xl mb-3">Signup Checklist</h2>
        <p className="text-sm mb-5">0 of 3 completed</p>
        <div className="bg-blue-100 p-0.5 rounded-full"></div>
        <div className="flex items-center py-7 gap-2">
          <GiCircle />
          <p className="font-bold text-base hover:underline">Fill out your profile</p>
        </div>
        <div className="flex items-center gap-2">
          <GiCircle />
          <p className="font-bold text-base hover:underline">Say hi in the Welcome thread</p>
        </div>
        <div className="flex items-center gap-2 mt-7">
          <GiCircle />
          <p className="font-bold text-base hover:underline">Write your first post</p>
        </div>
      </section>

      {/* active discussions */}
      <section className="rounded-md border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Active discussions
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium">
              Wednesday, September 30
            </p>

            <p className="text-gray-600">
              10:45AM - 12:00PM ET: CodeMender
            </p>
          </div>

          <div className="mb-8">
            <button className="font-medium text-md text-left text-gray-500 hover:text-blue-800">
              The 7 walls JavaScript Hits - and How WebAssembly Gets Past Them
            </button>
            <button className="text-xs" mt-2>
              20 comments
            </button>
          </div>

          <div className="mb-8">
            <button className="font-medium text-md text-left text-gray-500 hover:text-blue-800">
              Welcome Thread -v 394
            </button>
            <button className="text-xs" mt-2>
              385 comments
            </button>
          </div>

          
        </div>
      </section>

      {/* Livestreams */}
      <section className="rounded-md border-2 border-black bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Livestreams 🎥
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium">
              Wednesday, September 30
            </p>

            <p className="text-gray-600">
              10:45AM - 12:00PM ET: CodeMender
            </p>
          </div>

          <div>
            <p className="font-medium">
              Thursday, October 1
            </p>

            <p className="text-gray-600">
              1:00PM - 2:00PM ET: Sentry Logs
            </p>
          </div>

          <div>
            <p className="font-medium">
              Friday, October 2
            </p>

            <p className="text-gray-600">
              2:00PM - 3:00PM ET: AWS Cloud Report
            </p>
          </div>
        </div>
      </section>

      {/* Partner Events */}
      <section className="rounded-md border-2 border-black bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Partner Events
        </h2>

        <div className="space-y-3 text-sm">
          <p>October 12–14 — AI Engineer NYC</p>
          <p>October 27–30 — Grace Hopper Celebration</p>
          <p>October 28–29 — GitHub Universe</p>
          <p>Nov 2–4 — AI DevCon</p>
        </div>
      </section>

      {/* Happening Now */}
      <section className="rounded-md border-2 border-black bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Happening Now! 🚀
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold">
              Sept. 23 - Oct. 11 📊
            </p>

            <p className="text-gray-600">
              Kaggle Benchmarking Challenge
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Sept 18 - Oct 4
            </p>

            <p className="text-gray-600">
              Sanity Challenge
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default RightSidebar;