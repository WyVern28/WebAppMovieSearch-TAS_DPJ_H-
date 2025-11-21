import './FilterBar.css';

const FilterBar = ({ genres, selectedGenre, sortBy, onGenreChange, onSortChange }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="genre-select">Genre:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="release_date_desc">Release Date (Newest)</option>
          <option value="release_date_asc">Release Date (Oldest)</option>
          <option value="rating_desc">Rating (High to Low)</option>
          <option value="rating_asc">Rating (Low to High)</option>
          <option value="title_asc">Title (A-Z)</option>
          <option value="title_desc">Title (Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
