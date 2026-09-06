"use client";

interface SearchProps {
  onSearch: (value: string) => void;
}

function Search({ onSearch }: SearchProps) {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-white px-4 py-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="text-gray-400"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}

export default Search;
