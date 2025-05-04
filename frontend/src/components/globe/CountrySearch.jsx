import React from 'react';
import { FaSearch, FaGlobeAmericas, FaTimes } from 'react-icons/fa';

const CountrySearch = ({
  countryName,
  setCountryName,
  onSearch,
  message,
  onClose,
  isMobile,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full border border-gray-100 relative">
    {isMobile && (
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="Close search panel"
      >
        <FaTimes size={16} />
      </button>
    )}

    <div className="flex flex-col items-center mb-4 sm:mb-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 sm:p-3 rounded-full mb-2 sm:mb-3">
        <FaGlobeAmericas className="text-white text-lg sm:text-xl" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
        Explore Countries
      </h2>
      <p className="text-gray-500 text-xs sm:text-sm mt-1">
        Discover country information instantly
      </p>
    </div>

    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Enter country name..."
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm sm:text-base"
        />
      </div>

      <button
        onClick={onSearch}
        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        Search Country
      </button>

      {message && (
        <div
          className={`text-center py-2 px-4 rounded-lg ${
            message.includes('not found')
              ? 'bg-red-50 text-red-600'
              : 'bg-green-50 text-green-600'
          } font-medium mt-1 sm:mt-2 transition-all text-sm sm:text-base`}
        >
          {message}
        </div>
      )}
    </div>
  </div>
);

export default CountrySearch;
