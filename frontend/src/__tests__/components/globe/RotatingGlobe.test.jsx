import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import RotatingGlobe from '@/components/globe/RotatingGlobe';

afterEach(cleanup);

jest.mock('three', () => {
  const actual = jest.requireActual('three');
  actual.TextureLoader = jest.fn().mockImplementation(() => ({
    load: () => ({}),
  }));
  return actual;
});

jest.mock('@/components/globe/Marker', () => () => (
  <div data-testid="marker" />
));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
}));

describe('RotatingGlobe Test Cases', () => {
  it('always renders OrbitControls', () => {
    const { getByTestId } = render(
      <RotatingGlobe
        showMarker={false}
        countryCoordinates={null}
        countryName=""
      />
    );
    expect(getByTestId('orbit-controls')).toBeInTheDocument();
  });

  it('does not render Marker when showMarker=false', () => {
    const { queryByTestId } = render(
      <RotatingGlobe
        showMarker={false}
        countryCoordinates={null}
        countryName=""
      />
    );
    expect(queryByTestId('marker')).toBeNull();
  });

  it('renders Marker when showMarker=true and coords are provided', () => {
    const coords = { lat: 12.34, lng: 56.78 };
    const { getByTestId } = render(
      <RotatingGlobe
        showMarker={true}
        countryCoordinates={coords}
        countryName="X"
      />
    );
    expect(getByTestId('marker')).toBeInTheDocument();
  });
});
