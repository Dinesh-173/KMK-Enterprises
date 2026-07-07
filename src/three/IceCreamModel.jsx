import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function IceCreamCone() {
  const groupRef = useRef();
  const scoopRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.3;
    groupRef.current.rotation.y = t * 0.3;
    scoopRef.current.position.y = 1.2 + Math.sin(t * 1.2) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Cone body */}
      <mesh position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.8, 2.5, 32]} />
        <meshStandardMaterial
          color="#7B2FBE"
          emissive="#7B2FBE"
          emissiveIntensity={0.3}
          metalness={0.2}
          roughness={0.6}
          wireframe
        />
      </mesh>

      {/* Main scoop */}
      <mesh ref={scoopRef} position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#9B4FDE"
          emissive="#7B2FBE"
          emissiveIntensity={0.5}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      {/* Top scoop smaller */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#9B4FDE"
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.5}
        />
      </mesh>

      {/* Drip detail */}
      <mesh position={[0.5, 0.8, 0.5]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#c084fc" emissive="#9B4FDE" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export default function IceCreamModel() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#9B4FDE" />
        <pointLight position={[-5, -3, 3]} intensity={1} color="#7B2FBE" />
        <IceCreamCone />
      </Canvas>
    </div>
  );
}
