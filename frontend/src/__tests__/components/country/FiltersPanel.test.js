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
    formatTimezone: jest.fn((tz) => `UTC${tz >= 0 ? '+' : ''}${tz}`),
    applyFilters: jest.fn(),
    resetFilters: jest.fn(),
    showFilters: true,
    setShowFilters: jest.fn(),
  };

  it('renders all sections', () => {
    render(<FiltersPanel {...mockData} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Search Country')).toBeInTheDocument();
    expect(screen.getByText('Continent')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Population Range')).toBeInTheDocument();
    expect(screen.getByText('Timezone Range')).toBeInTheDocument();
  });

  it('calls setSearchTerm on country search input change', () => {
    render(<FiltersPanel {...mockData} />);
    const input = screen.getByPlaceholderText('Country name...');
    fireEvent.change(input, { target: { value: 'India' } });
    expect(mockData.setSearchTerm).toHaveBeenCalledWith('India');
  });

  it('filters continent list when typing in its search box', () => {
    render(<FiltersPanel {...mockData} />);
    const contInput = screen.getByPlaceholderText('Search continents...');
    fireEvent.change(contInput, { target: { value: 'Euro' } });

    expect(screen.getByText('Europe')).toBeInTheDocument();
  });

  it('toggles a continent when its checkbox is clicked', () => {
    render(<FiltersPanel {...mockData} />);
    const checkbox = screen.getByLabelText('Africa');
    fireEvent.click(checkbox);
    expect(mockData.toggleContinent).toHaveBeenCalledWith('Africa');
  });

  it('toggles a language when its checkbox is clicked', () => {
    render(<FiltersPanel {...mockData} />);
    const checkbox = screen.getByLabelText('Spanish');
    fireEvent.click(checkbox);
    expect(mockData.toggleLanguage).toHaveBeenCalledWith('Spanish');
  });

  it('calls applyFilters when the Apply button is clicked', () => {
    render(<FiltersPanel {...mockData} />);
    const applyBtn = screen.getByText('Apply');
    fireEvent.click(applyBtn);
    expect(mockData.applyFilters).toHaveBeenCalledTimes(1);
  });

  it('calls resetFilters when the Reset button is clicked', () => {
    render(<FiltersPanel {...mockData} />);
    const resetBtn = screen.getByText('Reset');
    fireEvent.click(resetBtn);
    expect(mockData.resetFilters).toHaveBeenCalledTimes(1);
  });
});
