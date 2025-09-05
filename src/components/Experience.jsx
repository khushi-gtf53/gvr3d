"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Navbar from "./Navbar";
import { Leva } from "leva";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";
import Scene2 from "./Scene2";

export default function Experience() {
  const [showScene1, setShowScene1] = useState(true); // track active scene

  return (
    <main className="w-full h-screen relative">
      {/* pass scene info to Navbar */}
      <Navbar showScene1={showScene1} />
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 75 }}
        id="scene-container"
        >
        {/* <OrbitControls/> */}
        <ambientLight intensity={1.4} />

        <Suspense fallback={null}>
          {/* pass setter to Scene so it can toggle */}
          {/* <Scene setShowScene1={setShowScene1} showScene1={showScene1} /> */}
          <Scene2 setShowScene1={setShowScene1} showScene1={showScene1} />
        </Suspense>

        <Leva hidden />
      </Canvas>
    </main>
  );
}
