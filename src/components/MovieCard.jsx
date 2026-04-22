import React from 'react';
import { Star, Calendar, Info } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const { Title, Year, Poster, Type, imdbID } = movie;
  
  // Fallback image if poster is "N/A"
  const posterUrl = Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/400x600?text=No+Poster+Available';

  return (
    <div className="group relative bg-netflix-dark rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 ease-out cursor-pointer hover:shadow-netflix-red/20 border border-white/5">
      {/* Poster Container */}
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={posterUrl} 
          alt={Title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex gap-2 mb-2">
            <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
              <Info size={16} />
            </button>
            <button className="bg-gray-500/50 backdrop-blur-md text-white p-2 rounded-full hover:bg-gray-400/50 transition border border-white/20">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-1">
        <h3 className="text-white font-bold truncate group-hover:text-netflix-red transition-colors duration-300">
          {Title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1 font-medium">
            <Calendar size={12} /> {Year}
          </span>
          <span className="px-2 py-0.5 bg-white/10 rounded uppercase tracking-wider text-[10px] font-bold">
            {Type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
