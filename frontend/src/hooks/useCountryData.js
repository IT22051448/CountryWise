import { useState, useEffect } from 'react';
import {
  useGetAllCountriesQuery,
  useLazyGetCountriesByNameQuery,
  useLazyGetCountriesByRegionQuery,
  useLazyGetCountriesByLanguageQuery,
} from '../api/restCountriesApi';

export function useCountryData() {
  // fetch all
  const {
    data: countries = [],
    isLoading: loadingAll,
    error: errorAll,
  } = useGetAllCountriesQuery();

  // lazy triggers for the other endpoints
  const [fetchByName] = useLazyGetCountriesByNameQuery();
  const [fetchByRegion] = useLazyGetCountriesByRegionQuery();
  const [fetchByLanguage] = useLazyGetCountriesByLanguageQuery();

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [populationRange, setPopulationRange] = useState(['', '']);
  const [timezoneRange, setTimezoneRange] = useState(['', '']);
  const [availableContinents, setAvailableContinents] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // bootstrap filters
  useEffect(() => {
    if (countries.length) {
      setFilteredCountries(countries);
      setAvailableContinents(
        [...new Set(countries.map((c) => c.region))].filter(Boolean)
      );
      setAvailableLanguages(
        [
          ...new Set(
            countries.flatMap((c) =>
              c.languages ? Object.values(c.languages) : []
            )
          ),
        ].filter(Boolean)
      );
    }
  }, [countries]);

  const applyFilters = async () => {
    setLoading(true);
    setError(null);
    try {
      let results = countries;

      // if searching by name, call name endpoint
      if (searchTerm.trim()) {
        const nameRes = await fetchByName(searchTerm.trim()).unwrap();
        results = nameRes;
      }

      // if filtering by region(s), call region endpoint
      if (selectedContinents.length) {
        const regionBatches = await Promise.all(
          selectedContinents.map((r) => fetchByRegion(r).unwrap())
        );
        const regionData = regionBatches.flat();
        results = results.filter((c) =>
          regionData.some((r) => r.cca3 === c.cca3)
        );
      }

      // if filtering by language(s), call lang endpoint
      if (selectedLanguages.length) {
        const langBatches = await Promise.all(
          selectedLanguages.map((l) => fetchByLanguage(l).unwrap())
        );
        const langData = langBatches.flat();
        results = results.filter((c) =>
          langData.some((l) => l.cca3 === c.cca3)
        );
      }

      // local population range filter
      const [minPop, maxPop] = populationRange.map((x) => (x === '' ? x : +x));
      if (minPop !== '' || maxPop !== '') {
        results = results.filter(
          (c) =>
            (minPop === '' || c.population >= minPop) &&
            (maxPop === '' || c.population <= maxPop)
        );
      }

      // local timezone range filter
      const [minTz, maxTz] = timezoneRange.map((x) => (x === '' ? x : +x));
      if (minTz !== '' || maxTz !== '') {
        results = results.filter((c) =>
          (c.timezones || []).some((tz) => {
            const num = parseFloat(tz.replace('UTC', '').replace('+', ''));
            return (
              (minTz === '' || num >= minTz) && (maxTz === '' || num <= maxTz)
            );
          })
        );
      }

      setFilteredCountries(results);

      const anyActive =
        !!searchTerm.trim() ||
        selectedContinents.length > 0 ||
        selectedLanguages.length > 0 ||
        populationRange.some((x) => x !== '') ||
        timezoneRange.some((x) => x !== '');
      setFiltersApplied(anyActive);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  //toggles & reset
  const toggleContinent = (cont) =>
    setSelectedContinents((prev) =>
      prev.includes(cont) ? prev.filter((x) => x !== cont) : [...prev, cont]
    );
  const toggleLanguage = (lang) =>
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((x) => x !== lang) : [...prev, lang]
    );
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedContinents([]);
    setSelectedLanguages([]);
    setPopulationRange(['', '']);
    setTimezoneRange(['', '']);
    setFilteredCountries(countries);
    setFiltersApplied(false);
  };

  return {
    countries,
    filteredCountries,
    loading: loadingAll || loading,
    error: errorAll || error,
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
  };
}
