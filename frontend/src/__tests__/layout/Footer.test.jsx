import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/layout/Footer';

describe('Footer', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2025-05-01'));
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders brand name and current year', () => {
    render(<Footer />);

    expect(
      screen.getByText('CountryWise', { selector: 'span' })
    ).toBeInTheDocument();

    expect(
      screen.getByText('© 2025 CountryWise. All rights reserved.', {
        selector: 'p',
      })
    ).toBeInTheDocument();
  });

  it('renders the REST Countries API attribution link correctly', () => {
    render(<Footer />);
    const apiLink = screen.getByRole('link', {
      name: /REST Countries API/i,
    });
    expect(apiLink).toHaveAttribute('href', 'https://restcountries.com');
    expect(apiLink).toHaveAttribute('target', '_blank');
    expect(apiLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders social icon links with correct aria-labels', () => {
    render(<Footer />);

    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();

    expect(screen.getByLabelText('FaceBook')).toBeInTheDocument();

    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
  });
});
