import React from 'react';
import { SortAsc, SortDesc, Type as TypeIcon, Calendar } from 'lucide-react';

const SortBar = ({ sortBy, setSortBy, movieCount }) => {
  const options = [
    { value: 'Title-asc', label: 'Title (A-Z)', icon: <TypeIcon size={14} /> },
    { value: 'Year-desc', label: 'Newest First', icon: <Calendar size={14} /> },
    { value: 'Year-asc', label: 'Oldest First', icon: <Calendar size={14} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-white/5 animate-fade-in">
      <div className="flex items-center gap-2">
        <span className="text-gray-400 font-medium">Found</span>
        <span className="text-netflix-red font-bold text-xl">{movieCount}</span>
        <span className="text-gray-400 font-medium">Movies</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400 font-medium whitespace-nowrap">Sort By:</span>
        <div className="relative group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-netflix-dark text-white text-sm rounded-lg block w-full p-2.5 px-4 pr-10 border border-white/10 focus:ring-netflix-red focus:border-netflix-red appearance-none cursor-pointer transition-all hover:bg-white/5"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-netflix-black">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500 group-hover:text-netflix-red">
            <SortAsc size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
