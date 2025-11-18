import { getImageUrl } from '../services/tmdbApi';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>
        <p className="movie-release-date">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
