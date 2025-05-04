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
  let onSelect;
  let onClose;

  beforeEach(() => {
    onSelect = jest.fn();
    onClose = jest.fn();
  });

  it('renders the modal container, header, description and close button', () => {
    render(
      <CountrySelectModal
        matches={mockMatches}
        onSelect={onSelect}
        onClose={onClose}
      />
    );

    expect(
      screen.getByRole('heading', { name: /Select Your Country/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Multiple countries match your search\. Please select the required one:/i
      )
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <CountrySelectModal
        matches={mockMatches}
        onSelect={onSelect}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders a button for each country match with flag and name', () => {
    render(
      <CountrySelectModal
        matches={mockMatches}
        onSelect={onSelect}
        onClose={onClose}
      />
    );

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
    render(
      <CountrySelectModal
        matches={mockMatches}
        onSelect={onSelect}
        onClose={onClose}
      />
    );

    const usaBtn = screen.getByRole('button', { name: /United States/i });
    fireEvent.click(usaBtn);
    expect(onSelect).toHaveBeenCalledWith(mockMatches[0]);

    const canBtn = screen.getByRole('button', { name: /Canada/i });
    fireEvent.click(canBtn);
    expect(onSelect).toHaveBeenCalledWith(mockMatches[1]);
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('renders no list items when matches is empty', () => {
    render(
      <CountrySelectModal matches={[]} onSelect={onSelect} onClose={onClose} />
    );

    expect(
      screen.getByRole('heading', { name: /Select Your Country/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Multiple countries match your search\. Please select the required one:/i
      )
    ).toBeInTheDocument();

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
