import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RGBELoader } from "three-stdlib";
import * as THREE from "three";
import { Html, useTexture } from "@react-three/drei";
import gsap from "gsap";

const SceneTwo = ({ onNext }) => {
  const { gl, scene } = useThree();
  const rawHdr = useLoader(RGBELoader, "/textures/env3.hdr");

  // 🟢 Convert HDR to envMap (for reflections)
  const envMap = useMemo(() => {
    if (!rawHdr) return null;
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromEquirectangular(rawHdr).texture;
    rawHdr.mapping = THREE.EquirectangularReflectionMapping; // allow mapping
    rawHdr.dispose();
    pmrem.dispose();
    return env;
  }, [rawHdr, gl]);

  const [speed, setSpeed] = useState(0.02);
  const skyRef = useRef();
  const sceneRef = useRef();

  useEffect(() => {
    if (envMap) {
      scene.background = envMap;
    }
  }, [envMap, scene]);

  useEffect(() => {
    if (sceneRef.current) {
      gsap.fromTo(
        sceneRef.current.position,
        { opacity: 1 },
        { opacity: 0, duration: 1.5, ease: "power2.out" }
      );
      gsap.fromTo(
        sceneRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }
  }, []);

  // 🟢 Exit animation (fade down)
  const handleExit = () => {
    if (sceneRef.current) {
      gsap.to(sceneRef.current.position, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
      gsap.to(sceneRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: onNext,
      });
    }
  };

  // 🟢 Scroll listener (3s inactivity → exit)
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      setSpeed(0.3);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSpeed(0.02);
        handleExit();
      }, 3000);
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useFrame((_, delta) => {
    if (skyRef.current) {
      skyRef.current.rotation.y += delta * speed;
    }
  });

  const railingTexture = useTexture("/textures/railing.png");
  const imgTexture = useTexture("/textures/scene2bg.jpg");
  imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
  imgTexture.repeat.set(2, 2);

  return (
    <group ref={sceneRef}>
      {/* Optional Sky Sphere (if you want sphere visible instead of scene.background) */}
      {/* <mesh ref={skyRef} scale={100} position={[0, -5, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        {rawHdr ? (
          <meshBasicMaterial map={rawHdr} side={THREE.BackSide} />
        ) : (
          <meshBasicMaterial  side={THREE.BackSide} />
        )}
      </mesh> */}

      <mesh ref={skyRef} position={[3, -200, -5]} scale={250}>
        <cylinderGeometry args={[2, 1, 5, 64]} />
        <meshBasicMaterial map={imgTexture} side={THREE.BackSide} />
      </mesh>


      {/* Arrow Button */}
      <Html fullscreen>
        {/* <div
          className="w-14 h-14 rounded-full flex justify-center items-center cursor-pointer bg-transparent absolute left-[40px] top-80"
          onClick={handleExit}
        >
          <img src="/images/left_arrow.png" alt="" />
        </div> */}
        <div
          className="w-14 h-14 rounded-full flex-col flex justify-center gap-0 cursor-pointer bg-transparent absolute left-[40px] top-80"
          onClick={handleExit}
        >
          <img src="/images/back.png" alt="" />
          <img src="/images/back2.png" alt="" />
        </div>
      </Html>

      <mesh castShadow receiveShadow position={[0, -2.5, -4.5]} scale={2.5}>
        <planeGeometry args={[12.5, 5]} />
        <meshStandardMaterial transparent depthWrite={false} side={THREE.DoubleSide} map={useLoader(THREE.TextureLoader, "/textures/scene2bg.png")}
        />
      </mesh>
      <mesh scale={5} position={[14.5, -2.5, -16.3]} rotation={[0, Math.PI / 9, 0]}>
        <planeGeometry args={[14, 1,]} />
        <meshStandardMaterial color={"white"} side={THREE.DoubleSide} transparent={true} map={railingTexture} opacity={0.7} />
      </mesh>

    </group>
  );
};

export default SceneTwo;
