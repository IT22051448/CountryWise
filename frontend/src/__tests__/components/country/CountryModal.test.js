import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import CountryModal from '@/components/country/CountryModal';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('CountryModal', () => {
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

  it('should display the country flag correctly', () => {
    render(<CountryModal country={country} onClose={() => {}} />);

    const flag = screen.getByAltText('Flag of United States');
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveAttribute('src', 'https://flag.com/usa.png');
  });

  it('should call onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(<CountryModal country={country} onClose={onClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should have correct text and class for country details', () => {
    render(<CountryModal country={country} onClose={() => {}} />);

    const capitalText = screen.getByText('Washington, D.C.');
    expect(capitalText).toBeInTheDocument();
    expect(capitalText).toHaveClass('text-gray-800');

    const populationText = screen.getByText('331,000,000');
    expect(populationText).toBeInTheDocument();
    expect(populationText).toHaveClass('text-gray-800');
  });

  it('should render the InfoCard correctly', () => {
    render(<CountryModal country={country} onClose={() => {}} />);

    const capitalCard = screen.getByText('Capital');
    expect(capitalCard).toBeInTheDocument();

    const populationCard = screen.getByText('Population');
    expect(populationCard).toBeInTheDocument();

    const regionCard = screen.getByText('Region');
    expect(regionCard).toBeInTheDocument();
  });
});
