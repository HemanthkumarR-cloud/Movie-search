import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-netflix-red/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-netflix-red rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-400 font-medium animate-pulse">Fetching blockbuster data...</p>
    </div>
  );
};

export default Loader;
