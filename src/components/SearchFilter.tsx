import React, { useState } from "react";
import { Search, Plus } from "lucide-react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onAddCustomToken: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onAddCustomToken,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tokens by name or symbol..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
        />
      </div>

      <button
        onClick={onAddCustomToken}
        className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500/50 transition-all duration-200 px-4 py-3 rounded-xl text-white flex items-center gap-2 whitespace-nowrap"
      >
        <Plus className="w-5 h-5" />
        Add Token
      </button>
    </div>
  );
};
