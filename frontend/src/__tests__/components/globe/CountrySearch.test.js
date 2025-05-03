import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import CountrySearch from '@/components/globe/CountrySearch';

afterEach(() => {
  cleanup();
});

describe('CountrySearch', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      countryName: '',
      setCountryName: jest.fn(),
      onSearch: jest.fn(),
      message: '',
    };
    const utils = render(<CountrySearch {...defaultProps} {...props} />);
    const input = screen.getByPlaceholderText('Enter country name...');
    const button = screen.getByRole('button', { name: /search country/i });
    return {
      ...utils,
      input,
      button,
      setCountryName: props.setCountryName || defaultProps.setCountryName,
      onSearch: props.onSearch || defaultProps.onSearch,
    };
  };

  it('calls setCountryName on input change', () => {
    const mockSet = jest.fn();
    const { input } = setup({ setCountryName: mockSet });
    fireEvent.change(input, { target: { value: 'France' } });
    expect(mockSet).toHaveBeenCalledWith('France');
  });

  it('calls onSearch when button is clicked', () => {
    const mockSearch = jest.fn();
    const { button } = setup({ onSearch: mockSearch });
    fireEvent.click(button);
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter is pressed in input', () => {
    const mockSearch = jest.fn();
    const { input } = setup({ onSearch: mockSearch });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });

  it('renders an error-style message when message includes "not found"', () => {
    const errorText = 'Country not found';
    setup({ message: errorText });
    const msg = screen.getByText(errorText);
    expect(msg).toBeInTheDocument();
    expect(msg).toHaveClass('bg-red-50', 'text-red-600');
  });

  it('renders a success-style message for other messages', () => {
    const okText = 'Country loaded successfully';
    setup({ message: okText });
    const msg = screen.getByText(okText);
    expect(msg).toBeInTheDocument();
    expect(msg).toHaveClass('bg-green-50', 'text-green-600');
  });
});
