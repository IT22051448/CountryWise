import { render, screen, cleanup } from '@testing-library/react';
import LoginWelcome from '@/components/auth/LoginWelcome';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('LoginWelcome', () => {
  it('should render the LoginWelcome component correctly', () => {
    render(<LoginWelcome />);

    expect(screen.getByText('Welcome Back to CountryWise')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Login to continue exploring detailed country information.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('welcome-svg')).toBeInTheDocument();
  });

  it('should have the correct structure for the SVG icon', () => {
    render(<LoginWelcome />);

    const svgIcon = screen.getByTestId('welcome-svg');

    expect(svgIcon).toHaveClass('w-16');
    expect(svgIcon).toHaveClass('h-16');
    expect(svgIcon).toHaveClass('mx-auto');
    expect(svgIcon).toHaveClass('text-white');
    expect(svgIcon).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('should display the heading text correctly', () => {
    render(<LoginWelcome />);

    const heading = screen.getByText('Welcome Back to CountryWise');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-white');
    expect(heading).toHaveClass('text-2xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('mt-4');
  });

  it('should display the paragraph text correctly', () => {
    render(<LoginWelcome />);

    const paragraph = screen.getByText(
      'Login to continue exploring detailed country information.'
    );

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('text-white');
    expect(paragraph).toHaveClass('mt-2');
  });

  it('should render the container div with the correct classes', () => {
    render(<LoginWelcome />);

    const container = screen
      .getByText('Welcome Back to CountryWise')
      .closest('div.hidden');

    expect(container).toHaveClass('hidden');
    expect(container).toHaveClass('md:flex');
    expect(container).toHaveClass('md:w-1/2');
    expect(container).toHaveClass('bg-gradient-to-br');
    expect(container).toHaveClass('from-green-600');
    expect(container).toHaveClass('to-green-400');
    expect(container).toHaveClass('p-8');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });
});
