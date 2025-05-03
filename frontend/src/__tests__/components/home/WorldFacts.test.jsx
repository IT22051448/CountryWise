import React from 'react';
import { render, screen } from '@testing-library/react';
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

describe('WorldFacts component', () => {
  beforeEach(() => {
    render(<WorldFacts />);
  });

  it('renders the section heading and subtitle', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: /Amazing World Facts/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Discover fascinating information from around the globe/i
      )
    ).toBeInTheDocument();
  });

  it('displays each fact text and corresponding image', () => {
    expect(
      screen.getByText(
        /The Pacific Ocean is larger than all of Earth’s land combined./i
      )
    ).toBeInTheDocument();
    const img1 = screen.getByAltText('Fact 1');
    expect(img1).toHaveAttribute('src', 'pacific.jpg');

    expect(
      screen.getByText(/Mount Everest grows about 4 millimeters every year./i)
    ).toBeInTheDocument();
    const img2 = screen.getByAltText('Fact 2');
    expect(img2).toHaveAttribute('src', 'everest.jpg');
  });

  it('renders a source line when source is provided but omits when null', () => {
    expect(
      screen.getByText(/Source:/i, { selector: 'div' })
    ).toBeInTheDocument();
    expect(screen.getByText(/National Geographic/i)).toBeInTheDocument();

    const sourceElements = screen.queryAllByText(/Source:/i);
    expect(sourceElements).toHaveLength(1);
  });

  it('renders the "Explore More Facts" button', () => {
    const btn = screen.getByRole('button', { name: /Explore More Facts/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('bg-gradient-to-r');
  });
});
