import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import SortBar from './components/SortBar';
import Loader from './components/Loader';
import { AlertCircle } from 'lucide-react';

const DEFAULT_API_KEY = 'c901639d';

const MOCK_MOVIES = [
  { Title: "John Wick", Year: "2014", imdbID: "tt2401097", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1MzgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg" },
  { Title: "John Wick: Chapter 2", Year: "2017", imdbID: "tt4425200", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjE2NDkxNTY2M15BMl5BanBnXkFtZTgwMDc2NzE0MTI@._V1_SX300.jpg" },
  { Title: "John Wick: Chapter 3 - Parabellum", Year: "2019", imdbID: "tt6146586", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjgzNTM@._V1_SX300.jpg" },
  { Title: "John Wick: Chapter 4", Year: "2023", imdbID: "tt10366206", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg" },
  { Title: "The Batman", Year: "2022", imdbID: "tt1877830", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg" },
  { Title: "Interstellar", Year: "2014", imdbID: "tt0816692", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" },
  { Title: "Inception", Year: "2010", imdbID: "tt1375666", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
  { Title: "The Dark Knight", Year: "2008", imdbID: "tt0468569", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
];

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('movie_api_key') || DEFAULT_API_KEY);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('John Wick');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('Year-desc');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const API_URL = `https://www.omdbapi.com/?apikey=${apiKey}`;

  // Initial fetch
  useEffect(() => {
    if (!isDemoMode) {
      fetchMovies('John Wick');
    } else {
      setMovies(MOCK_MOVIES);
    }
  }, [apiKey, isDemoMode]);

  const fetchMovies = async (query) => {
    if (!query) return;
    if (isDemoMode) {
      const filtered = MOCK_MOVIES.filter(m => m.Title.toLowerCase().includes(query.toLowerCase()));
      setMovies(filtered);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}&s=${query}`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        if (data.Error === 'Invalid API key!') {
          // Automatic fallback to Demo Mode for a better first-time experience
          setIsDemoMode(true);
          setMovies(MOCK_MOVIES);
          setError(null); 
          setShowKeyInput(true);
        } else {
          setError(data.Error || 'No movies found.');
        }
      }
    } catch (err) {
      setError('Failed to fetch movies. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('movie_api_key', newKey);
    setShowKeyInput(false);
    setIsDemoMode(false);
  };

  const toggleDemoMode = () => {
    setIsDemoMode(true);
    setError(null);
    setShowKeyInput(false);
    setMovies(MOCK_MOVIES);
  };

  const handleSearch = () => {
    fetchMovies(searchTerm);
  };

  // Sort logic
  const sortedMovies = useMemo(() => {
    const sorted = [...movies];
    const [field, order] = sortBy.split('-');

    return sorted.sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];

      if (field === 'Year') {
        valueA = parseInt(valueA?.toString().substring(0, 4)) || 0;
        valueB = parseInt(valueB?.toString().substring(0, 4)) || 0;
      }

      if (order === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }, [movies, sortBy]);

  return (
    <div className="min-h-screen bg-netflix-black text-white selection:bg-netflix-red/30">
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch} 
      />
      
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        {/* Demo Mode Indicator */}
        {isDemoMode && (
          <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center gap-3 animate-fade-in text-yellow-500 text-sm font-bold">
            <span className="flex h-2 w-2 rounded-full bg-yellow-500 animate-ping"></span>
            You are currently in Demo Mode (Local Data)
            <button 
              onClick={() => { setIsDemoMode(false); setShowKeyInput(true); }}
              className="ml-4 text-white hover:underline bg-yellow-500/20 px-3 py-1 rounded-lg"
            >
              Switch to API Mode
            </button>
          </div>
        )}

        {/* API Key Banner if Error */}
        {showKeyInput && !isDemoMode && (
          <div className="mb-8 p-6 bg-netflix-red/10 border border-netflix-red/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="bg-netflix-red p-2 rounded-full">
                <AlertCircle size={20} />
              </div>
              <div className="max-w-md">
                <h3 className="font-bold">Invalid API Key</h3>
                <p className="text-sm text-gray-400">Public keys often reach limits. Use your own key or try Demo Mode to see the UI.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter API Key"
                  defaultValue={apiKey}
                  id="apiKeyInput"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                />
                <button 
                  onClick={() => handleUpdateKey(document.getElementById('apiKeyInput').value)}
                  className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Update
                </button>
              </div>
              <button 
                onClick={toggleDemoMode}
                className="w-full text-center py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition font-semibold"
              >
                View Demo Mode (Mock Data)
              </button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        {!loading && !error && movies.length > 0 && (
          <div className="mb-12 relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden group animate-fade-in">
            <img 
              src={movies[0]?.Poster !== 'N/A' ? movies[0]?.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000'} 
              alt="Featured" 
              className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/40 to-transparent flex flex-col justify-center p-8 md:p-16">
              <span className="text-netflix-red font-bold tracking-widest text-sm mb-4 uppercase">Featured Movie</span>
              <h2 className="text-4xl md:text-6xl font-black mb-4 max-w-2xl leading-tight">
                {movies[0]?.Title}
              </h2>
              <div className="flex items-center gap-4 text-gray-300 font-medium">
                <span>{movies[0]?.Year}</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span className="uppercase">{movies[0]?.Type}</span>
              </div>
            </div>
          </div>
        )}

        <SortBar 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          movieCount={movies.length} 
        />

        <div className="mt-8">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-netflix-red space-y-4 animate-fade-in text-center px-4">
              <AlertCircle size={48} />
              <p className="text-xl font-bold">{error}</p>
              {!showKeyInput && (
                <button 
                  onClick={() => fetchMovies('Batman')}
                  className="text-gray-400 hover:text-white underline underline-offset-4"
                >
                  Try searching for "Batman" instead?
                </button>
              )}
              {showKeyInput && (
                <button 
                  onClick={toggleDemoMode}
                  className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition shadow-lg shadow-white/5"
                >
                  Show Demo Movies Instead
                </button>
              )}
            </div>
          ) : (
            <MovieList movies={sortedMovies} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 px-6 text-center text-gray-500 text-sm">
        <p>&copy; 2026 MovieFlix. Built with React & Tailwind CSS.</p>
        <p className="mt-2 italic">Data provided by OMDb API.</p>
      </footer>
    </div>
  );
}

export default App;
