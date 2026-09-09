interface SearchBarProps {
  username: string;
  onUsernameChange: (username: string) => void;
  onSearch: () => void;
  loading: boolean;
}

function SearchBar({
  username,
  onUsernameChange,
  onSearch,
  loading,
}: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(event) => onUsernameChange(event.target.value)}
        placeholder="Enter a GitHub username..."
      />

      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;