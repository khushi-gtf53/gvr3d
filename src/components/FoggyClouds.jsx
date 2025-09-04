"use client";
import { Clouds, Cloud, Sky } from "@react-three/drei";

export default function FoggyClouds() {
  return (
    <>
      {/* Realistic dynamic sky background */}
      {/* <Sky
        sunPosition={[100, 20, 100]}
        inclination={0.4}
        azimuth={0.25}
      /> */}

      {/* Lights so clouds are visible */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[50, 100, 50]}
        intensity={1.5}
        castShadow
      />

      {/* Big natural clouds */}
      <Clouds limit={300} range={[-20, 50]} fade>
        <Cloud
          seed={1}
          segments={40}
          volume={8}
          color="#ffffff"
          opacity={0.45}
          speed={0.2}
          position={[-10, 5, -15]} // left side
          scale={[20, 10, 20]}     // bigger cloud
        />
        <Cloud
          seed={2}
          segments={35}
          volume={7}
          color="#f2f8ff"
          opacity={0.4}
          speed={0.15}
          position={[15, 8, -25]} // right side
          scale={[18, 9, 18]}
        />
        <Cloud
          seed={3}
          segments={50}
          volume={10}
          color="#eef6ff"
          opacity={0.35}
          speed={0.1}
          position={[0, 2, -2]} // top side
        //   scale={[25, 12, 25]}
        scale={3}
        />
      </Clouds>
    </>
  );
}
