import React from 'react';
import { FaSearch, FaGlobeAmericas } from 'react-icons/fa';

const CountrySearch = ({ countryName, setCountryName, onSearch, message }) => (
  <div className="fixed inset-x-0 top-4 px-4 sm:static sm:px-0 sm:mt-12 z-20 flex justify-center sm:justify-start">
    <div className="w-full max-w-md sm:w-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full mb-3">
          <FaGlobeAmericas className="text-white text-xl" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Explore Countries
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Discover country information instantly
        </p>
      </div>

      <div className="flex flex-col gap-4">
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
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        <button
          onClick={onSearch}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          Search Country
        </button>

        {message && (
          <div
            className={`text-center py-2 px-4 rounded-lg ${
              message.includes('not found')
                ? 'bg-red-50 text-red-600'
                : 'bg-green-50 text-green-600'
            } font-medium mt-2 transition-all`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default CountrySearch;
