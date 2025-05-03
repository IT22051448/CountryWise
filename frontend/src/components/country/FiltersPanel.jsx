import React, { useState, useEffect } from 'react';
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
      const timer = setTimeout(() => {
        applyFilters();
      }, 300);
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
      className={`${
        showFilters ? 'fixed inset-0 bg-white z-40 overflow-auto p-4' : 'hidden'
      } lg:static lg:block lg:w-1/4 p-4 bg-white border-r border-gray-200 transition-transform`}
    >
      <div className="sticky top-4 flex flex-col h-[calc(100vh-32px)]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FiSearch className="mr-2" /> Filters
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="block lg:hidden ml-auto text-gray-500 hover:text-blue-600"
          >
            {showFilters ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>

        <div
          className={`${
            !showFilters && 'hidden'
          } lg:block flex-1 overflow-y-auto pr-2 custom-scroll`}
        >
          {/* Search */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Country
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Country name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600 transition" />
                </button>
              )}
            </div>
          </div>

          {/* Continents */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Continent
              </label>
              <span className="text-xs text-gray-500">
                {selectedContinents.length} selected
              </span>
            </div>
            <div className="relative rounded-md shadow-sm mb-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search continents..."
                value={continentSearch}
                onChange={(e) => setContinentSearch(e.target.value)}
                className="block w-full pl-10 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
              {continentSearch && (
                <button
                  onClick={() => setContinentSearch('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600 transition" />
                </button>
              )}
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2 grid grid-cols-2 gap-2 p-1 custom-scroll">
              {filteredContinents.map((cont) => (
                <div key={cont} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`continent-${cont}`}
                    checked={selectedContinents.includes(cont)}
                    onChange={() => toggleContinent(cont)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`continent-${cont}`}
                    className="ml-2 text-sm text-gray-700 truncate cursor-pointer"
                  >
                    {cont}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <span className="text-xs text-gray-500">
                {selectedLanguages.length} selected
              </span>
            </div>
            <div className="relative rounded-md shadow-sm mb-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search languages..."
                value={languageSearch}
                onChange={(e) => setLanguageSearch(e.target.value)}
                className="block w-full pl-10 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
              {languageSearch && (
                <button
                  onClick={() => setLanguageSearch('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600 transition" />
                </button>
              )}
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2 grid grid-cols-2 gap-2 p-1 custom-scroll">
              {filteredLanguages.map((lang) => (
                <div key={lang} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`language-${lang}`}
                    checked={selectedLanguages.includes(lang)}
                    onChange={() => toggleLanguage(lang)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`language-${lang}`}
                    className="ml-2 text-sm text-gray-700 truncate cursor-pointer"
                  >
                    {lang}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Population */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Population Range
            </label>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Minimum
                  </label>
                  <div className="relative">
                    <select
                      value={populationRange[0]}
                      onChange={(e) =>
                        setPopulationRange([
                          +e.target.value,
                          populationRange[1],
                        ])
                      }
                      className="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {populationOptions.map((opt) => (
                        <option key={`min-${opt.value}`} value={opt.value}>
                          {formatPopulation(opt.value)}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FiChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Maximum
                  </label>
                  <div className="relative">
                    <select
                      value={populationRange[1]}
                      onChange={(e) =>
                        setPopulationRange([
                          populationRange[0],
                          +e.target.value,
                        ])
                      }
                      className="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {populationOptions.map((opt) => (
                        <option key={`max-${opt.value}`} value={opt.value}>
                          {formatPopulation(opt.value)}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FiChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timezones */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone Range
            </label>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Minimum
                  </label>
                  <div className="relative">
                    <select
                      value={timezoneRange[0]}
                      onChange={(e) =>
                        setTimezoneRange([+e.target.value, timezoneRange[1]])
                      }
                      className="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {timezoneOptions.map((opt) => (
                        <option key={`min-${opt.value}`} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FiChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Maximum
                  </label>
                  <div className="relative">
                    <select
                      value={timezoneRange[1]}
                      onChange={(e) =>
                        setTimezoneRange([timezoneRange[0], +e.target.value])
                      }
                      className="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {timezoneOptions.map((opt) => (
                        <option key={`max-${opt.value}`} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FiChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between space-x-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-2.5 bg-gray-300 hover:bg-gray-400 border border-gray-300 rounded-md text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="flex-1 py-2.5 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 flex items-center justify-center"
            >
              Apply Filters
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
