import type { Book } from "../types/book";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const authors = book.author_name
    ? book.author_name.join(", ")
    : "Unknown author";

  return (
    <article className="book-card">
      <div className="book-cover">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
          />
        ) : (
          <div className="no-cover">
            No Cover
          </div>
        )}
      </div>

      <div className="book-info">
        <h2>{book.title}</h2>

        <p>
          <strong>Author:</strong> {authors}
        </p>

        <p>
          <strong>First Published:</strong>{" "}
          {book.first_publish_year || "Unknown"}
        </p>

        {book.isbn && book.isbn.length > 0 && (
          <p>
            <strong>ISBN:</strong> {book.isbn[0]}
          </p>
        )}

        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Open Library
        </a>
      </div>
    </article>
  );
}

export default BookCard;