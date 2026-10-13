import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ToolbarButton({ children, extra = "" }) {
  return (
    <button className={"px-3 py-1 rounded hover:bg-gray-200 " + extra}>
      {children}
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState("edit"); 
  const [title, setTitle] = useState("");
 const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function revertChanges() {
    setTitle("");
    setTags("");
    setContent("");
  }

async function handlePublish() {
  const userLog = JSON.parse(localStorage.getItem("userLog"));

  // Validate login first
  if (!userLog?.accessToken) {
    alert("Please login to publish a post");
    return;
  }

  // Validate required fields
  if (!title.trim() || !content.trim()) {
    alert("Title and content are required");
    return;
  }

  try {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(
      "https://blog-backend-api-r9h1.onrender.com/api/post",
      formData,
      {
        headers: {
          Authorization: `Bearer ${userLog.accessToken}`,
        },
      }
    );

    console.log("Post created:", response.data);

    alert("Post published successfully");
    navigate("/")


    setTitle("");
    setTags("");
    setContent("");
    setImage(null);


  } catch (error) {
    console.error(
      "Publish post error:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Failed to publish post"
    );

  } finally {
    setIsLoading(false);
  }
}


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <header className="flex items-center justify-between px-4 py-4">

        {/* Left: logo + page title */}
        <div className="flex items-center gap-4">
          
          <div className="object-center object-cover mb-5 mx-auto">
              <Link to="/">
              <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png" alt="" className="w-13 h-10 mt-4 mx-auto"/>
              </Link>
            </div>
          <h1 className="text-xl font-semibold">Create Post</h1>
        </div>
        

        {/* eddit */}
        <div className="flex gap-8 text-lg">
          <button
            onClick={() => setTab("edit")}
            className={tab === "edit" ? "font-bold" : "text-gray-500"}
          >
            Edit
          </button>
          <button
            onClick={() => setTab("preview")}
            className={tab === "preview" ? "font-bold" : "text-gray-500"}
          >
            Preview
          </button>
        </div>

        {/* Right: close button */}
        <button className="text-3xl hover:bg-gray-200 rounded-md px-2">✕</button>
      </header>

      <main className="flex gap-8 px-4 lg:px-32 pb-32">

        {/* the white editor card */}
        <section className="bg-white border border-gray-200 rounded-xl flex-1 overflow-hidden">

          {tab === "edit" ? (
            <div>
              {/* Top part: buttons, title, tags */}
              <div className="p-8">
                <div className="grid grid-cols-3 gap-3">
                  <input
                  className="border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
                  <button className="border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50">🍌 Generate Image</button>
                  <button className="border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50">Cover Video Link</button>
                </div>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="New post title here..."
                  className="mt-8 w-full text-3xl font-bold placeholder-gray-500 outline-none"
                />

                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add up to 4 tags..."
                  className="mt-4 w-full text-lg placeholder-gray-500 outline-none"
                />
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-2 bg-gray-100 px-8 py-3 text-xl">
                <ToolbarButton extra="font-bold">B</ToolbarButton>
                <ToolbarButton extra="italic">I</ToolbarButton>
                <ToolbarButton>🔗</ToolbarButton>
                <ToolbarButton>1.</ToolbarButton>
                <ToolbarButton>•</ToolbarButton>
                <ToolbarButton extra="font-bold">H</ToolbarButton>
                <ToolbarButton>❝</ToolbarButton>
                <ToolbarButton>🖼</ToolbarButton>
                <ToolbarButton>{"</>"}</ToolbarButton>

                {/* ml-auto pushes this to the far right */}
                <div className="ml-auto">
                  <ToolbarButton>⋮</ToolbarButton>
                </div>
              </div>

              {/* Big writing area */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                className="w-full h-64 p-8 font-mono text-lg placeholder-gray-500 outline-none resize-none"
              />
            </div>
          ) : (
            // Preview view: shows what you typed
            <div className="p-8 min-h-[400px]">
              <h2 className="text-5xl font-extrabold">{title || "Untitled post"}</h2>
              <p className="mt-4 text-gray-500">{tags}</p>
              <p className="mt-6 text-lg whitespace-pre-wrap">
                {content || "Nothing to preview yet."}
              </p>
            </div>
          )}
        </section>

        {/* ---------- RIGHT: Publishing tips ----------
            "hidden lg:block" = hidden on small screens, visible on large ones */}
        <aside className="hidden lg:block pt-48 w-64 shrink-0">
          <h2 className="text-xl font-bold mb-4">Publishing Tips</h2>
          <ul className="list-disc pl-6 space-y-3 text-lg">
            <li>
              Ensure your post has a cover image set to make the most of the
              home feed and social media platforms.
            </li>
            <li>
              Share your post on social media platforms or with your co-workers
              or local communities.
            </li>
            <li>
              Ask people to leave questions for you in the comments. It's a
              great way to spark additional discussion.
            </li>
          </ul>
        </aside>
      </main>

      {/* ============ 3. BOTTOM BAR (stuck to the bottom of the screen) ============ */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-50 flex flex-wrap items-center gap-4 px-4 lg:px-32 py-4">
        {/* <button onClick={handlePublish} disabled={isLoading} className="bg-indigo-600 text-white text-lg font-medium rounded-md px-6 py-3 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? "Publish..." : "Publish"}
        </button> */}
        <button
          onClick={handlePublish}
          disabled={isLoading}
          className="bg-indigo-600 text-white text-lg font-medium rounded-md px-6 py-3 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Publishing..." : "Publish"}
        </button>

        <button className="bg-indigo-100 text-indigo-700 text-lg font-medium rounded-md px-6 py-3 hover:bg-indigo-200">
          Save Draft
        </button>
        <button className="text-lg px-3 py-2 rounded-md hover:bg-gray-200">
          🤖 AI Disclosure
        </button>
        <button className="text-lg px-3 py-2 rounded-md hover:bg-gray-200">
          ⚙️ Advanced Options
        </button>
        <button
          onClick={revertChanges}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          Revert new changes
        </button>
      </footer>

      {/* Blue button floating in the bottom-right corner */}
      <button className="fixed bottom-5 right-8 w-20 h-20 bg-indigo-600 text-white text-3xl rounded-lg shadow-lg hover:bg-indigo-700">
        🤖
      </button>
    </div>
  );
}