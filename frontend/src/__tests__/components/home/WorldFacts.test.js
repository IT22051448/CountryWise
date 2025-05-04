import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorldFacts from '@/components/home/WorldFacts';

jest.mock('@/data/homeContent', () => ({
  facts: [
    {
      id: 1,
      fact: 'The Pacific Ocean is larger than all of Earth’s land combined.',
      image: 'pacific.jpg',
      source: 'National Geographic',
    },
    {
      id: 2,
      fact: 'Mount Everest grows about 4 millimeters every year.',
      image: 'everest.jpg',
      source: null,
    },
  ],
}));

const mockAddToast = jest.fn();
jest.mock('@/hooks/ToastContext', () => ({
  useToast: () => ({ addToast: mockAddToast }),
}));

describe('WorldFacts component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<WorldFacts />);
  });

  it('shows heading and subtitle', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: /Amazing World Facts/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Discover fascinating information from around the globe/i
      )
    ).toBeInTheDocument();
  });

  it('renders each fact with image and text', () => {
    expect(
      screen.getByText(
        /The Pacific Ocean is larger than all of Earth’s land combined\./i
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText('Fact 1')).toHaveAttribute('src', 'pacific.jpg');

    expect(
      screen.getByText(/Mount Everest grows about 4 millimeters every year\./i)
    ).toBeInTheDocument();
    expect(screen.getByAltText('Fact 2')).toHaveAttribute('src', 'everest.jpg');
  });

  it('only shows source when provided', () => {
    const sources = screen.getAllByText(/Source:/i);
    expect(sources).toHaveLength(1);
    expect(screen.getByText(/National Geographic/i)).toBeInTheDocument();
  });

  it('renders the Explore button and fires toast on click', () => {
    const btn = screen.getByRole('button', { name: /Explore More Facts/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(mockAddToast).toHaveBeenCalledTimes(1);
    expect(mockAddToast).toHaveBeenCalledWith({
      type: 'info',
      message: 'Apologies, this feature is not available yet!',
    });
  });
});
