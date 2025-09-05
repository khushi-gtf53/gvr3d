"use client";
import { useLoader, useFrame } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Html, useTexture } from "@react-three/drei";
import WaterPool from "./Pool/WaterPool";
import gsap from "gsap";
import QueryForm from "./QueryForm";
import { useBreakpointValue } from "@/utils/useBreakpointValue";

const Scene = () => {
    const cityTexture = useTexture("/textures/tile4.jpg");
    cityTexture.colorSpace = THREE.SRGBColorSpace;

    const [speed, setSpeed] = useState(0.02);
    const skyRef = useRef();
    const sceneRef = useRef();
    const scene2BgRef = useRef();
    const poolGroupRef = useRef();
    const dateGroupRef = useRef();
    const [formOpen, setFormOpen] = useState(false);
    const [showScene1, setShowScene1] = useState(true);

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

    const imgTexture = useTexture("/textures/panaromic.jpg");
    const railingTexture = useTexture("/textures/railing3.png");
    const img2Texture = useTexture("/textures/scene2env3.jpg");
    const glass2 = useTexture("/textures/Glass.png");
    img2Texture.wrapS = img2Texture.wrapT = THREE.RepeatWrapping;
    img2Texture.repeat.set(2, 2);
    const marbleTexture = useTexture("/textures/marble2.jpg");
    marbleTexture.wrapS = marbleTexture.wrapT = THREE.RepeatWrapping;
    marbleTexture.repeat.set(10, 10);

    const handleArrowClick = () => {
        if (showScene1) {
            // Scene 1 to Scene 2
            // 1. Pool group fades down and out
            gsap.to(poolGroupRef.current.position, {
                duration: 1.2,
                y: -2,
                ease: "power3.inOut",
            });
            gsap.to(poolGroupRef.current.children, {
                duration: 1.2,
                opacity: 0,
                ease: "power3.inOut",
                onComplete: () => {
                    poolGroupRef.current.visible = false;
                    poolGroupRef.current.position.y = 0; // Reset position
                    // 2. Date group fades up and in
                    dateGroupRef.current.visible = true;
                    dateGroupRef.current.position.y = -2; // Start below
                    gsap.to(dateGroupRef.current.position, {
                        duration: 1.2,
                        y: 0,
                        ease: "power3.inOut",
                    });
                    gsap.to(dateGroupRef.current.children, {
                        duration: 1.2,
                        opacity: 1,
                        ease: "power3.inOut",
                        delay: 0.3, // Slight overlap for smoothness
                        onComplete: () => {
                            // 3. Scene 1 background fades out
                            gsap.to(skyRef.current, {
                                duration: 1.5,
                                opacity: 0,
                                ease: "power3.inOut",
                                delay: 0.3,
                                onComplete: () => {
                                    skyRef.current.visible = false;
                                    // 4. Scene 2 background fades in
                                    scene2BgRef.current.visible = true;
                                    gsap.fromTo(
                                        scene2BgRef.current,
                                        { opacity: 0 },
                                        { duration: 1.5, opacity: 1, ease: "power3.inOut" }
                                    );
                                    setShowScene1(false);
                                },
                            });
                        },
                    });
                },
            });
        } else {
            // Scene 2 to Scene 1
            // 1. Date group fades down and out
            gsap.to(dateGroupRef.current.position, {
                duration: 1.2,
                y: -2,
                ease: "power3.inOut",
            });
            gsap.to(dateGroupRef.current.children, {
                duration: 1.2,
                opacity: 0,
                ease: "power3.inOut",
                onComplete: () => {
                    dateGroupRef.current.visible = false;
                    dateGroupRef.current.position.y = 0; // Reset position
                    // 2. Pool group fades up and in
                    poolGroupRef.current.visible = true;
                    poolGroupRef.current.position.y = -2; // Start below
                    gsap.to(poolGroupRef.current.position, {
                        duration: 1.2,
                        y: 0,
                        ease: "power3.inOut",
                    });
                    gsap.to(poolGroupRef.current.children, {
                        duration: 1.2,
                        opacity: 1,
                        ease: "power3.inOut",
                        delay: 0.3, // Slight overlap for smoothness
                        onComplete: () => {
                            // 3. Scene 2 background fades out
                            gsap.to(scene2BgRef.current, {
                                duration: 1,
                                opacity: 0,
                                ease: "power3.inOut",
                                onComplete: () => {
                                    scene2BgRef.current.visible = false;
                                    // 4. Scene 1 background fades in
                                    skyRef.current.visible = true;
                                    gsap.fromTo(
                                        skyRef.current,
                                        { opacity: 0 },
                                        { duration: 1, opacity: 1, ease: "power3.inOut" }
                                    );
                                    setShowScene1(true);
                                },
                            });
                        },
                    });
                },
            });
        }
    };


    // Break points 

     const textscale = useBreakpointValue({ base: [0.7, 0.7, 0.7], sm: [0.7, 0.7, 0.7], lg: [1.2, 1.2, 1.2],});
     const ladyscale = useBreakpointValue({ base: [0.5, 0.5, 0.5], sm: [0.5, 0.5, 0.5], lg: [0.8, 0.8, 0.8],});  
     const ladyposition = useBreakpointValue({ base: [0, -1.05, -0.4], sm: [0, -1.05, -0.4], lg: [0, -0.8, -0.4],    
  });

    return (
        <group ref={sceneRef}>
            {/* Scene 1 bg */}
            <mesh ref={skyRef} position={[3, 200, -5]} scale={100} visible={showScene1}>
                <cylinderGeometry args={[8, 8, 30, 64]} />
                <meshBasicMaterial map={imgTexture} side={THREE.BackSide} transparent />
            </mesh>

            {/* Scene 2 bg */}
            <mesh
                ref={scene2BgRef}
                position={[3, 300, -5]}
                scale={200}
                visible={!showScene1}
            >
                <cylinderGeometry args={[1, 1, 5, 64]} />
                <meshBasicMaterial map={img2Texture} side={THREE.BackSide} transparent />
            </mesh>

            {/* Text */}
            <mesh position={[0, 1.8, 0]} scale={textscale}>
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
                       bg-transparent text-white text-sm sm:text-xl  mb-48 tracking-[2px] py-[8px] px-[30px] 
                       transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Enquire Now
                        </button>
                    </div>



                    {/* Bottom Text */}
                    <div className="bottom_text uppercase tracking-wider w-full sm:text-2xl absolute bottom-20 sm:bottom-5 
                          flex justify-center items-start text-white">
                        Reserve the last luxury land parcel of Sector 107
                    </div>

                    {/* Common Arrow Button */}
                    <div
                        className="group cursor-pointer absolute right-[50px] top-80"
                        onClick={handleArrowClick}
                    >
                        <div className="w-full flex justify-end">
                            <div className="w-8 sm:w-10 h-8 sm:h-10 relative right-[-10px] top-[48px] sm:top-[60px] rounded-full border border-white"></div>
                        </div>
                        <img
                            src="/images/arrows.png"
                            alt="arrow"
                            className="w-16 sm:w-20 transition-transform duration-300 ease-in-out group-hover:translate-x-[22px]"
                        />
                    </div>

                    {formOpen && <QueryForm onClose={() => setFormOpen(false)} />}
                </div>
            </Html>

            {/* Scene 1 pool scene */}
            <group ref={poolGroupRef} visible={showScene1}>
                {/* <mesh castShadow receiveShadow position={[0, -0.8, -0.4]} scale={ladyscale}> */}
                <mesh castShadow receiveShadow position={ladyposition} scale={ladyscale}>
                    <planeGeometry args={[7.5, 2]} />
                    <meshStandardMaterial
                        transparent
                        depthWrite={false}
                        side={THREE.DoubleSide}
                        map={useLoader(THREE.TextureLoader, "/textures/lady.png")}
                    />
                </mesh>

                <WaterPool />

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
                            color={"#18374c"}
                        // map={marbleTexture}
                        />
                    </mesh>
                </group>
            </group>

            {/* Scene 2 date scene */}
            <group ref={dateGroupRef} visible={!showScene1}>
                <mesh
                    scale={5}
                    position={[14.5, -3.2, -16.3]}
                    rotation={[0, Math.PI / 9, 0]}
                    renderOrder={2} 
                >
                    <planeGeometry args={[14, 1.5]} />
                    <meshStandardMaterial
                        map={railingTexture}
                        transparent={true}
                        opacity={0.9}             
                        side={THREE.DoubleSide}
                        alphaTest={0.3}           
                        depthWrite={false}        
                        depthTest={true}     
                        //  blending={THREE.CustomBlending}

                    />
                </mesh>


                <mesh
                    castShadow
                    receiveShadow
                    position={[0, -3.3, -5.5]}
                    scale={2.5}
                    renderOrder={99}
                >
                    <planeGeometry args={[12.5, 4]} />
                    <meshStandardMaterial
                        transparent
                        depthWrite={false}
                        side={THREE.DoubleSide}
                        map={useLoader(THREE.TextureLoader, "/textures/2.png")}
                    />
                </mesh>
            </group>
        </group>
    );
};

export default Scene;