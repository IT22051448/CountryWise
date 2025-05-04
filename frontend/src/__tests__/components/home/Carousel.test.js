import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '@/components/home/Carousel';

describe('Carousel component', () => {
  const slides = [
    { id: 1, image: 'img1.jpg', title: 'First', text: 'First text' },
    { id: 2, image: 'img2.jpg', title: 'Second', text: 'Second text' },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders one indicator per slide and highlights the first by default', () => {
    render(<Carousel slides={slides} interval={100000} />);
    const indicators = screen.getAllByRole('button', { name: /go to slide/i });
    expect(indicators).toHaveLength(slides.length);

    expect(indicators[0]).toHaveClass(
      'bg-green-500',
      'w-4',
      'sm:w-6',
      'scale-110'
    );

    expect(indicators[1]).toHaveClass('bg-gray-400', 'hover:bg-gray-700');
  });

  it('advances the active indicator when the Next button is clicked', () => {
    render(<Carousel slides={slides} interval={100000} />);
    const nextBtn = screen.getByRole('button', { name: /next slide/i });
    fireEvent.click(nextBtn);

    const indicators = screen.getAllByRole('button', { name: /go to slide/i });

    expect(indicators[1]).toHaveClass(
      'bg-green-500',
      'w-4',
      'sm:w-6',
      'scale-110'
    );
    expect(indicators[0]).toHaveClass('bg-gray-400', 'hover:bg-gray-700');
  });

  it('returns to the first indicator when Previous is clicked after Next', () => {
    render(<Carousel slides={slides} interval={100000} />);
    const nextBtn = screen.getByRole('button', { name: /next slide/i });
    const prevBtn = screen.getByRole('button', { name: /previous slide/i });

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);

    const indicators = screen.getAllByRole('button', { name: /go to slide/i });

    expect(indicators[0]).toHaveClass(
      'bg-green-500',
      'w-4',
      'sm:w-6',
      'scale-110'
    );
    expect(indicators[1]).toHaveClass('bg-gray-400', 'hover:bg-gray-700');
  });
});
