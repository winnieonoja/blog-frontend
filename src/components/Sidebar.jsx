function Sidebar() {
  return (
    <nav className="space-y-1 text-sm">

      <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
        🏠 Home
      </a>

      <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
        📖 Reading List
      </a>

      <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
        🎙️ Podcasts
      </a>

      <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
        🎥 Videos
      </a>

      <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
        🏷️ Tags
      </a>

      <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
        💡 DEV Help
      </a>

      <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
        🛍️ Forem Shop
      </a>

      <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
        ❤️ Advertise on DEV
      </a>

      <div className="pt-6">
        <p className="px-3 pb-2 text-xs font-semibold uppercase text-gray-500">
          Other
        </p>

        <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
          About
        </a>

        <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
          Contact
        </a>

        <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
          Guides
        </a>

        <a className="block rounded-md px-3 py-2 hover:bg-gray-200">
          Software comparisons
        </a>
      </div>

    </nav>
  );
}

export default Sidebar;