import * as THREE from 'three';
import { latLngToVector3 } from '@/utils/geoUtils';

describe('latLngToVector3', () => {
  it('returns a Vector3 instance', () => {
    const v = latLngToVector3(0, 0);
    expect(v).toBeInstanceOf(THREE.Vector3);
  });

  it('maps (lat=0, lng=0) on the equator & prime meridian to (radius, 0, 0)', () => {
    const v = latLngToVector3(0, 0);
    expect(v.x).toBeCloseTo(5);
    expect(v.y).toBeCloseTo(0);
    expect(v.z).toBeCloseTo(0);
  });

  it('maps the North Pole (lat=90) to (0, radius, 0)', () => {
    const v = latLngToVector3(90, 123.4);
    expect(v.x).toBeCloseTo(0);
    expect(v.y).toBeCloseTo(5);
    expect(v.z).toBeCloseTo(0);
  });

  it('maps the South Pole (lat=-90) to (0, -radius, 0)', () => {
    const v = latLngToVector3(-90, -45);
    expect(v.x).toBeCloseTo(0);
    expect(v.y).toBeCloseTo(-5);
    expect(v.z).toBeCloseTo(0);
  });

  it('maps (lat=0, lng=90) to (0, 0, -radius)', () => {
    const v = latLngToVector3(0, 90);
    expect(v.x).toBeCloseTo(0);
    expect(v.y).toBeCloseTo(0);
    expect(v.z).toBeCloseTo(-5);
  });

  it('respects a custom radius argument', () => {
    const customR = 10;
    const v = latLngToVector3(0, 0, customR);
    expect(v.x).toBeCloseTo(customR);
    expect(v.y).toBeCloseTo(0);
    expect(v.z).toBeCloseTo(0);
  });
});
