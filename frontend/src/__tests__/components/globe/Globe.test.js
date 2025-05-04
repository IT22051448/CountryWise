import React from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import Globe from '@/components/globe/Globe';

jest.mock('@/api/restCountriesApi', () => ({
  useLazyGetCountriesByNameQuery: jest.fn(),
}));

jest.mock('@/components/globe/CountrySearch', () => {
  const React = require('react');
  return ({ onSearch, message }) => (
    <div data-testid="search-panel">
      <button onClick={onSearch}>Search</button>
      {message && <div data-testid="message">{message}</div>}
    </div>
  );
});
jest.mock('@/components/globe/CountrySelectModal', () => {
  const React = require('react');
  return ({ matches }) => (
    <div data-testid="modal">{JSON.stringify(matches)}</div>
  );
});
jest.mock('@/components/globe/CountryDetailsPanel', () => {
  const React = require('react');
  return ({ country }) => (
    <div data-testid="details">{JSON.stringify(country)}</div>
  );
});
jest.mock('@/components/globe/RotatingGlobe', () => {
  const React = require('react');
  return (props) => <div data-testid="globe">{JSON.stringify(props)}</div>;
});
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
}));
jest.mock('@react-three/drei', () => ({
  Stars: () => <div data-testid="stars" />,
}));

describe('Globe component', () => {
  let fetchByNameMock;
  const { useLazyGetCountriesByNameQuery } = require('@/api/restCountriesApi');

  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation((q) => ({
      matches: true,
      media: q,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
  });

  beforeEach(() => {
    cleanup();
    fetchByNameMock = jest.fn();
    useLazyGetCountriesByNameQuery.mockReturnValue([
      fetchByNameMock,
      { isLoading: false },
    ]);
  });

  it('toggles search panel and details panel on mobile', () => {
    render(<Globe />);

    expect(screen.getByTestId('search-panel')).toBeInTheDocument();
    expect(screen.getByTestId('details')).toBeInTheDocument();

    const toggleSearch = screen.getByLabelText('Toggle search panel');
    fireEvent.click(toggleSearch);
    expect(screen.queryByTestId('search-panel')).toBeNull();

    const toggleDetails = screen.getByLabelText('Toggle details panel');
    fireEvent.click(toggleDetails);
    expect(screen.queryByTestId('details')).toBeNull();
  });

  it('shows modal when multiple matches returned', async () => {
    const data = [
      { cca3: 'A', name: { common: 'A' }, latlng: [1, 2] },
      { cca3: 'B', name: { common: 'B' }, latlng: [3, 4] },
    ];
    fetchByNameMock.mockReturnValue({ unwrap: () => Promise.resolve(data) });

    render(<Globe />);
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent(
        JSON.stringify(data)
      );
      expect(screen.getByTestId('message')).toHaveTextContent(
        'Multiple countries match. Please select.'
      );

      expect(screen.getByTestId('details')).toHaveTextContent('null');

      expect(screen.getByTestId('globe')).toHaveTextContent(
        '"showMarker":false'
      );
    });
  });

  it('sets marker and details when a single match returned', async () => {
    const single = { cca3: 'X', name: { common: 'X' }, latlng: [5, 6] };
    fetchByNameMock.mockReturnValue({
      unwrap: () => Promise.resolve([single]),
    });

    render(<Globe />);
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.queryByTestId('modal')).toBeNull();
      expect(screen.getByTestId('message')).toHaveTextContent(
        'Location found!'
      );
      expect(screen.getByTestId('details')).toHaveTextContent(
        JSON.stringify(single)
      );
      const globe = screen.getByTestId('globe');
      expect(globe).toHaveTextContent('"showMarker":true');
      expect(globe).toHaveTextContent(`"countryCoordinates":{"lat":5,"lng":6}`);
      expect(globe).toHaveTextContent(`"countryName":"${single.name.common}"`);
    });
  });

  it('shows "Country not found!" when no matches returned', async () => {
    fetchByNameMock.mockReturnValue({ unwrap: () => Promise.resolve([]) });

    render(<Globe />);
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.queryByTestId('modal')).toBeNull();
      expect(screen.getByTestId('message')).toHaveTextContent(
        'Country not found!'
      );
      expect(screen.getByTestId('details')).toHaveTextContent('null');
      expect(screen.getByTestId('globe')).toHaveTextContent(
        '"showMarker":false'
      );
    });
  });

  it('shows error message if fetch throws', async () => {
    fetchByNameMock.mockReturnValue({
      unwrap: () => Promise.reject(new Error('fail')),
    });

    render(<Globe />);
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByTestId('message')).toHaveTextContent(
        'Error fetching country data.'
      );
      expect(screen.queryByTestId('modal')).toBeNull();
      expect(screen.getByTestId('details')).toHaveTextContent('null');
    });
  });
});
