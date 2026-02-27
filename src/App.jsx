import React, { useState } from "react";
import "./App.css";

function App() {
  // --- 1. State ---
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Action");
  const [filter, setFilter] = useState("All"); // All, Watched, Unwatched

  // --- 2. Derived State (Computed during render) ---
  const totalMovies = movies.length;
  const watchedCount = movies.filter((m) => m.watched).length;
  const unwatchedCount = totalMovies - watchedCount;

  const filteredMovies = movies.filter((movie) => {
    if (filter === "Watched") return movie.watched;
    if (filter === "Unwatched") return !movie.watched;
    return true; // "All"
  });

  // --- 3. Event Handlers ---
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMovie = {
      id: crypto.randomUUID(), // Unique and stable ID
      title: title.trim(),
      genre: genre,
      watched: false,
    };

    setMovies([...movies, newMovie]);
    setTitle(""); // Reset input
    setGenre("Action"); // Reset select
  };

  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // --- 4. Render ---
  return (
    <div className="app-container">
      <header className="header">
        <h1>🎬 CinemaTrack</h1>
        <p className="subtitle">Your Movie Watchlist</p>
      </header>

      {/* Summary Stats */}
      <div className="stats-board">
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <span className="stat-value">{totalMovies}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Watched</span>
          <span className="stat-value text-green">{watchedCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Unwatched</span>
          <span className="stat-value text-orange">{unwatchedCount}</span>
        </div>
      </div>

      {/* Add Movie Form */}
      <form className="add-form" onSubmit={handleAddMovie}>
        <input
          type="text"
          placeholder="Movie Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="select-field"
        >
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>

      {/* Filter Controls */}
      <div className="filter-controls">
        {["All", "Watched", "Unwatched"].map((f) => (
          <button
            key={f}
            className={`btn btn-filter ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Conditional Messages */}
      {watchedCount === totalMovies && totalMovies > 0 && (
        <div className="alert success-alert">
          You watched everything! Time to add more movies.
        </div>
      )}

      {/* Movies List */}
      <div className="movies-list">
        {filteredMovies.length === 0 ? (
          <div className="empty-state">
            <p>No movies found. Add one!</p>
          </div>
        ) : (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className={`movie-card ${movie.watched ? "watched" : ""}`}
            >
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <span className="movie-genre">{movie.genre}</span>
                <span
                  className={`badge ${
                    movie.watched ? "badge-watched" : "badge-unwatched"
                  }`}
                >
                  {movie.watched ? "Watched ✓" : "Unwatched"}
                </span>
              </div>

              <div className="movie-actions">
                <button
                  onClick={() => handleToggleWatched(movie.id)}
                  className={`btn ${
                    movie.watched ? "btn-outline" : "btn-success"
                  }`}
                >
                  {movie.watched ? "Undo" : "Watch"}
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
