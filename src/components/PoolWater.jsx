import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, Reflector } from "@react-three/drei";
import * as THREE from "three";

export default function PoolWater() {
  const reflectorRef = useRef();
  const { viewport } = useThree();

  // Load a good water normal map
  // const normalMap = new THREE.TextureLoader().load(
  //   "/textures/poolNormals.jpg"
  // );
  // normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;

  useFrame((state, delta) => {
    if (reflectorRef.current) {
      // Slow movement of water normals
      const t = state.clock.getElapsedTime() * 1;
      // normalMap.offset.set(t, t);
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 2]}>
      <planeGeometry args={[20, 5]} />
      <MeshReflectorMaterial
        mirror={0.4}              
        transparent
        blur={[200, 100]}         
        resolution={1024}
        mixBlur={1}
        mixStrength={1.5}         
        depthScale={0.1}           
        minDepthThreshold={0.3}
        maxDepthThreshold={1.0}
        color={"#a7f3ff"}          
        metalness={0.0}            
        roughness={0.05}           
        envMapIntensity={0.5}    
      />

    </mesh>
  );
}
