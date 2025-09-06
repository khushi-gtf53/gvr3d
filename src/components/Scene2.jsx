"use client";
import { useLoader, useFrame ,useThree} from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Html, useTexture } from "@react-three/drei";
import WaterPool from "./Pool/WaterPool";
import gsap from "gsap";
import QueryForm2 from "./QueryForm2";
import { useBreakpointValue } from "@/utils/useBreakpointValue";
import { IoCall } from "react-icons/io5";

const Scene2 = ({ showScene1, setShowScene1 }) => {
    // const cityTexture = useTexture("/textures/tile4.jpg");
    // cityTexture.colorSpace = THREE.SRGBColorSpace;
    function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

// Usage
const isMobile = useIsMobile();
const [line, setLine] = useState(false);
const textPosition = isMobile ? [0, 1.3, 0] : [0, 2.1, 0];
const secondScene = isMobile ? [9, 2.8] : [12.5, 3.6];
const secondRainling = isMobile ? [14.5, -5, -16.3] : [14.5, -3.8, -16.3];

    const [speed, setSpeed] = useState(0.02);
    const skyRef = useRef();
    const sceneRef = useRef();
    const scene2BgRef = useRef();
    const poolGroupRef = useRef();
    const dateGroupRef = useRef();
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        let timeoutId;

        const handleScroll = () => {
            setSpeed(0.3);
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setSpeed(0.02);
            }, 3000);
        };

        window.addEventListener("wheel", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("wheel", handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    useFrame((_, delta) => {
        if (skyRef.current && skyRef.current.visible) {
            skyRef.current.rotation.y += delta * speed;
        }
        if (scene2BgRef.current && scene2BgRef.current.visible) {
            scene2BgRef.current.rotation.y += delta * speed;
        }
    });

    const tileTexture = useTexture("/textures/tile2.jpg");
    tileTexture.wrapS = tileTexture.wrapT = THREE.RepeatWrapping;
    tileTexture.repeat.set(10, 10);

    const imgTexture = useTexture("/textures/panaromic.webp");
    const railingTexture = useTexture("/textures/railing3.png");
    const img2Texture = useTexture("/textures/scene2env3.webp");
    img2Texture.wrapS = img2Texture.wrapT = THREE.RepeatWrapping;
    img2Texture.repeat.set(2, 2);
    const marbleTexture = useTexture("/textures/marble2.jpg");
    marbleTexture.wrapS = marbleTexture.wrapT = THREE.RepeatWrapping;
    marbleTexture.repeat.set(10, 10);

const handleArrowClick = () => {
  if (showScene1) {
    // Scene 1 → Scene 2
    setSpeed(0.5);

    gsap.to(skyRef.current.scale, {
      duration: 1,
      x: skyRef.current.scale.x + 0.2,
      y: skyRef.current.scale.y + 0.2,
      z: skyRef.current.scale.z + 0.2,
      delay: 1,
      ease: "power3.inOut",
    });

    gsap.to(skyRef.current.material, {
      duration: 1,
      opacity: 1,
    //   delay: 1,
      ease: "power3.inOut",
      onComplete: () => {
        skyRef.current.visible = false;
        scene2BgRef.current.visible = true;
        setLine(true);

        // Fade in next BG
        gsap.fromTo(
          scene2BgRef.current.material,
          { opacity: 0.5 },
          { duration: 1.5, opacity: 1, ease: "power3.inOut" }
        );

        // Animate Date Group (Scene 2 content)
        if (dateGroupRef.current) {
          dateGroupRef.current.visible = true;

          // start slightly bigger + hidden
          gsap.fromTo(
            dateGroupRef.current.scale,
            { x: dateGroupRef.current.scale.x + 0.2, y: dateGroupRef.current.scale.y + 0.2, z: dateGroupRef.current.scale.z + 0.2 },
            { x: 1, y: 1, z: 1, duration: 1.2, ease: "power3.out" }
          );
          gsap.fromTo(
            dateGroupRef.current,
            { opacity: 0.5 },
            { opacity: 1, duration: 1.2, ease: "power3.out" }
          );
        }

        setSpeed(0.02);
        setShowScene1(false);
      },
    });
  } else {
    // Scene 2 → Scene 1
    setSpeed(0.5);

    gsap.to(scene2BgRef.current.scale, {
      duration: 1,
      x: scene2BgRef.current.scale.x + 0.2,
      y: scene2BgRef.current.scale.y + 0.2,
      z: scene2BgRef.current.scale.z + 0.2,
      delay: 1,
      ease: "power3.inOut",
    });

    gsap.to(scene2BgRef.current.material, {
      duration: 1,
      opacity: 1,
    //   delay: 1,
      ease: "power3.inOut",
      onComplete: () => {
        scene2BgRef.current.visible = false;
        skyRef.current.visible = true;
        setLine(false)

        gsap.fromTo(
          skyRef.current.material,
          { opacity: 0.5 },
          { duration: 1.5, opacity: 1, ease: "power3.inOut" }
        );

        if (poolGroupRef.current) {
          poolGroupRef.current.visible = true;

          gsap.fromTo(
            poolGroupRef.current.scale,
            { x: poolGroupRef.current.scale.x + 0.2, y: poolGroupRef.current.scale.y + 0.2, z: poolGroupRef.current.scale.z + 0.2 },
            { x: 1, y: 1, z: 1, duration: 1.2, ease: "power3.out" }
          );
          gsap.fromTo(
            poolGroupRef.current,
            { opacity: 0.5 },
            { opacity: 1, duration: 1.2, ease: "power3.out" }
          );
        }

        setSpeed(0.02);
        setShowScene1(true);
      },
    });
  }
};

    // Break points 

    const textscale = useBreakpointValue({ base: [0.7, 0.7, 0.7], sm: [0.7, 0.7, 0.7], lg: [1.2, 1.2, 1.2], });
    const ladyscale = useBreakpointValue({ base: [0.5, 0.5, 0.5], sm: [0.5, 0.5, 0.5], lg: [0.8, 0.8, 0.8], });
    const ladyposition = useBreakpointValue({
        base: [0, -1.05, -0.4], sm: [0, -1.05, -0.4], lg: [0, -0.8, -0.4],
    });

    const textTexturePath = showScene1
        ? "/textures/text.png"
        : "/textures/text-white.png";

    // load texture
    const textTexture = useLoader(THREE.TextureLoader, textTexturePath);

    return (
        <group ref={sceneRef}>
            {/* Scene 1 bg */}
            <mesh ref={skyRef} position={[3, 200, -5]} scale={100} visible={showScene1}>
                <cylinderGeometry args={[8, 8, 30, 64]} />
                <meshBasicMaterial map={imgTexture} side={THREE.BackSide} transparent />
            </mesh>

            {/* Scene 2 bg */}
            <mesh ref={scene2BgRef} position={[3, 300, -5]} scale={200} visible={!showScene1}>
                <cylinderGeometry args={[1, 1, 5, 64]} />
                <meshBasicMaterial map={img2Texture} side={THREE.BackSide} transparent />
            </mesh>

            {/* Text */}
            <mesh position={textPosition} scale={textscale}>
                <planeGeometry args={[5, 1.5]} />
                <meshStandardMaterial transparent depthWrite={false} map={textTexture} />
            </mesh>

            <Html fullscreen>
                <div className="w-full h-full relative z-[99999] pointer-events-auto">
                    {/* CTA Button */}
                    <div className="cta_btn flex justify-center items-center h-full">
                        <button onClick={() => setFormOpen(true)} className={`bg-gradient-to-r cursor-pointer border ${showScene1 ? "border-black text-black" : "border-white text-white"}  uppercase bg-transparent  text-sm sm:text-lg mb-20 md:mb-48 tracking-[2px] py-[8px] px-[30px] transition duration-300 ease-in-out transform hover:scale-105`}
                        > Enquire Now</button>
                    </div>

                    {/* Bottom Text */}
                    <div className="text-[16px] md:text-[20px] px-[15px] md:px-[0] bottom_text uppercase tracking-wider w-full sm:text-xl absolute bottom-20 sm:bottom-10 flex flex-col justify-center items-center text-center text-white">
                      {line ? "Dinner Dates on the 40th floor" : "Cloudside swims on the 40th floor"}
                      <span className=" text-[12px]">RERA NUMBER: UPRERAPRJ510056/09/2025</span>
                       
                    </div>

                    {/* call sec  */}
                    <div className="absolute right-0 md:right-10 bottom-7 sm:bottom-5 w-full text-white flex justify-center md:justify-end items-center gap-4 sm:gap-6">
                        <div className="call text-white cursor-pointer bg-transparent border-white border w-10 h-10 rounded-full flex justify-center items-center p-1">
                            <IoCall size={20} />
                        </div>
                    </div>

                    {/* Common Arrow Button */}
                    <div className="group cursor-pointer absolute right-[20px] md:right-[50px] top-85" onClick={handleArrowClick}>
                        <div className="w-full flex justify-end">
                            <div className="w-8 sm:w-10 h-8 sm:h-10 relative right-[-10px] top-[48px] sm:top-[60px] rounded-full border border-white"></div>
                        </div>
                        <img src="/images/arrows.png" alt="arrow" className="w-16 sm:w-20 transition-transform duration-300 ease-in-out group-hover:translate-x-[25px]" />
                    </div>

                    {formOpen && <QueryForm2 onClose={() => setFormOpen(false)} />}
                </div>
            </Html>

            {/* Scene 1 pool scene */}
            <group ref={poolGroupRef} visible={showScene1}>
                {/* <mesh castShadow receiveShadow position={[0, -0.8, -0.4]} scale={ladyscale}> */}
                <mesh castShadow receiveShadow position={ladyposition} scale={ladyscale}>
                    <planeGeometry args={[7.5, 2]} />
                    <meshStandardMaterial transparent depthWrite={false} side={THREE.DoubleSide}
                        map={useLoader(THREE.TextureLoader, "/textures/lady.png")}
                    />
                </mesh>

                <WaterPool />

                <group position={[0, 0, 3.45]} scale={2}>
                    <mesh scale={5} position={[0, -3.5, -2]}>
                        <planeGeometry args={[3, 1]} />
                        <meshStandardMaterial map={tileTexture} color="#5abcd8" side={THREE.DoubleSide} transparent opacity={0.1} />
                    </mesh>
                    <mesh scale={5} position={[0, -3.3199, -2.3]}>
                        <planeGeometry args={[3, 1]} />
                        <meshStandardMaterial side={THREE.DoubleSide} transparent color={"#18374c"} />
                    </mesh>
                </group>
            </group>

            {/* Scene 2 date scene */}
            <group ref={dateGroupRef} visible={!showScene1} position={[0, -0.7, 0]}>
                <mesh scale={5} position={secondRainling} rotation={[0, Math.PI / 9, 0]} renderOrder={2} >
                    <planeGeometry args={[14, 1.5]} />
                    <meshStandardMaterial map={railingTexture} transparent={true} opacity={0.9} side={THREE.DoubleSide} alphaTest={0.3} depthWrite={false} depthTest={true} />
                </mesh>

                <mesh castShadow receiveShadow position={[0, -3.3, -5.5]} scale={2.5} renderOrder={99}>
                    <planeGeometry args={secondScene} />
                    <meshStandardMaterial transparent depthWrite={false} side={THREE.DoubleSide} map={useLoader(THREE.TextureLoader, "/textures/2_new.webp")} />
                </mesh>
            </group>
        </group>
    );
};

export default Scene2;