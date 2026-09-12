import type { Book } from "../types/book";
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[];
}

function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return <p className="no-results">No books found.</p>;
  }

  return (
    <section className="book-list">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </section>
  );
}

export default BookList;