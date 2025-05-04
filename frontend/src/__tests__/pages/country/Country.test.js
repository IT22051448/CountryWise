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
  const baseData = {
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
    useCountryData.mockReturnValue({ ...baseData });
    render(<CountryPage />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the FiltersPanel placeholder', () => {
    expect(screen.getByTestId('filters-panel')).toBeInTheDocument();
  });

  it('renders the page title and filter toggle button', () => {
    expect(screen.getByText('Explore Countries')).toBeInTheDocument();

    expect(screen.getByLabelText(/toggle filters/i)).toBeInTheDocument();

    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
  });

  it('renders the country-list placeholder', () => {
    expect(screen.getByTestId('country-list')).toBeInTheDocument();
  });

  it('shows an error banner when error is non-null', () => {
    useCountryData.mockReturnValue({ ...baseData, error: 'Oops!' });
    render(<CountryPage />);
    expect(screen.getByText('Error: Oops!')).toBeInTheDocument();
  });

  it('shows "Filters are applied" banner when filtersApplied is true', () => {
    useCountryData.mockReturnValue({ ...baseData, filtersApplied: true });
    render(<CountryPage />);
    expect(screen.getByText('Filters are applied')).toBeInTheDocument();
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('toggles the filters panel when the filter button is clicked', () => {
    const btn = screen.getByLabelText(/toggle filters/i);
    fireEvent.click(btn);
    expect(baseData.setShowFilters).toHaveBeenCalledWith(true);
  });

  it('displays the correct count of filtered countries', () => {
    useCountryData.mockReturnValue({
      ...baseData,
      filteredCountries: [{}, {}, {}],
    });
    render(<CountryPage />);

    expect(
      screen.getByText((content) => /\b3 countries\b/.test(content))
    ).toBeInTheDocument();
  });
});
