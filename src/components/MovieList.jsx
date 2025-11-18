import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies, loading }) => {
  console.log('MovieList - movies:', movies);
  console.log('MovieList - loading:', loading);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!movies || movies.length === 0) {
    console.log('No movies to display');
    return <div className="no-results">No movies found. Try another search!</div>;
  }

  console.log('Rendering', movies.length, 'movies');

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;