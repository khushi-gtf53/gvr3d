"use client";
import { useLoader, useFrame } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import * as THREE from "three";
import { useEffect, useRef, useState, useMemo } from "react";
import { Html, useTexture } from "@react-three/drei";
import WaterPool from "./Pool/WaterPool";
import gsap from "gsap";
import QueryForm from "./QueryForm";

export default function SceneOne({ onNext }) {
  const hdrTexture = useMemo(() => {
    try {
      return useLoader(RGBELoader, "/textures/env5.hdr");
    } catch (e) {
      console.warn("HDR failed to load, using fallback color", e);
      return null;
    }
  }, []);

  const cityTexture = useTexture("/textures/tile4.jpg");
  cityTexture.colorSpace = THREE.SRGBColorSpace;

  const [speed, setSpeed] = useState(0.02);
  const skyRef = useRef();
  const sceneRef = useRef();
  const [formOpen, setFormOpen] = useState(false);

  // 🟢 Entry Animation
  useEffect(() => {
    if (sceneRef.current) {
      gsap.fromTo(
        sceneRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }
  }, []);

  // 🟢 Scroll listener + auto exit after 3s
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

  // 🟢 Exit Animation
  const handleExit = () => {
    if (sceneRef.current) {
      gsap.to(sceneRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: onNext,
      });
    }
  };

  useFrame((_, delta) => {
    if (skyRef.current) {
      skyRef.current.rotation.y += delta * speed;
    }
  });

  const tileTexture = useTexture("/textures/tile2.jpg");
  tileTexture.wrapS = tileTexture.wrapT = THREE.RepeatWrapping;
  tileTexture.repeat.set(10, 10);

  const imgTexture = useTexture("/textures/orlando-morning.jpg");
  const marbleTexture = useTexture("/textures/marble2.jpg");
  marbleTexture.wrapS = marbleTexture.wrapT = THREE.RepeatWrapping;
  marbleTexture.repeat.set(10, 10);

  return (
    <group ref={sceneRef}>
      {/* Background */}
      <mesh ref={skyRef} position={[3, -60, -5]} scale={250}>
        <cylinderGeometry args={[1, 1, 5, 64]} />
        <meshBasicMaterial map={imgTexture} side={THREE.BackSide} />
      </mesh>

      {/* Text */}
      <mesh position={[0, 1.4, 0]} scale={1.2}>
        <planeGeometry args={[5, 1.7]} />
        <meshStandardMaterial
          transparent
          depthWrite={false}
          map={useLoader(THREE.TextureLoader, "/textures/text.png")}
        />
      </mesh>

      <Html fullscreen>
        <div className="w-full h-full relative z-[99999] pointer-events-auto">
          {/* CTA Button */}
          <div className="cta_btn flex justify-center items-center h-full">
            <button
              onClick={() => setFormOpen(true)}
              className="bg-gradient-to-r cursor-pointer border border-white uppercase  
                       bg-transparent text-black mb-20 tracking-[2px] py-[8px] px-[30px] 
                       transition duration-300 ease-in-out transform hover:scale-105"
            >
              Enquire Now
            </button>
          </div>

          {/* Bottom Text */}
          <div className="bottom_text uppercase tracking-wider w-full text-2xl absolute bottom-5 
                          flex justify-center items-start text-white">
            cloudside swims on the 40 <span className="text-xl pe-1">TH</span> floor
          </div>

          {/* Arrow Button */}
          <div
            className="group cursor-pointer absolute right-[50px] top-80"
            onClick={handleExit}
          >
            <div className="w-full flex justify-end">
            <div className="w-10 h-10 relative right-[-10px] top-[60px] rounded-full border border-white"></div>
            </div>
            <img
              src="/images/arrows.png"
              alt="arrow"
              className="w-20 transition-transform duration-300 ease-in-out group-hover:translate-x-[22px]"
            />
          </div>

          {/* Query Form (overlay) */}
          {formOpen && <QueryForm onClose={() => setFormOpen(false)} />}
        </div>
      </Html>

      {/* Lady */}
      <mesh castShadow receiveShadow position={[0, -0.8, -0.4]} scale={0.8}>
        <planeGeometry args={[7, 2]} />
        <meshStandardMaterial
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          map={useLoader(THREE.TextureLoader, "/textures/lady.png")}
        />
      </mesh>

      {/* Water */}
      <WaterPool />

      {/* Railing */}
      <group position={[0, 0, 3.45]} scale={2}>
        <mesh scale={5} position={[0, -3.5, -2]}>
          <planeGeometry args={[3, 1]} />
          <meshStandardMaterial
            map={tileTexture}
            color="#5abcd8"
            side={THREE.DoubleSide}
            transparent
            opacity={0.1}
          />
        </mesh>
        <mesh scale={5} position={[0, -3.3199, -2.3]}>
          <planeGeometry args={[3, 1]} />
          <meshStandardMaterial
            side={THREE.DoubleSide}
            transparent
            map={marbleTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
