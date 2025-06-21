import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Box ref={meshRef} args={[2, 2, 2]}>
      <meshStandardMaterial 
        color="#22c55e" 
        wireframe 
        transparent 
        opacity={0.8}
      />
    </Box>
  );
}

function FloatingOrbs() {
  const orbs = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <>
      {orbs.map((_, index) => (
        <FloatingOrb key={index} index={index} />
      ))}
    </>
  );
}

function FloatingOrb({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / 8) * Math.PI * 2;
  const radius = 3;
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.x = Math.cos(angle + time * 0.5) * radius;
      meshRef.current.position.z = Math.sin(angle + time * 0.5) * radius;
      meshRef.current.position.y = Math.sin(time + index) * 0.5;
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.1, 16, 16]}>
      <meshStandardMaterial 
        color="#10b981" 
        emissive="#065f46"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

function CentralTorus() {
  const torusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.005;
      torusRef.current.rotation.y += 0.01;
      torusRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Torus ref={torusRef} args={[1.5, 0.3, 16, 100]}>
      <meshStandardMaterial 
        color="#16a34a" 
        wireframe 
        transparent 
        opacity={0.6}
      />
    </Torus>
  );
}

export default function FloatingCube() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#22c55e" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#10b981" />
        
        <AnimatedCube />
        <CentralTorus />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}