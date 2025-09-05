import { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useControls } from "leva";
import WaterBase from "./WaterBase";
import { useTexture } from "@react-three/drei";

export default function WaterPool({rotation}) {
  const ref = useRef();
  const planeRef = useRef();
  const { camera } = useThree();

  const waterNormals = useLoader(TextureLoader, "/textures/waternormals.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  waterNormals.repeat.set(2,2)
  const rippleTexture = useLoader(TextureLoader, "/textures/ripple2.webp");

  const { waterColor, waterDistortion } = useControls("Lake", {
    waterColor: "#214177",
    // waterColor: "#42b3f5",
    waterDistortion: { value: 0.2, min: 0, max: 10, step: 0.05 },
  });

  const geometry = useMemo(() => new THREE.PlaneGeometry(20, 5), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useMemo(() => new THREE.Vector2(), []);

  const [ripples, setRipples] = useState([]);
  const lastRippleTime = useRef(0);

const water = useMemo(() => {
  const w = new Water(geometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals,
    alpha: 1.0,
    sunDirection: new THREE.Vector3(0.5, 0.5, 0.2).normalize(),
    sunColor: 0xaaaaaa, 
    waterColor: new THREE.Color(waterColor),
    distortionScale: waterDistortion * 0.0001, // smaller = calmer ripples
    fog: true,
  });

  w.material.uniforms.size.value = 4.0; // larger waves
  w.material.uniforms.alpha.value = 0.9; 
  w.material.uniforms.sunColor.value.set(0xddeeff); // bluish tint instead of pure white

  w.material.transparent = true;
  w.material.depthWrite = true;

  return w;
}, [geometry, waterNormals, waterColor, waterDistortion]);


  useEffect(() => {
    if (ref.current) {
      ref.current.material.uniforms.waterColor.value.set(waterColor);
      ref.current.material.uniforms.distortionScale.value = waterDistortion;
    }
  }, [waterColor, waterDistortion]);

  const handlePointerMove = (event) => {
    const now = performance.now();
    if (now - lastRippleTime.current < 200) return;
    lastRippleTime.current = now;

    event.stopPropagation();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(planeRef.current);

    if (intersects.length > 0) {
      const point = intersects[0].point.clone();
      point.y = -10;

      setRipples((prev) => [
        ...prev.slice(-9),
        {
          id: Date.now() + Math.random(),
          position: point,
          scale: 1,
          opacity: 0.6,
        },
      ]);
    }
  };

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta * 0.1;
    }

    setRipples((prevRipples) =>
      prevRipples
        .map((r) => ({
          ...r,
          scale: r.scale + delta * 8,
          opacity: r.opacity - delta * 1.2,
        }))
        .filter((r) => r.opacity > 0 && r.scale < 8)
    );
  });

  const rippleMeshes = useMemo(() => {
    return ripples.map((ripple) => (
      <mesh
        key={ripple.id}
        position={ripple.position}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[ripple.scale, ripple.scale, 1]}
        renderOrder={999}
      >
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial
          map={rippleTexture}
          transparent
          opacity={ripple.opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    ));
  }, [ripples, rippleTexture]);

  const glass = useTexture("/textures/water.jpg");
  return (
    <>
    <group rotation={rotation}>
      <mesh
        ref={planeRef}
        position={[50, -9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        visible={false}
      >
        <planeGeometry args={[20, 5]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <primitive
        object={water}
        ref={ref}
        position={[0, -1.5, 2]}
        rotation-x={-Math.PI / 2}
        // rotation-y={-Math.PI/6}
        onPointerMove={handlePointerMove}
        renderOrder={1}
      />

      {/* <mesh rotation={[-Math.PI/2,0, 0]} position={[0, -1.4, 2.1]}>
        <planeGeometry args={[20, 5]}/>
        <meshStandardMaterial transparent color={"white"} opacity={0.6} map={glass}/>
      </mesh> */}

      {rippleMeshes}

      <WaterBase />
      </group>
    </>
  );
}