"use client";
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function ModelFrame() {

  const totalFrames = 215; 
  const frameDelay = 2;

  // ✅ Encode the "####_" prefix as "%23%23%23%23_"
  const textures = useLoader(
    TextureLoader,
    Array.from({ length: totalFrames }, (_, i) =>
      `/models/lady_frames/1_${String(i).padStart(5, '0')}.png`
    )
  );

  const meshRef = useRef();
  const counter = useRef(0);
  const frame = useRef(0);

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: textures[0],
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      depthTest: false,
      opacity: 1,
    });
    mat.renderOrder = 1000;
    return mat;
  }, [textures]);

  useFrame(() => {
    counter.current++;
    if (counter.current % frameDelay === 0) {
      frame.current++;
      if (frame.current >= totalFrames) {
        frame.current = 0;
      }
      material.map = textures[frame.current];
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.4]} scale={3}>
      <planeGeometry args={[4, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
