import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import type { Book, BookSearchResponse } from "./types/book";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query.trim()) {
      setError("Please enter a book title or author.");
      setBooks([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}&limit=20`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }

      const data: BookSearchResponse = await response.json();

      setBooks(data.docs);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Book Search</h1>
        <p>
          Search for books, authors, publication years and more.
        </p>
      </header>

      <main>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={searchBooks}
          loading={loading}
        />

        {error && <p className="error">{error}</p>}

        {!loading && !error && books.length === 0 && (
          <div className="welcome">
            <h2>Find your next book</h2>
            <p>
              Search by title, author, subject or keyword.
            </p>
          </div>
        )}

        {loading && (
          <p className="loading">
            Searching for books...
          </p>
        )}

        {!loading && books.length > 0 && (
          <>
            <p className="results-count">
              Showing {books.length} results
            </p>

            <BookList books={books} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;