import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

// BUG-06 FIX: Extract bond line geometry into a child component that can use useMemo
function BondLine({ a, b, color }) {
  // useMemo ensures the BufferGeometry is created once, not on every render frame
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...a), new THREE.Vector3(...b)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [a, b]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

function MoleculeBonds({ nodes, color }) {
  const connections = useMemo(() => {
    const result = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = new THREE.Vector3(...nodes[i]).distanceTo(new THREE.Vector3(...nodes[j]));
        if (dist < 3.5) {
          result.push([nodes[i], nodes[j]]);
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <>
      {connections.map(([a, b], i) => (
        // BUG-06 FIX: Each BondLine memoizes its own geometry — no new allocations per frame
        <BondLine key={i} a={a} b={b} color={color} />
      ))}
    </>
  );
}

function MoleculeGroup({ color = '#00A896' }) {
  const groupRef = useRef();

  const nodes = useMemo(() => [
    [0, 0, 0], [2, 1, 0], [-2, 1, 0], [1, -2, 0],
    [-1, -2, 0], [0, 2.5, 1], [2, -1, 1.5], [-2, -1, 1.5],
    [0, 0, 3], [3, 0, 1], [-3, 0, 1],
  ], []);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            wireframe={i % 3 === 0}
          />
        </mesh>
      ))}
      <MoleculeBonds nodes={nodes} color={color} />
    </group>
  );
}

export default function MoleculeScene({ color = '#00A896' }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color={color} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color={color} />
        <MoleculeGroup color={color} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
