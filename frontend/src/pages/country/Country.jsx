import React from 'react';
import CountryList from '@/components/country/CountryList';
import CountryModal from '@/components/country/CountryModal';
import FiltersPanel from '@/components/country/FiltersPanel';
import { FiFilter } from 'react-icons/fi';
import { useCountryData } from '@/hooks/useCountryData';
import { formatPopulation, formatTimezone } from '@/utils/formatters';

const CountryPage = () => {
  const {
    filteredCountries,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedContinents,
    toggleContinent,
    selectedLanguages,
    toggleLanguage,
    populationRange,
    setPopulationRange,
    timezoneRange,
    setTimezoneRange,
    availableContinents,
    availableLanguages,
    showFilters,
    setShowFilters,
    filtersApplied,
    applyFilters,
    resetFilters,
  } = useCountryData();

  const [selectedCountry, setSelectedCountry] = React.useState(null);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-200 min-h-screen">
      <FiltersPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        availableContinents={availableContinents}
        selectedContinents={selectedContinents}
        toggleContinent={toggleContinent}
        availableLanguages={availableLanguages}
        selectedLanguages={selectedLanguages}
        toggleLanguage={toggleLanguage}
        populationRange={populationRange}
        setPopulationRange={setPopulationRange}
        timezoneRange={timezoneRange}
        setTimezoneRange={setTimezoneRange}
        formatPopulation={formatPopulation}
        formatTimezone={formatTimezone}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <div className="w-full lg:w-3/4 px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 mb-4 rounded">
            Error: {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Explore Countries
          </h1>
          <div className="text-sm text-gray-600">
            {filteredCountries.length} countries found
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <FiFilter className="mr-1" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : (
          <>
            {filtersApplied && (
              <div className="mb-4 bg-white text-gray-800 p-3 rounded-md flex justify-between items-center">
                <span>Filters are applied</span>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>
            )}

            <CountryList
              countries={filteredCountries}
              onCardClick={setSelectedCountry}
            />

            {selectedCountry && (
              <CountryModal
                country={selectedCountry}
                onClose={() => setSelectedCountry(null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CountryPage;
