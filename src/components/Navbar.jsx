import React from 'react';
import { Search, Play, Clapperboard } from 'lucide-react';

const Navbar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <nav className="sticky top-0 z-50 bg-netflix-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-netflix-red p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
            <Clapperboard className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-netflix-red uppercase">
            Movie<span className="text-white">Flix</span>
          </h1>
        </div>

        {/* Search Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="relative w-full max-w-xl group"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-netflix-red transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for movies, series, stars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-netflix-red/50 focus:border-netflix-red transition-all duration-300 backdrop-blur-sm"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1.5 bottom-1.5 px-6 bg-netflix-red text-white text-sm font-bold rounded-full hover:bg-red-700 transition shadow-lg shadow-netflix-red/20"
          >
            Search
          </button>
        </form>

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-300">
          <a href="#" className="hover:text-netflix-red transition">Movies</a>
          <a href="#" className="hover:text-netflix-red transition">TV Shows</a>
          <a href="#" className="hover:text-netflix-red transition">Categories</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
