import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { latLngToVector3 } from '../../utils/geoUtils';
import { useThree } from '@react-three/fiber';

const Marker = ({ lat, lng, showInfo, label }) => {
  const position = useMemo(() => latLngToVector3(lat, lng, 5.15), [lat, lng]);

  const direction = useMemo(
    () => new THREE.Vector3().copy(position).negate().normalize(),
    [position]
  );

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, -1, 0), direction);
    return q;
  }, [direction]);

  const textRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  }, [camera.position]);

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="orange"
          emissive="red"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh position={[0, -0.12, 0]}>
        <coneGeometry args={[0.03, 0.2, 16]} />
        <meshStandardMaterial
          color="orange"
          emissive="red"
          emissiveIntensity={0.6}
        />
      </mesh>

      {showInfo && label && (
        <Text
          ref={textRef}
          position={[0, 0.6, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="bottom"
          outlineColor="black"
          outlineWidth={0.02}
          scale={[-1, 1, 1]}
        >
          {label} is located here!
        </Text>
      )}
    </group>
  );
};

export default Marker;
