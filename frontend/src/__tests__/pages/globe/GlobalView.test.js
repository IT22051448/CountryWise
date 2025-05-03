import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/components/globe/Globe', () => () => (
  <div data-testid="mock-globe" />
));

import GlobeView from '@/pages/globe/GlobalView';

describe('<GlobeView />', () => {
  it('renders without crashing', () => {
    render(<GlobeView />);
    expect(screen.getByTestId('mock-globe')).toBeInTheDocument();
  });
});
