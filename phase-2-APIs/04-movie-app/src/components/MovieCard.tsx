import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";

  return (
    <article className="movie-card">
      <div className="movie-poster">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster for ${movie.title}`}
          />
        ) : (
          <div className="no-poster">
            No Poster
          </div>
        )}
      </div>

      <div className="movie-info">
        <h2>{movie.title}</h2>

        <div className="movie-meta">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>{releaseYear}</span>
        </div>

        <p>
          {movie.overview || "No description available."}
        </p>

        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Movie
        </a>
      </div>
    </article>
  );
}

export default MovieCard;