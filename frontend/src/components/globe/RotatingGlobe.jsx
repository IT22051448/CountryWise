import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import Marker from './Marker';

const RotatingGlobe = ({ showMarker, countryCoordinates, countryName }) => {
  const globeRef = useRef();

  const globeTexture = useMemo(
    () => new THREE.TextureLoader().load('/assets/globe.jpg'),
    []
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

      <mesh ref={globeRef} rotation={[-0.01, -Math.PI / 4 + 19.64, 0]}>
        <sphereGeometry args={[5, 100, 100]} />
        <meshStandardMaterial
          map={globeTexture}
          roughness={0.7}
          metalness={0.5}
          emissive="#007bff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {showMarker && countryCoordinates && (
        <Marker
          lat={countryCoordinates.lat}
          lng={countryCoordinates.lng}
          showInfo
          label={countryName}
        />
      )}

      <OrbitControls enableZoom minDistance={8} maxDistance={20} />
    </>
  );
};

export default RotatingGlobe;
