import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

function TranslucentRoyalGlassShape({ geometry, position, speed }) {
  const mesh = useRef();
  const initialY = position[1];

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    mesh.current.rotation.x = t * 0.4;
    mesh.current.rotation.y = t * 0.6;
    mesh.current.position.y = initialY + Math.sin(t) * 0.35;
  });

  return (
    <mesh ref={mesh} position={position} geometry={geometry}>
      <meshPhysicalMaterial
        color="#0B4F9C"
        transparent
        opacity={0.4}
        roughness={0.1}
        metalness={0.1}
        transmission={0.75}
        ior={1.4}
        reflectivity={0.6}
        thickness={1.2}
      />
    </mesh>
  );
}

function RoyalDustParticles() {
  const count = 50;
  const mesh = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      spd[i] = 0.003 + Math.random() * 0.004;
    }
    return [pos, spd];
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const array = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += speeds[i];
      if (array[i * 3 + 1] > 5) {
        array[i * 3 + 1] = -5;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#60A5FA"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1.2, 32, 32), []);
  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), []);
  const smallSphereGeo = useMemo(() => new THREE.SphereGeometry(0.8, 32, 32), []);

  return (
    <>
      <ambientLight intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#0B4F9C" />
      <pointLight position={[-6, -4, -3]} intensity={0.8} color="#2563EB" />

      <group position={[0, 0, 0]}>
        <TranslucentRoyalGlassShape geometry={sphereGeo} position={[-2.4, 0.8, 0]} speed={0.25} />
        <TranslucentRoyalGlassShape geometry={icoGeo} position={[2.5, -0.6, -1]} speed={0.2} />
        <TranslucentRoyalGlassShape geometry={smallSphereGeo} position={[0.2, 1.6, -0.5]} speed={0.3} />
      </group>

      <RoyalDustParticles />

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
}

export default function HeroScene() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleVisibility = () => setIsHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={isHidden ? 'never' : 'always'}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
