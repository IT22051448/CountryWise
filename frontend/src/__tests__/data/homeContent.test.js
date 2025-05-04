import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCountryData } from '@/hooks/useCountryData';
import * as api from '@/api/restCountriesApi';

jest.mock('@/api/restCountriesApi', () => ({
  useGetAllCountriesQuery: jest.fn(),
  useLazyGetCountriesByNameQuery: jest.fn(),
  useLazyGetCountriesByRegionQuery: jest.fn(),
  useLazyGetCountriesByLanguageQuery: jest.fn(),
}));

describe('useCountryData (via TestComponent)', () => {
  const mockCountries = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      region: 'Americas',
      languages: { eng: 'English' },
      population: 330000000,
      timezones: ['UTC-10', 'UTC-05'],
    },
    {
      cca3: 'CAN',
      name: { common: 'Canada' },
      region: 'Americas',
      languages: { eng: 'English', fra: 'French' },
      population: 38000000,
      timezones: ['UTC-08', 'UTC-03:30'],
    },
  ];

  beforeEach(() => {
    api.useGetAllCountriesQuery.mockReturnValue({
      data: mockCountries,
      isLoading: false,
      error: null,
    });

    api.useLazyGetCountriesByNameQuery.mockReturnValue([jest.fn()]);
    api.useLazyGetCountriesByRegionQuery.mockReturnValue([jest.fn()]);
    api.useLazyGetCountriesByLanguageQuery.mockReturnValue([jest.fn()]);
  });

  function TestComponent() {
    const {
      countries,
      filteredCountries,
      availableContinents,
      availableLanguages,
      selectedContinents,
      toggleContinent,
      resetFilters,
      filtersApplied,
    } = useCountryData();

    return (
      <div>
        <div data-testid="countries">{countries.length}</div>
        <div data-testid="filtered">{filteredCountries.length}</div>
        <div data-testid="continents">{availableContinents.join(',')}</div>
        <div data-testid="languages">{availableLanguages.join(',')}</div>
        <div data-testid="selected-continents">
          {selectedContinents.join(',')}
        </div>
        <div data-testid="filtersApplied">{filtersApplied.toString()}</div>
        <button
          data-testid="toggle-americas"
          onClick={() => toggleContinent('Americas')}
        />
        <button data-testid="reset" onClick={resetFilters} />
      </div>
    );
  }

  it('loads and bootstraps correctly', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('countries')).toHaveTextContent('2');

    expect(screen.getByTestId('filtered')).toHaveTextContent('2');

    expect(screen.getByTestId('continents')).toHaveTextContent('Americas');

    expect(screen.getByTestId('languages')).toEqual(
      expect.objectContaining({
        textContent: expect.stringContaining('English'),
      })
    );

    expect(screen.getByTestId('filtersApplied')).toHaveTextContent('false');
  });

  it('toggleContinent adds/removes region but does not mark filtersApplied until you applyFilters', () => {
    render(<TestComponent />);
    const selected = screen.getByTestId('selected-continents');
    const toggle = screen.getByTestId('toggle-americas');

    expect(selected).toHaveTextContent('');
    fireEvent.click(toggle);

    expect(selected).toHaveTextContent('Americas');

    expect(screen.getByTestId('filtersApplied')).toHaveTextContent('false');
  });

  it('resetFilters clears everything', () => {
    render(<TestComponent />);
    const selected = screen.getByTestId('selected-continents');
    const toggle = screen.getByTestId('toggle-americas');
    const reset = screen.getByTestId('reset');

    fireEvent.click(toggle);
    expect(selected).toHaveTextContent('Americas');

    fireEvent.click(reset);
    expect(selected).toHaveTextContent('');

    expect(screen.getByTestId('filtered')).toHaveTextContent('2');
    expect(screen.getByTestId('filtersApplied')).toHaveTextContent('false');
  });
});
