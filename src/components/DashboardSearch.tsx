import React from 'react';
import { Search, ArrowUpDown, X, Filter } from 'lucide-react';

interface DashboardSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  tagFilter: string;
  setTagFilter: (tag: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  allTags: string[];
}

const DashboardSearch: React.FC<DashboardSearchProps> = ({
  searchQuery,
  setSearchQuery,
  tagFilter,
  setTagFilter,
  sortBy,
  setSortBy,
  allTags
}) => {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or barcode..."
          className="block w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Sort Dropdown */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ArrowUpDown size={16} className="text-slate-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none"
            >
              <option value="survival">Sort by Survival Days</option>
              <option value="name">Sort by Name (A-Z)</option>
              <option value="expiration">Sort by Expiration Status</option>
              <option value="value">Sort by Total Value (High to Low)</option>
              <option value="quantity">Sort by Item Count</option>
            </select>
          </div>
        </div>

        {/* Tag Filter Dropdown */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-slate-400" />
            </div>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Tag Chips (Horizontal Scroll) */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        <button
          onClick={() => setTagFilter('')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${tagFilter === ''
            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setTagFilter(tag)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${tagFilter === tag
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSearch;
