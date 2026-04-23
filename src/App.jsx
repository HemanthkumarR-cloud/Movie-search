import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import SortBar from './components/SortBar';
import Loader from './components/Loader';
import { AlertCircle } from 'lucide-react';





function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('John Wick');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('Year-desc');

  const API_URL = 'https://api.tvmaze.com/search/shows?q=';

  // Initial fetch
  useEffect(() => {
    fetchMovies('John Wick');
  }, []);

  const fetchMovies = async (query) => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}${query}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        // Map TVMaze data to our movie schema
        const mappedMovies = data.map(item => ({
          Title: item.show.name,
          Year: item.show.premiered ? item.show.premiered.substring(0, 4) : 'N/A',
          Poster: item.show.image?.medium || 'N/A',
          imdbID: item.show.id.toString(),
          Type: item.show.type || 'Show'
        }));
        setMovies(mappedMovies);
      } else {
        setMovies([]);
        setError('No movies found.');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please check your connection.');
    } finally {
      setLoading(false);
    }
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
              <button 
                onClick={() => fetchMovies('Batman')}
                className="text-gray-400 hover:text-white underline underline-offset-4"
              >
                Try searching for "Batman" instead?
              </button>
            </div>
          ) : (
            <MovieList movies={sortedMovies} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 px-6 text-center text-gray-500 text-sm">
        <p>&copy; 2026 MovieFlix. Built with React & Tailwind CSS.</p>
        <p className="mt-2 italic">Data provided by Public TVMaze API.</p>
      </footer>
    </div>
  );
}

export default App;
