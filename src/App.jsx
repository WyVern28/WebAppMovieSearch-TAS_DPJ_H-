import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import MovieList from './components/MovieList';
import { searchMovies, getPopularMovies, getGenres, getMoviesByGenre } from './services/tmdbApi';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  // Load genres and popular movies on initial render
  useEffect(() => {
    loadGenres();
    loadPopularMovies();
  }, []);

  // Apply sorting and filtering when movies or sortBy changes
  useEffect(() => {
    let sorted = [...movies];

    // Sort movies
    switch (sortBy) {
      case 'release_date_desc':
        sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      case 'release_date_asc':
        sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        break;
      case 'rating_desc':
        sorted.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case 'rating_asc':
        sorted.sort((a, b) => a.vote_average - b.vote_average);
        break;
      case 'title_asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default: // popularity - keep original order
        break;
    }

    setFilteredMovies(sorted);
  }, [movies, sortBy]);

  const loadGenres = async () => {
    try {
      const genreList = await getGenres();
      setGenres(genreList);
    } catch (error) {
      console.error('Failed to load genres:', error);
    }
  };

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const data = await getPopularMovies();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Failed to load popular movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setSearchTerm(query);
    setSelectedGenre(''); // Reset genre filter when searching
    try {
      const data = await searchMovies(query);
      setMovies(data.results || []);
    } catch (error) {
      console.error('Failed to search movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId);
    setSearchTerm(''); // Reset search when selecting genre

    if (genreId === '') {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const data = await getMoviesByGenre(genreId);
      setMovies(data.results || []);
    } catch (error) {
      console.error('Failed to load movies by genre:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const getTitle = () => {
    if (searchTerm) {
      return `Search Results for "${searchTerm}"`;
    }
    if (selectedGenre) {
      const genre = genres.find(g => g.id === parseInt(selectedGenre));
      return genre ? `${genre.name} Movies` : 'Movies';
    }
    return 'Popular Movies';
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎬 Movie Search App</h1>
        <p className="subtitle">Discover your next favorite movie</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        sortBy={sortBy}
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
      />

      <div className="content">
        <h2 className="section-title">{getTitle()}</h2>
        <MovieList movies={filteredMovies} loading={loading} />
      </div>

      <footer className="app-footer">
        <p>Data provided by TMDb API | Final Project - Dasar Pemrograman Jaringan</p>
      </footer>
    </div>
  );
}

export default App;
