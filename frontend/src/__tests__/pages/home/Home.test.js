import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/pages/home/Home';

jest.mock('@/components/home/Carousel', () => ({ slides }) => (
  <div data-testid="carousel" data-slides={slides.length} />
));
jest.mock('@/components/home/WorldFacts', () => () => (
  <div data-testid="world-facts" />
));

jest.mock('@/data/homeContent', () => ({
  slides: [
    { id: 1, content: 'Slide 1' },
    { id: 2, content: 'Slide 2' },
  ],
}));

describe('<Home />', () => {
  it('displays the Carousel with correct props', () => {
    render(<Home />);
    const carousel = screen.getByTestId('carousel');
    expect(carousel).toBeInTheDocument();
    expect(carousel.dataset.slides).toBe('2');
  });

  it('displays the WorldFacts component', () => {
    render(<Home />);
    expect(screen.getByTestId('world-facts')).toBeInTheDocument();
  });
});
