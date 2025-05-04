import React, { useEffect, useState } from 'react';
import { FiSearch, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FiltersPanel = ({
  searchTerm,
  setSearchTerm,
  availableContinents,
  selectedContinents,
  toggleContinent,
  availableLanguages,
  selectedLanguages,
  toggleLanguage,
  populationRange,
  setPopulationRange,
  timezoneRange,
  setTimezoneRange,
  formatPopulation,
  formatTimezone,
  applyFilters,
  resetFilters,
  showFilters,
  setShowFilters,
}) => {
  const [continentSearch, setContinentSearch] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');

  const filteredContinents = availableContinents.filter((cont) =>
    cont.toLowerCase().includes(continentSearch.toLowerCase())
  );
  const filteredLanguages = availableLanguages.filter((lang) =>
    lang.toLowerCase().includes(languageSearch.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const timer = setTimeout(() => applyFilters(), 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const populationOptions = [
    { label: '0', value: 0 },
    { label: '10M', value: 10000000 },
    { label: '50M', value: 50000000 },
    { label: '100M', value: 100000000 },
    { label: '500M', value: 500000000 },
    { label: '1B', value: 1000000000 },
    { label: '1.5B', value: 1500000000 },
  ];

  const timezoneOptions = Array.from({ length: 27 }, (_, i) => i - 12).map(
    (tz) => ({
      label: tz >= 0 ? `UTC+${tz}` : `UTC${tz}`,
      value: tz,
    })
  );

  return (
    <div
      className={`
        fixed lg:sticky top-0 left-0 z-20 bg-white border-r border-gray-200
        w-full sm:w-80 md:w-96 lg:w-80 xl:w-96 h-screen lg:h-auto
        transform transition-transform duration-300 ease-in-out
        ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-lg lg:shadow-none
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex mt-14 justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FiSearch className="mr-2" /> Filters
          </h2>
          <button
            onClick={() => setShowFilters(false)}
            className="lg:hidden text-gray-500 hover:text-blue-600 p-1"
            aria-label="Close filters"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scroll">
          {/* Search Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Country
            </label>
            <div className="relative">
              <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Country name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear country search"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Continents */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">
                Continent
              </label>
              <span className="text-xs text-gray-500">
                {selectedContinents.length} selected
              </span>
            </div>
            <div className="relative mb-2">
              <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search continents..."
                value={continentSearch}
                onChange={(e) => setContinentSearch(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {continentSearch && (
                <button
                  onClick={() => setContinentSearch('')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear continent search"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1 custom-scroll">
              {filteredContinents.map((cont) => (
                <label
                  key={cont}
                  htmlFor={`continent-${cont}`}
                  className="flex items-center space-x-2 text-sm text-gray-700 truncate"
                >
                  <input
                    id={`continent-${cont}`}
                    type="checkbox"
                    checked={selectedContinents.includes(cont)}
                    onChange={() => toggleContinent(cont)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span>{cont}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">
                Language
              </label>
              <span className="text-xs text-gray-500">
                {selectedLanguages.length} selected
              </span>
            </div>
            <div className="relative mb-2">
              <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search languages..."
                value={languageSearch}
                onChange={(e) => setLanguageSearch(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {languageSearch && (
                <button
                  onClick={() => setLanguageSearch('')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear language search"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1 custom-scroll">
              {filteredLanguages.map((lang) => (
                <label
                  key={lang}
                  htmlFor={`language-${lang}`}
                  className="flex items-center space-x-2 text-sm text-gray-700 truncate"
                >
                  <input
                    id={`language-${lang}`}
                    type="checkbox"
                    checked={selectedLanguages.includes(lang)}
                    onChange={() => toggleLanguage(lang)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Population */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Population Range
            </label>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                {['Minimum', 'Maximum'].map((lbl, idx) => (
                  <div key={lbl}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {lbl}
                    </label>
                    <div className="relative">
                      <select
                        value={populationRange[idx]}
                        onChange={(e) =>
                          setPopulationRange((prev) =>
                            idx === 0
                              ? [+e.target.value, prev[1]]
                              : [prev[0], +e.target.value]
                          )
                        }
                        className="w-full pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {populationOptions.map((opt) => (
                          <option key={`${lbl}-${opt.value}`} value={opt.value}>
                            {formatPopulation(opt.value)}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timezones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone Range
            </label>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                {['Minimum', 'Maximum'].map((lbl, idx) => (
                  <div key={lbl}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {lbl}
                    </label>
                    <div className="relative">
                      <select
                        value={timezoneRange[idx]}
                        onChange={(e) =>
                          setTimezoneRange((prev) =>
                            idx === 0
                              ? [+e.target.value, prev[1]]
                              : [prev[0], +e.target.value]
                          )
                        }
                        className="w-full pl-3 pr-8 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {timezoneOptions.map((opt) => (
                          <option key={`${lbl}-${opt.value}`} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-200 flex space-x-3 mb-8">
            <button
              onClick={resetFilters}
              className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium transition"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default FiltersPanel;
