import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import type { Movie, MovieResponse } from "./types/movie";
import "./App.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (
    searchQuery: string = ""
  ) => {
    setLoading(true);
    setError("");

    try {
      let url = "";

      if (searchQuery.trim()) {
        url =
          `${API_BASE_URL}/search/movie` +
          `?api_key=${API_KEY}` +
          `&query=${encodeURIComponent(searchQuery)}` +
          `&language=en-US&page=1`;
      } else {
        url =
          `${API_BASE_URL}/movie/popular` +
          `?api_key=${API_KEY}` +
          `&language=en-US&page=1`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data: MovieResponse = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while loading movies. Please check your API key and try again."
      );

      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = () => {
    if (!query.trim()) {
      fetchMovies();
      return;
    }

    fetchMovies(query);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Movie Explorer</h1>

        <p>
          Discover movies, ratings, release dates and more.
        </p>
      </header>

      <main>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={searchMovies}
          loading={loading}
        />

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <p className="loading">
            Loading movies...
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="section-heading">
              <h2>
                {query.trim()
                  ? `Search results for "${query}"`
                  : "Popular Movies"}
              </h2>

              <p>
                {movies.length} movies found
              </p>
            </div>

            <MovieList movies={movies} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;