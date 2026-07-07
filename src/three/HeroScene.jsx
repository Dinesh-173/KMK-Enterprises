import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry({ position, type, color, scale, speed, rotationOffset }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + rotationOffset;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.3;
  });

  const geometry = useMemo(() => {
    if (type === 'icosahedron') return new THREE.IcosahedronGeometry(1, 1);
    if (type === 'torus') return new THREE.TorusGeometry(1, 0.3, 16, 50);
    if (type === 'octahedron') return new THREE.OctahedronGeometry(1);
    if (type === 'tetrahedron') return new THREE.TetrahedronGeometry(1);
    return new THREE.IcosahedronGeometry(1, 0);
  }, [type]);

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.02;
    camera.position.y += (mouse.current.y * 0.8 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

const SHAPES = [
  { type: 'icosahedron', position: [-4, 1, -2], scale: 0.8, speed: 0.3, color: '#00A896', rotationOffset: 0 },
  { type: 'torus', position: [4, -1, -3], scale: 0.6, speed: 0.2, color: '#00c4ae', rotationOffset: 1 },
  { type: 'octahedron', position: [-2, -2, -1], scale: 0.5, speed: 0.4, color: '#7B2FBE', rotationOffset: 2 },
  { type: 'icosahedron', position: [3, 2, -4], scale: 1.0, speed: 0.25, color: '#00A896', rotationOffset: 3 },
  { type: 'tetrahedron', position: [0, -3, -2], scale: 0.7, speed: 0.35, color: '#00c4ae', rotationOffset: 4 },
  { type: 'torus', position: [-5, 0, -4], scale: 0.9, speed: 0.15, color: '#7B2FBE', rotationOffset: 5 },
  { type: 'icosahedron', position: [5, 3, -5], scale: 0.4, speed: 0.45, color: '#00A896', rotationOffset: 6 },
  { type: 'octahedron', position: [1, 3, -3], scale: 0.6, speed: 0.3, color: '#00c4ae', rotationOffset: 7 },
];

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00A896" />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#7B2FBE" />

      {SHAPES.map((shape, i) => (
        <FloatingGeometry key={i} {...shape} />
      ))}

      <CameraRig />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
}

export default function HeroScene() {
  // BUG-05 FIX: Track document.hidden reactively so frameloop prop updates dynamically
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // BUG-19 FIX: Removed dead-code empty handler — replaced with real reactive state
    const handleVisibility = () => setIsHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        // BUG-05 FIX: frameloop is now driven by reactive state, properly pauses on tab hide
        frameloop={isHidden ? 'never' : 'always'}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
