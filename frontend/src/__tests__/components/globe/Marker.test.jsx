import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Marker from '@/components/globe/Marker';
import * as geoUtils from '@/utils/geoUtils';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

jest.mock('@/utils/geoUtils', () => ({
  latLngToVector3: jest.fn(),
}));

jest.mock('@react-three/fiber', () => ({
  useThree: jest.fn(),
}));

jest.mock('@react-three/drei', () => {
  const React = require('react');
  return {
    Text: React.forwardRef((props, ref) => {
      if (ref) {
        ref.current = { lookAt: () => {} };
      }

      return React.createElement('text', { ...props }, props.children);
    }),
  };
});

describe('Marker component test', () => {
  beforeEach(() => {
    geoUtils.latLngToVector3.mockReturnValue(new THREE.Vector3(1, 2, 3));

    useThree.mockReturnValue({
      camera: { position: new THREE.Vector3(0, 0, 5) },
    });
  });

  it('renders exactly two meshes (sphere + cone) when showInfo is false', () => {
    let testRenderer;
    act(() => {
      testRenderer = renderer.create(
        <Marker lat={10} lng={20} showInfo={false} label="Foo" />
      );
    });

    const group = testRenderer.root.findByType('group');

    const meshes = group.findAllByType('mesh');
    expect(meshes).toHaveLength(2);

    expect(group.findAllByType('text')).toHaveLength(0);
  });

  it('adds a <text> info label when showInfo is true and label is provided', () => {
    let testRenderer;
    act(() => {
      testRenderer = renderer.create(
        <Marker lat={10} lng={20} showInfo={true} label="Bar" />
      );
    });

    const group = testRenderer.root.findByType('group');

    expect(group.findAllByType('mesh')).toHaveLength(2);

    const texts = group.findAllByType('text');
    expect(texts).toHaveLength(1);

    expect(texts[0].children).toEqual(['Bar', ' is located here!']);
  });
});
