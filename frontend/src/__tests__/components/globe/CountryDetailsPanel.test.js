import { render, screen, cleanup, waitFor } from '@testing-library/react';
import CountryDetailsPanel from '@/components/globe/CountryDetailsPanel';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('CountryDetailsPanel', () => {
  const country = {
    cca3: 'USA',
    name: {
      common: 'United States',
      official: 'United States of America',
      nativeName: {
        eng: { common: 'United States', official: 'United States of America' },
      },
    },
    flags: { png: 'https://flag.com/usa.png' },
    capital: ['Washington, D.C.'],
    population: 331000000,
    region: 'Americas',
    subregion: 'Northern America',
    area: 9833517,
    languages: { eng: 'English' },
    currencies: { USD: { name: 'United States Dollar', symbol: '$' } },
    idd: { root: '+1', suffixes: [''] },
    timezones: ['UTC-12:00'],
    borders: ['CAN', 'MEX'],
    latlng: [37.0902, -95.7129],
    altSpellings: ['US', 'USA'],
    unMember: true,
    independent: true,
    maps: { googleMaps: 'https://www.google.com/maps' },
  };

  it('should render the CountryDetailsPanel component correctly', async () => {
    render(<CountryDetailsPanel country={country} />);

    expect(screen.getByText('Country Details')).toBeInTheDocument();

    const flag = screen.getByAltText('United States');
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveAttribute('src', 'https://flag.com/usa.png');

    expect(screen.getByText('Basic Info')).toBeInTheDocument();
    expect(screen.getByText('Cultural Info')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/United States/)).toBeInTheDocument();
    });
  });

  it('should handle missing data gracefully', async () => {
    const incompleteCountry = {
      name: { common: 'Test Country' },
      flags: { png: 'https://flag.com/test.png' },
    };

    render(<CountryDetailsPanel country={incompleteCountry} />);

    await waitFor(
      () => {
        expect(screen.getByText(/Test Country/)).toBeInTheDocument();

        expect(screen.getByText(/Capital:/)).toBeInTheDocument();
        expect(screen.getByText(/N\/A/)).toBeInTheDocument();

        expect(screen.getByText(/Population:/)).toBeInTheDocument();
        expect(screen.getByText(/N\/A/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
