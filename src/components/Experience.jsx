"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Navbar from "./Navbar";
import { Leva, useControls } from "leva";
import SceneOne from "./SceneOne";
import SceneTwo from "./SceneTwo";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Scene";

export default function Experience() {
  const [scene, setScene] = useState(1);

  const handleSceneChange = () => {
    setScene((prev) => (prev === 1 ? 2 : 1));
  };

  const {x, y, z} = useControls("sun", {
    x : 1.0, min : -100, max: 100 , step : 0.01,
    y : 1.0, min : -100, max: 100 , step : 0.01,
    z : 1.0, min : -100, max: 100 , step : 0.01,
  })

  return (
    <main className="w-full h-screen relative">
      <Navbar scene={scene} />

      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 75 }}
        id="scene-container"
      >
        
        {/* <OrbitControls/>   */}
        {/* <directionalLight
          position={[x, y, z]}
          intensity={1.0}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        /> */}
        <ambientLight intensity={1.4} />

        <Suspense fallback={null}>
          {/* {scene === 1 ? (
            <SceneOne onNext={handleSceneChange} />
          ) : (
            <SceneTwo onNext={handleSceneChange} />
          )} */}
          <Scene/>
        </Suspense>
        <Leva hidden />
      </Canvas>
    </main>
  );
}
