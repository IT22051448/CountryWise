import { render, screen, cleanup } from '@testing-library/react';
import RegisterWelcome from '@/components/auth/RegisterWelcome';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('RegisterWelcome', () => {
  it('should render the RegisterWelcome component correctly', () => {
    render(<RegisterWelcome />);

    expect(screen.getByText('Discover Your World')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Join CountryWise to explore countries, cultures, and travel insights.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('welcome-icon')).toBeInTheDocument();
  });

  it('should have the correct structure for the SVG icon', () => {
    render(<RegisterWelcome />);

    const svgIcon = screen.getByTestId('welcome-icon');

    expect(svgIcon).toHaveClass('w-16');
    expect(svgIcon).toHaveClass('h-16');
    expect(svgIcon).toHaveClass('mx-auto');
    expect(svgIcon).toHaveClass('text-white');
  });

  it('should display the heading text correctly', () => {
    render(<RegisterWelcome />);

    const heading = screen.getByText('Discover Your World');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-white');
    expect(heading).toHaveClass('text-2xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('mt-4');
  });

  it('should display the paragraph text correctly', () => {
    render(<RegisterWelcome />);

    const paragraph = screen.getByText(
      'Join CountryWise to explore countries, cultures, and travel insights.'
    );

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('text-white');
    expect(paragraph).toHaveClass('mt-2');
  });

  it('should render the container div with the correct classes', () => {
    render(<RegisterWelcome />);

    const container = screen.getByTestId('welcome-container');

    expect(container).toHaveClass('hidden');
    expect(container).toHaveClass('md:flex');
    expect(container).toHaveClass('md:w-1/2');
    expect(container).toHaveClass('bg-gradient-to-br');
    expect(container).toHaveClass('from-blue-600');
    expect(container).toHaveClass('to-blue-400');
    expect(container).toHaveClass('p-8');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });
});
