"use client";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function WaterPlane({ rippleOrigin = [0, 1.5, 1] }) {
  const waterRef = useRef();

  // Subtle pool water normal map
  const waterNormals = useLoader(TextureLoader, "/textures/waternormals3.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geometry = useMemo(() => new THREE.PlaneGeometry(50, 10, 256, 256), []);

  const water = useMemo(() => {
    return new Water(geometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(0, 1, 0),
      sunColor: 0xffffff,
      waterColor: new THREE.Color("#7fc8e6"), // softer aqua (realistic pool)
      distortionScale: 0.015, // super subtle ripples
      fog: false,
      format: THREE.RGBAFormat,
    });
  }, [geometry, waterNormals]);

  // Animate calm surface
  useFrame((_, delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms.time.value += delta * 0.2;

      // Ripple center = lady position
      const uniforms = waterRef.current.material.uniforms;
      const t = uniforms.time.value;
      const rippleCenter = new THREE.Vector2(
        rippleOrigin[0] / 50 + 0.5,
        rippleOrigin[2] / 10 + 0.5
      );
      uniforms.rippleCenter = { value: rippleCenter };
      uniforms.rippleTime = { value: t };
    }
  });

  // Add local ripple shader mod
  useMemo(() => {
    if (!water.material) return;

    water.material.onBeforeCompile = (shader) => {
      shader.uniforms.rippleCenter = { value: new THREE.Vector2(0.5, 0.5) };
      shader.uniforms.rippleTime = { value: 0 };

      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <common>`,
        `
          #include <common>
          uniform vec2 rippleCenter;
          uniform float rippleTime;

          float ripple(vec2 uv, vec2 center, float time) {
            float d = distance(uv, center);
            return 0.01 * sin(40.0 * d - time * 4.0) * exp(-4.0 * d);
          }
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
        `
          float r = ripple(vUv, rippleCenter, rippleTime);
          gl_FragColor = vec4(outgoingLight + vec3(r), diffuseColor.a);
        `
      );
    };
  }, [water]);

  return (
    <primitive
      ref={waterRef}
      object={water}
      transparent
      rotation-x={-Math.PI / 2}
      position={[0, -1, 2]}
      receiveShadow
    />
  );
}
