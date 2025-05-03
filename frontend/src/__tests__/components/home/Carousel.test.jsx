import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '@/components/home/Carousel';

describe('Carousel test Cases', () => {
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

  it('renders exactly one indicator per slide and first is active', () => {
    render(<Carousel slides={slides} interval={100000} />);
    const indicators = screen.getAllByRole('button', { name: /go to slide/i });
    expect(indicators).toHaveLength(2);

    expect(indicators[0]).toHaveClass(
      'w-3 h-3 rounded-full transition-all bg-gray-400 hover:bg-gray-700'
    );

    expect(indicators[1]).toHaveClass(
      'w-3 h-3 rounded-full transition-all bg-green-500 w-8 scale-110'
    );
  });

  it('advances active indicator on next button click', () => {
    render(<Carousel slides={slides} interval={100000} />);
    const nextBtn = screen.getByRole('button', { name: /next slide/i });
    const indicators = () =>
      screen.getAllByRole('button', { name: /go to slide/i });

    fireEvent.click(nextBtn);

    expect(indicators()[0]).toHaveClass(
      'w-3 h-3 rounded-full transition-all bg-green-500 w-8 scale-110'
    );
    expect(indicators()[1]).toHaveClass(
      'w-3 h-3 rounded-full transition-all bg-gray-400 hover:bg-gray-700'
    );
  });

  it('goes back on previous button click', () => {
    render(<Carousel slides={slides} interval={100000} />);
    const nextBtn = screen.getByRole('button', { name: /next slide/i });
    const prevBtn = screen.getByRole('button', { name: /previous slide/i });
    const indicators = () =>
      screen.getAllByRole('button', { name: /go to slide/i });

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);

    expect(indicators()[0]).toHaveClass(
      'w-3 h-3 rounded-full transition-all bg-gray-400 hover:bg-gray-700'
    );
    expect(indicators()[1]).toHaveClass(
      'w-3 h-3 rounded-full transition-all bg-green-500 w-8 scale-110'
    );
  });
});
