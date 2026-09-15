import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
}

function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <p className="no-results">
        No movies found.
      </p>
    );
  }

  return (
    <section className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </section>
  );
}

export default MovieList;