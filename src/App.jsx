import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { searchMovies, getPopularMovies } from './services/tmdbApi';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // UBAH jadi true
  const [searchTerm, setSearchTerm] = useState('');

  // Load popular movies on initial render
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const data = await getPopularMovies();
      console.log('Setting movies:', data.results);
      setMovies(data.results || []); // Tambahkan fallback
    } catch (error) {
      console.error('Failed to load popular movies:', error);
      setMovies([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setSearchTerm(query);
    try {
      const data = await searchMovies(query);
      console.log('Setting search results:', data.results);
      setMovies(data.results || []); // Tambahkan fallback
    } catch (error) {
      console.error('Failed to search movies:', error);
      setMovies([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎬 Movie Search App</h1>
        <p className="subtitle">Discover your next favorite movie</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <div className="content">
        {searchTerm ? (
          <h2 className="section-title">Search Results for "{searchTerm}"</h2>
        ) : (
          <h2 className="section-title">Popular Movies</h2>
        )}
        <MovieList movies={movies} loading={loading} />
      </div>

      <footer className="app-footer">
        <p>Data provided by TMDb API | Final Project - Dasar Pemrograman Jaringan</p>
      </footer>
    </div>
  );
}

export default App;