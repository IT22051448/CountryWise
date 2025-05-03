import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryPage from '@/pages/country/Country';
import { useCountryData } from '@/hooks/useCountryData';

jest.mock('@/components/country/CountryList', () => () => (
  <div data-testid="country-list" />
));
jest.mock('@/components/country/CountryModal', () => () => (
  <div data-testid="country-modal" />
));
jest.mock('@/components/country/FiltersPanel', () => () => (
  <div data-testid="filters-panel" />
));
jest.mock('react-icons/fi', () => ({
  FiFilter: () => <span data-testid="filter-icon" />,
}));
jest.mock('@/hooks/useCountryData');

describe('<CountryPage />', () => {
  const mockUseCountryData = {
    filteredCountries: [],
    loading: false,
    error: null,
    searchTerm: '',
    setSearchTerm: jest.fn(),
    selectedContinents: [],
    toggleContinent: jest.fn(),
    selectedLanguages: [],
    toggleLanguage: jest.fn(),
    populationRange: [0, 100],
    setPopulationRange: jest.fn(),
    timezoneRange: [-12, 12],
    setTimezoneRange: jest.fn(),
    availableContinents: [],
    availableLanguages: [],
    showFilters: false,
    setShowFilters: jest.fn(),
    filtersApplied: false,
    applyFilters: jest.fn(),
    resetFilters: jest.fn(),
  };

  beforeEach(() => {
    useCountryData.mockReturnValue(mockUseCountryData);
    render(<CountryPage />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the FiltersPanel component', () => {
    expect(screen.getByTestId('filters-panel')).toBeInTheDocument();
  });

  it('displays the page title and filter toggle button', () => {
    expect(screen.getByText('Explore Countries')).toBeInTheDocument();
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
  });

  it('displays error message when error exists', () => {
    const errorMessage = 'Failed to load countries';
    useCountryData.mockReturnValue({
      ...mockUseCountryData,
      error: errorMessage,
    });
    render(<CountryPage />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('shows filters applied notification when filters are applied', () => {
    useCountryData.mockReturnValue({
      ...mockUseCountryData,
      filtersApplied: true,
    });
    render(<CountryPage />);
    expect(screen.getByText('Filters are applied')).toBeInTheDocument();
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('renders the CountryList component', () => {
    expect(screen.getByTestId('country-list')).toBeInTheDocument();
  });

  it('toggles filters panel when filter button is clicked', () => {
    const filterButton = screen.getByText('Show Filters');
    fireEvent.click(filterButton);
    expect(mockUseCountryData.setShowFilters).toHaveBeenCalledWith(true);
  });

  it('displays the count of filtered countries', () => {
    const mockDataWithCountries = {
      ...mockUseCountryData,
      filteredCountries: [{}, {}, {}],
    };
    useCountryData.mockReturnValue(mockDataWithCountries);
    render(<CountryPage />);
    expect(screen.getByText('3 countries found')).toBeInTheDocument();
  });
});
