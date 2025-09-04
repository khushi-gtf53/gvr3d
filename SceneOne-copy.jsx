"use client";
import { useLoader, useFrame } from "@react-three/fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import * as THREE from "three";
import { useRef } from "react";
import WaterPlane from "./WaterPlane";
import PoolWater from "./PoolWater";
import { useTexture } from "@react-three/drei";
import WaterPool from "./Pool/WaterPool";

export default function SceneOne() {
    const texture = useLoader(RGBELoader, "/textures/env3.hdr");
    const texture2 = useTexture("/textures/city.png");
    texture2.colorSpace = THREE.SRGBColorSpace;

    const skyRef = useRef();

    useFrame((state, delta) => {
        if (skyRef.current) {
            skyRef.current.rotation.y += delta * 0.02;
        }
    });

    const tileTexture = useTexture("/textures/tile.jpg");
    tileTexture.wrapS = tileTexture.wrapT = THREE.RepeatWrapping;
    return (
        <>
            {/* Environment  */}
            <mesh ref={skyRef} scale={100}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>
            {/* <mesh   position={[0, 6, -10]}>
                <planeGeometry args={[50,30]} />
                <meshBasicMaterial map={texture2}   />
            </mesh> */}

            {/* Water  */}
            {/* <WaterPlane /> */}
            <WaterPool />
            {/* <PoolWater /> */}
            <group position={[0, 0.5, 3.45]} scale={2}>
                <mesh scale={4.5} position={[0, -2.29, 7]} rotation={[0, Math.PI / 2, 0]}>
                    <cylinderGeometry args={[2, 2, 0.7, 64, 1, true, 0, Math.PI]} />
                    <meshStandardMaterial map={tileTexture} color={"#bababa"} side={THREE.DoubleSide} />
                </mesh>
                <mesh scale={4.5} position={[0, -0.7, 7]} rotation={[0, Math.PI / 2, 0]}>
                    <cylinderGeometry args={[2, 2, 0.01, 96, 1, true, 0, Math.PI]} />
                    <meshStandardMaterial color={"#014f7d"} side={THREE.DoubleSide} />
                </mesh>
            </group>


            {/* Railing  */}
            <group position={[0, -0.23, 0]}>
                {/* <mesh scale={4.5} position={[0, -3, -0.5]}>
                    <boxGeometry args={[4, 1, 0.02]} />
                    <meshStandardMaterial map={tileTexture} color={"#bababa"} />
                </mesh> */}
                {/* <mesh scale={4.5} position={[0, -0.75, -0.5]}>
                    <boxGeometry args={[4, 0.01, 0.001]} />
                    <meshStandardMaterial color={"black"} />
                </mesh> */}
            </group>

            {/* Text  */}
            <mesh position={[0, 1.5, 1]} >
                <planeGeometry args={[5, 2]} />
                <meshStandardMaterial transparent map={useLoader(THREE.TextureLoader, "/textures/text.png")} />
            </mesh>

            {/* Lady  */}
            <mesh castShadow receiveShadow position={[0, -0.25, -0.4]} scale={0.8}>
                <planeGeometry args={[6, 2]} />
                <meshStandardMaterial
                    transparent
                    depthWrite={false}
                    side={THREE.DoubleSide}
                    map={useLoader(THREE.TextureLoader, "/textures/lady.png")}

                />
            </mesh>


        </>
    );
}
