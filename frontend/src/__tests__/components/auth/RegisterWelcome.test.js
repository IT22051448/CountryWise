import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterWelcome from '@/components/auth/RegisterWelcome';

afterEach(cleanup);

describe('RegisterWelcome component', () => {
  beforeEach(() => {
    render(<RegisterWelcome />);
  });

  it('renders the heading, paragraph, and SVG icon', () => {
    expect(screen.getByText('Discover Your World')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Join CountryWise to explore countries, cultures, and travel insights.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('welcome-icon')).toBeInTheDocument();
  });

  it('container has the correct responsive classes', () => {
    const container = screen.getByTestId('welcome-container');
    expect(container).toHaveClass('hidden');
    expect(container).toHaveClass('sm:flex');
    expect(container).toHaveClass('sm:w-1/2');
    expect(container).toHaveClass('lg:w-2/5');
    expect(container).toHaveClass('bg-gradient-to-br');
    expect(container).toHaveClass('from-blue-600');
    expect(container).toHaveClass('to-blue-400');
    expect(container).toHaveClass('p-6');
    expect(container).toHaveClass('sm:p-8');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });

  it('SVG icon has expected size and color classes', () => {
    const icon = screen.getByTestId('welcome-icon');
    expect(icon).toHaveClass('w-12');
    expect(icon).toHaveClass('h-12');
    expect(icon).toHaveClass('sm:w-16');
    expect(icon).toHaveClass('sm:h-16');
    expect(icon).toHaveClass('mx-auto');
    expect(icon).toHaveClass('text-white');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('heading and paragraph use the right text-size classes', () => {
    const heading = screen.getByText('Discover Your World');
    expect(heading).toHaveClass('text-white');
    expect(heading).toHaveClass('text-xl');
    expect(heading).toHaveClass('sm:text-2xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('mt-4');

    const paragraph = screen.getByText(
      'Join CountryWise to explore countries, cultures, and travel insights.'
    );
    expect(paragraph).toHaveClass('text-white');
    expect(paragraph).toHaveClass('mt-2');
    expect(paragraph).toHaveClass('text-sm');
    expect(paragraph).toHaveClass('sm:text-base');
  });
});
