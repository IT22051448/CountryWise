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
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen mt-16">
      {/* Mobile filter button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-10">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Toggle filters"
        >
          <FiFilter size={24} />
          {filtersApplied && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {selectedContinents.length + selectedLanguages.length}
            </span>
          )}
        </button>
      </div>

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
        filteredCount={filteredCountries.length}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <div className="w-full lg:w-3/4 p-4 md:p-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 mb-4 rounded">
            Error: {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            Explore Countries
          </h1>
          <div className="text-sm text-gray-600">
            {filteredCountries.length} countries found
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : (
          <>
            {filtersApplied && (
              <div className="mb-4 bg-white text-gray-800 p-3 rounded-md flex justify-between items-center shadow-sm">
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
