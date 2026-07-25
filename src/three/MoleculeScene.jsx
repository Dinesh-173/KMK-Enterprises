import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

function BondLine({ a, b, color }) {
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...a), new THREE.Vector3(...b)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [a, b]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.6} />
    </line>
  );
}

function LatticeGroup({ isPrism = false }) {
  const groupRef = useRef();

  const nodeColor = '#94A3B8';
  const edgeColor = isPrism ? '#1D70B8' : '#0B4F9C';

  const nodes = useMemo(() => {
    if (isPrism) {
      return [
        [0, 2.2, 0], [0, -2.2, 0],
        [1.8, 0, 1.8], [-1.8, 0, 1.8], [-1.8, 0, -1.8], [1.8, 0, -1.8],
        [0, 0, 0]
      ];
    }
    return [
      [0, 0, 0], [2, 1, 0], [-2, 1, 0], [1, -2, 0],
      [-1, -2, 0], [0, 2.5, 1], [2, -1, 1.5], [-2, -1, 1.5],
      [0, 0, 3], [3, 0, 1], [-3, 0, 1],
    ];
  }, [isPrism]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.15;
    groupRef.current.rotation.y = t;
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.12;
  });

  const connections = useMemo(() => {
    const result = [];
    const maxDist = isPrism ? 3.8 : 3.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = new THREE.Vector3(...nodes[i]).distanceTo(new THREE.Vector3(...nodes[j]));
        if (dist < maxDist) {
          result.push([nodes[i], nodes[j]]);
        }
      }
    }
    return result;
  }, [nodes, isPrism]);

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          {isPrism ? (
            <octahedronGeometry args={[0.3, 0]} />
          ) : (
            <sphereGeometry args={[0.2, 16, 16]} />
          )}
          <meshStandardMaterial
            color={nodeColor}
            emissive={nodeColor}
            emissiveIntensity={0.4}
            roughness={0.2}
          />
        </mesh>
      ))}

      {connections.map(([a, b], i) => (
        <BondLine key={i} a={a} b={b} color={edgeColor} />
      ))}
    </group>
  );
}

export default function MoleculeScene({ isPrism = false }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} color="#FFFFFF" />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#0B4F9C" />
        <LatticeGroup isPrism={isPrism} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
