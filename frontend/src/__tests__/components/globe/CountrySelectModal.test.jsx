import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import CountrySelectModal from '@/components/globe/CountrySelectModal';

afterEach(() => {
  cleanup();
});

describe('CountrySelectModal', () => {
  const mockMatches = [
    { cca3: 'USA', name: { common: 'United States' }, flag: '🇺🇸' },
    { cca3: 'CAN', name: { common: 'Canada' }, flag: '🇨🇦' },
  ];
  const onSelect = jest.fn();

  beforeEach(() => {
    onSelect.mockClear();
  });

  it('renders the modal container and header', () => {
    render(<CountrySelectModal matches={mockMatches} onSelect={onSelect} />);

    expect(
      screen.getByRole('heading', { name: /Select Your Country/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Multiple countries match your search\. Please select the required one:/i
      )
    ).toBeInTheDocument();
  });

  it('renders a button for each country match with flag and name', () => {
    render(<CountrySelectModal matches={mockMatches} onSelect={onSelect} />);

    mockMatches.forEach((country) => {
      const button = screen.getByRole('button', {
        name: new RegExp(country.name.common, 'i'),
      });
      expect(button).toBeInTheDocument();

      expect(button).toHaveTextContent(country.flag);

      expect(button).toHaveTextContent(country.name.common);
    });
  });

  it('invokes onSelect with the correct country object when clicked', () => {
    render(<CountrySelectModal matches={mockMatches} onSelect={onSelect} />);

    const usButton = screen.getByRole('button', { name: /United States/i });
    fireEvent.click(usButton);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockMatches[0]);

    const caButton = screen.getByRole('button', { name: /Canada/i });
    fireEvent.click(caButton);
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith(mockMatches[1]);
  });

  it('renders no list items when matches is empty', () => {
    render(<CountrySelectModal matches={[]} onSelect={onSelect} />);

    expect(
      screen.getByRole('heading', { name: /Select Your Country/i })
    ).toBeInTheDocument();

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
