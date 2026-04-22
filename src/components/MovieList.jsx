import React from 'react';
import MovieCard from './MovieCard';
import { Film } from 'lucide-react';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 space-y-4 animate-fade-in">
        <Film size={64} strokeWidth={1} className="opacity-20" />
        <p className="text-xl font-medium">No movies found. Try another search!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 pb-12 animate-fade-in">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
