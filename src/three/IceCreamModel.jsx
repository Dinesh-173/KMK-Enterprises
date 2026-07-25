import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function SabrosaSoftMesh() {
  const mesh1 = useRef();
  const mesh2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.25;
    mesh1.current.rotation.y = t;
    mesh1.current.rotation.x = Math.sin(t) * 0.2;
    mesh2.current.rotation.z = -t * 0.6;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Soft Royal Blue Wireframe Fluid Mesh */}
      <mesh ref={mesh1} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32, 2, 5]} />
        <meshStandardMaterial
          color="#0B4F9C"
          wireframe
          emissive="#0B4F9C"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Inner Cream Solid Mesh */}
      <mesh ref={mesh2} position={[0, 0, 0]} scale={0.88}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32, 2, 5]} />
        <meshStandardMaterial
          color="#F4F1EA"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function IceCreamModel() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.0} color="#FFFFFF" />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#0B4F9C" />
        <pointLight position={[-5, -3, 3]} intensity={0.6} color="#2563EB" />
        <SabrosaSoftMesh />
      </Canvas>
    </div>
  );
}
