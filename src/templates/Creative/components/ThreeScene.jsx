import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
  Stars,
} from "@react-three/drei";
import { useRef } from "react";
// import * as THREE from "three";

const AnimatedSphere = () => {
  const sphereRef = useRef(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1, 100, 200]} ref={sphereRef} scale={2.4}>
        <MeshDistortMaterial
          color="#3d1c56"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

export const ThreeScene = () => {
  return (
    <Canvas className="absolute top-0 left-0 z-0">
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 1]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#9333ea" intensity={1} />
      <AnimatedSphere />
    </Canvas>
  );
};
