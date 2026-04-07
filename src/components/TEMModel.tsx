import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { temParts, TEMPart } from '../data/temParts';

interface TEMModelProps {
  onHover: (part: TEMPart | null) => void;
  onClick: (part: TEMPart | null) => void;
  selectedPartId: string | null;
  isBeamOn: boolean;
  rotation?: number;
}

// Helper component to draw a lens (coils + pole pieces)
const Lens = ({ position, coilColor, poleColor, scale = 1 }: { position: [number, number, number], coilColor: string, poleColor: string, scale?: number }) => (
  <group position={position} scale={scale}>
    {/* Outer Coils */}
    <mesh position={[0, 0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
      <torusGeometry args={[0.8, 0.2, 16, 32]} />
      <meshStandardMaterial color={coilColor} roughness={0.6} />
    </mesh>
    <mesh position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
      <torusGeometry args={[0.8, 0.2, 16, 32]} />
      <meshStandardMaterial color={coilColor} roughness={0.6} />
    </mesh>
    {/* Inner Pole Piece (thick torus to leave a center hole) */}
    <mesh rotation={[Math.PI/2, 0, 0]}>
      <torusGeometry args={[0.3, 0.2, 16, 32]} />
      <meshStandardMaterial color={poleColor} metalness={0.8} roughness={0.2} />
    </mesh>
  </group>
);

export default function TEMModel({ onHover, onClick, selectedPartId, isBeamOn, rotation = 0 }: TEMModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scanBeamRef = useRef<THREE.Group>(null);
  const projectBeamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Smoothly interpolate rotation for better feel
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotation, 0.1);
    }
    
    if (isBeamOn) {
      const t = state.clock.elapsedTime;
      const scanX = Math.sin(t * 15) * 0.03;
      const scanZ = Math.cos(t * 19) * 0.03;
      
      if (scanBeamRef.current) {
        scanBeamRef.current.rotation.x = scanZ;
        scanBeamRef.current.rotation.z = -scanX;
      }
      if (projectBeamRef.current) {
        projectBeamRef.current.rotation.x = -scanZ * 1.5;
        projectBeamRef.current.rotation.z = scanX * 1.5;
      }
    }
  });

  const handlePointerOver = (e: any, part: TEMPart) => {
    e.stopPropagation();
    onHover(part);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    onHover(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: any, part: TEMPart) => {
    e.stopPropagation();
    onClick(part);
  };

  return (
    <group ref={groupRef} position={[0, 2, 0]} scale={0.8}>
      {/* Electron Beam (Dynamic Scanning) */}
      {isBeamOn && (
        <group>
          {/* 1. Electron Gun to Condenser (Straight) */}
          <mesh position={[0, 6.0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 3.0, 16]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.8} depthWrite={false} />
          </mesh>
          
          {/* 2. Condenser to Sample (Focusing & Scanning) */}
          <group position={[0, 4.5, 0]} ref={scanBeamRef}>
            <mesh position={[0, -1.0, 0]}>
              <cylinderGeometry args={[0.02, 0.005, 2.0, 16]} />
              <meshBasicMaterial color="#00ffff" transparent opacity={0.6} depthWrite={false} />
            </mesh>
          </group>
          
          {/* 3. Sample to Detector (Diverging/Projecting) */}
          <group position={[0, 2.5, 0]} ref={projectBeamRef}>
            <mesh position={[0, -5.75, 0]}>
              <cylinderGeometry args={[0.005, 0.8, 11.5, 32]} />
              <meshBasicMaterial color="#00ffff" transparent opacity={0.25} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      )}

      {/* TEM Parts */}
      {temParts.map((part) => {
        const isSelected = selectedPartId === part.id;
        const isActive = isSelected;

        return (
          <group key={part.id} position={part.position}>
            {/* Outer Shell (Half-open cutaway) */}
            <mesh
              onPointerOver={(e) => handlePointerOver(e, part)}
              onPointerOut={handlePointerOut}
              onClick={(e) => handleClick(e, part)}
            >
              {/* args: [radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength] */}
              {/* thetaStart: Math.PI / 2, thetaLength: Math.PI renders the back half, leaving the front half (facing user) open */}
              <cylinderGeometry args={[part.args[0], part.args[1], part.args[2], part.args[3], 1, false, Math.PI / 2, Math.PI]} />
              <meshStandardMaterial
                color={isActive ? part.color : '#e2e8f0'}
                metalness={0.85}
                roughness={0.25}
                transparent={false}
                opacity={1}
                side={THREE.DoubleSide}
                emissive={isActive ? part.color : '#000000'}
                emissiveIntensity={isActive ? 0.4 : 0}
              />
              
              {/* Outline for better definition */}
              <Edges
                linewidth={2}
                threshold={15}
                color={isActive ? part.color : '#94a3b8'}
              />
            </mesh>

            {/* Internal Structures based on MyScope diagram */}
            {part.id === 'electron-gun' && (
              <group position={[0, 0, 0]}>
                {/* Blue insulator base */}
                <mesh position={[0, 0.5, 0]}>
                  <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
                  <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.2, 0]}>
                  <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
                  <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} />
                </mesh>
                {/* Tip */}
                <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.1, 0]}>
                  <coneGeometry args={[0.1, 0.3, 16]} />
                  <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} emissive={isBeamOn ? "#fbbf24" : "#000"} emissiveIntensity={isBeamOn ? 2 : 0} />
                </mesh>
                {/* Anode */}
                <mesh rotation={[Math.PI/2, 0, 0]} position={[0, -0.5, 0]}>
                  <torusGeometry args={[0.3, 0.05, 16, 32]} />
                  <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
                </mesh>
              </group>
            )}

            {part.id === 'condenser-lenses' && (
              <group>
                <Lens position={[0, 0.8, 0]} coilColor="#22c55e" poleColor="#3b82f6" />
                <Lens position={[0, -0.8, 0]} coilColor="#22c55e" poleColor="#3b82f6" />
              </group>
            )}

            {part.id === 'specimen' && (
              <group>
                {/* Specimen Rod (Entering from right) */}
                <group position={[1.5, 0, 0]}>
                  <mesh rotation={[0, 0, Math.PI/2]}>
                    <cylinderGeometry args={[0.08, 0.08, 3.0, 16]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} />
                  </mesh>
                  {/* Silver Tip */}
                  <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.5, 16]} />
                    <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
                  </mesh>
                </group>
              </group>
            )}

            {part.id === 'objective-lens' && (
              <group>
                <Lens position={[0, 0.5, 0]} coilColor="#f97316" poleColor="#3b82f6" />
                <Lens position={[0, -0.5, 0]} coilColor="#f97316" poleColor="#3b82f6" />
              </group>
            )}

            {part.id === 'intermediate-lens' && (
              <group>
                <Lens position={[0, 0, 0]} coilColor="#eab308" poleColor="#3b82f6" scale={0.9} />
              </group>
            )}

            {part.id === 'projector-lens' && (
              <group>
                <Lens position={[0, 0, 0]} coilColor="#facc15" poleColor="#3b82f6" scale={0.9} />
              </group>
            )}

            {part.id === 'viewing-screen' && (
              <group>
                {/* Phosphor Screen */}
                <mesh position={[0, -1.0, 0]} rotation={[-Math.PI/2, 0, 0]}>
                  <circleGeometry args={[1.5, 32]} />
                  <meshStandardMaterial color="#4ade80" emissive={isBeamOn ? "#4ade80" : "#000"} emissiveIntensity={isBeamOn ? 0.5 : 0} side={THREE.DoubleSide} />
                </mesh>
              </group>
            )}

            {part.id === 'camera' && (
              <group>
                {/* Camera Lens/Sensor */}
                <mesh position={[0, 0.5, 0]}>
                  <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.6, 0]}>
                  <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
                  <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.2} />
                </mesh>
              </group>
            )}

            {/* 2D Screen-Space Label (Won't rotate with the 3D model) */}
            <Html
              position={[0, 0, 0]}
              style={{ pointerEvents: 'none' }}
            >
              <div className="absolute top-0 left-0">
                {part.labelPosition === 'left' ? (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center flex-row-reverse">
                    {/* Invisible spacer to push label outside the 3D object radius */}
                    <div className="w-[60px] sm:w-[80px]"></div>
                    {/* Connecting Line */}
                    <div className="w-8 sm:w-12 h-[1px] bg-white/40"></div>
                    {/* Label Box */}
                    <div className={`backdrop-blur-md px-4 py-2 rounded-lg border whitespace-nowrap shadow-xl transition-colors duration-300 ${
                      isActive ? 'bg-black/90 border-white/50 text-white' : 'bg-black/60 border-white/20 text-slate-200'
                    }`}>
                      <div className="font-bold text-lg">{part.name}</div>
                      <div className="text-xs opacity-70 font-mono">{part.englishName}</div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center flex-row">
                    {/* Invisible spacer to push label outside the 3D object radius */}
                    <div className="w-[60px] sm:w-[80px]"></div>
                    {/* Connecting Line */}
                    <div className="w-8 sm:w-12 h-[1px] bg-white/40"></div>
                    {/* Label Box */}
                    <div className={`backdrop-blur-md px-4 py-2 rounded-lg border whitespace-nowrap shadow-xl transition-colors duration-300 ${
                      isActive ? 'bg-black/90 border-white/50 text-white' : 'bg-black/60 border-white/20 text-slate-200'
                    }`}>
                      <div className="font-bold text-lg">{part.name}</div>
                      <div className="text-xs opacity-70 font-mono">{part.englishName}</div>
                    </div>
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

