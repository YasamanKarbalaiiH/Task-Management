"use client";

interface SearchProps {
  onSearch: (value: string) => void;
}

function Search({ onSearch }: SearchProps) {
  return (
    <div className="flex h-11 w-full items-center gap-3 rounded-xl border border-border bg-white px-4 shadow-sm transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        fill="currentColor"
        className="shrink-0 text-text-muted"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>

      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
      />
    </div>
  );
}

export default Search;
