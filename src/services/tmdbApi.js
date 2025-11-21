import axios from 'axios';

// HARDCODE API KEY
const API_KEY = 'eab00c0a2a63d679c3be230508313bff';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

console.log('API_KEY:', API_KEY);
console.log('BASE_URL:', BASE_URL);

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = async (query) => {
  try {
    console.log('Searching for:', query);
    const response = await tmdbApi.get('/search/movie', {
      params: { query },
    });
    console.log('Search results:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getPopularMovies = async () => {
  try {
    console.log('Fetching popular movies...');
    const response = await tmdbApi.get('/movie/popular');
    console.log('Popular movies:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: { with_genres: genreId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
};

export default tmdbApi;