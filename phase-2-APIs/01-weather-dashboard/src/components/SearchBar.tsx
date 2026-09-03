interface SearchBarProps {
  city: string;
  onCityChange: (city: string) => void;
  onSearch: () => void;
  loading: boolean;
}

function SearchBar({
  city,
  onCityChange,
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
        value={city}
        onChange={(event) => onCityChange(event.target.value)}
        placeholder="Enter a city..."
      />

      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;