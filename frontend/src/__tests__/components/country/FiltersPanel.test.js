import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import FiltersPanel from '@/components/country/FiltersPanel';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('FiltersPanel', () => {
  const mockData = {
    searchTerm: '',
    setSearchTerm: jest.fn(),
    availableContinents: ['Africa', 'Asia', 'Europe', 'Oceania', 'America'],
    selectedContinents: ['Asia'],
    toggleContinent: jest.fn(),
    availableLanguages: ['English', 'Spanish', 'French'],
    selectedLanguages: ['English'],
    toggleLanguage: jest.fn(),
    populationRange: [0, 100000000],
    setPopulationRange: jest.fn(),
    timezoneRange: [-12, 12],
    setTimezoneRange: jest.fn(),
    formatPopulation: jest.fn((value) => `${value / 1000000}M`),
    applyFilters: jest.fn(),
    resetFilters: jest.fn(),
    showFilters: true,
    setShowFilters: jest.fn(),
  };

  it('should render the FiltersPanel component correctly', () => {
    render(<FiltersPanel {...mockData} />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Search Country')).toBeInTheDocument();
    expect(screen.getByText('Continent')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Population Range')).toBeInTheDocument();
    expect(screen.getByText('Timezone Range')).toBeInTheDocument();
  });

  it('should call setSearchTerm when search input is changed', () => {
    render(<FiltersPanel {...mockData} />);

    const searchInput = screen.getByPlaceholderText('Country name...');
    fireEvent.change(searchInput, { target: { value: 'India' } });

    expect(mockData.setSearchTerm).toHaveBeenCalledWith('India');
  });

  it('should show the continent search and handle search term change', () => {
    render(<FiltersPanel {...mockData} />);

    const continentSearchInput = screen.getByPlaceholderText(
      'Search continents...'
    );
    fireEvent.change(continentSearchInput, { target: { value: 'Euro' } });

    expect(screen.getByText('Europe')).toBeInTheDocument();
  });

  it('should toggle continent selection when checkbox is clicked', () => {
    render(<FiltersPanel {...mockData} />);

    const continentCheckbox = screen.getByLabelText('Africa');
    fireEvent.click(continentCheckbox);

    expect(mockData.toggleContinent).toHaveBeenCalledWith('Africa');
  });

  it('should toggle language selection when checkbox is clicked', () => {
    render(<FiltersPanel {...mockData} />);

    const languageCheckbox = screen.getByLabelText('Spanish');
    fireEvent.click(languageCheckbox);

    expect(mockData.toggleLanguage).toHaveBeenCalledWith('Spanish');
  });

  it('should apply filters when the apply button is clicked', () => {
    render(<FiltersPanel {...mockData} />);

    const applyButton = screen.getByText('Apply Filters');
    fireEvent.click(applyButton);

    expect(mockData.applyFilters).toHaveBeenCalledTimes(1);
  });

  it('should reset filters when the reset button is clicked', () => {
    render(<FiltersPanel {...mockData} />);

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(mockData.resetFilters).toHaveBeenCalledTimes(1);
  });
});
