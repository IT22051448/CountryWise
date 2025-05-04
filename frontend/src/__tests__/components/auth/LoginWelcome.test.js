import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthWelcome from '@/components/auth/LoginWelcome';

afterEach(cleanup);

describe('AuthWelcome component', () => {
  it('renders the heading, paragraph, and SVG icon', () => {
    render(<AuthWelcome />);
    expect(screen.getByText('Welcome Back to CountryWise')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Login to continue exploring detailed country information.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('welcome-svg')).toBeInTheDocument();
  });

  it('has the correct responsive container classes', () => {
    render(<AuthWelcome />);
    const container = screen.getByTestId('welcome-container');
    expect(container).toHaveClass('hidden');
    expect(container).toHaveClass('sm:flex');
    expect(container).toHaveClass('sm:w-1/2');
    expect(container).toHaveClass('lg:w-2/5');
    expect(container).toHaveClass('bg-gradient-to-br');
    expect(container).toHaveClass('from-green-600');
    expect(container).toHaveClass('to-green-400');
    expect(container).toHaveClass('p-6');
    expect(container).toHaveClass('sm:p-8');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });

  it('SVG icon has the correct size classes and viewBox', () => {
    render(<AuthWelcome />);
    const svg = screen.getByTestId('welcome-svg');
    expect(svg).toHaveClass('w-12');
    expect(svg).toHaveClass('h-12');
    expect(svg).toHaveClass('sm:w-16');
    expect(svg).toHaveClass('sm:h-16');
    expect(svg).toHaveClass('mx-auto');
    expect(svg).toHaveClass('text-white');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });
});
