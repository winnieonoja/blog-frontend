function FeedTabs() {
  return (
    <div className="flex items-center gap-2">
      <button className="rounded-md px-3 py-2 text-lg font-medium hover:bg-white">
        Relevant
      </button>

      <button className="rounded-md px-3 py-2 text-lg hover:bg-white">
        Latest
      </button>

      <button className="rounded-md px-3 py-2 text-lg hover:bg-white">
        Top
      </button>
    </div>
  );
}

export default FeedTabs;