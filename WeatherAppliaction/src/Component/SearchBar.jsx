import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, onUseLocation, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md transition-all duration-300"
      >
        {/* Input Field */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 shadow-sm transition-all duration-200"
            disabled={loading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className={`px-6 py-3 rounded-full font-medium text-white transition-all duration-200 ${
            loading || !city.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 shadow-md'
          }`}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>

        {/* Location Button */}
        <button
          type="button"
          onClick={onUseLocation}
          disabled={loading}
          className={`px-6 py-3 rounded-full font-medium text-white flex items-center justify-center gap-2 transition-all duration-200 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 shadow-md'
          }`}
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
          ) : (
            <MapPin className="w-5 h-5" />
          )}
          <span className="hidden sm:inline">Use My Location</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
