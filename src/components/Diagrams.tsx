import React from 'react';

const DiagramContainer = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 200 150" className="w-full h-full bg-[#0f172a]" xmlns="http://www.w3.org/2000/svg">
    {/* Center Axis */}
    <line x1="100" y1="0" x2="100" y2="150" stroke="#334155" strokeDasharray="4 4" />
    {children}
  </svg>
);

export const ElectronGunDiagram = () => (
  <DiagramContainer>
    {/* Filament */}
    <path d="M 85 20 L 100 40 L 115 20" fill="none" stroke="#fbbf24" strokeWidth="2" />
    <circle cx="100" cy="40" r="2" fill="#fbbf24" />
    <text x="120" y="25" fill="#fbbf24" fontSize="8">阴极 (Cathode)</text>
    
    {/* Wehnelt */}
    <path d="M 60 10 L 60 45 L 90 55 L 90 10 Z" fill="#475569" />
    <path d="M 140 10 L 140 45 L 110 55 L 110 10 Z" fill="#475569" />
    <text x="20" y="30" fill="#94a3b8" fontSize="8">韦内特圆筒</text>
    <text x="20" y="40" fill="#94a3b8" fontSize="8">(Wehnelt)</text>
    
    {/* Anode */}
    <rect x="40" y="90" width="50" height="10" fill="#64748b" />
    <rect x="110" y="90" width="50" height="10" fill="#64748b" />
    <text x="145" y="115" fill="#94a3b8" fontSize="8">阳极 (Anode)</text>
    
    {/* Beam */}
    <path d="M 100 40 L 100 150" fill="none" stroke="#60a5fa" strokeWidth="2" />
    <path d="M 100 40 L 95 90 L 85 150" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
    <path d="M 100 40 L 105 90 L 115 150" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
    
    {/* Crossover */}
    <circle cx="100" cy="65" r="1.5" fill="#60a5fa" />
    <text x="110" y="68" fill="#60a5fa" fontSize="8">交叉点 (Crossover)</text>
  </DiagramContainer>
);

export const CondenserLensDiagram = () => (
  <DiagramContainer>
    {/* Incoming beam */}
    <path d="M 80 0 L 100 50 L 120 0" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
    <path d="M 90 0 L 100 50 L 110 0" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />
    <line x1="100" y1="0" x2="100" y2="150" stroke="#60a5fa" strokeWidth="2" />
    
    {/* Lens Coils */}
    <rect x="50" y="30" width="30" height="40" fill="#166534" rx="2" />
    <rect x="120" y="30" width="30" height="40" fill="#166534" rx="2" />
    <text x="155" y="45" fill="#4ade80" fontSize="8">聚光镜</text>
    <text x="155" y="55" fill="#4ade80" fontSize="8">(Condenser)</text>
    
    {/* Coil details */}
    <circle cx="65" cy="40" r="4" fill="#14532d" />
    <circle cx="65" cy="60" r="4" fill="#14532d" />
    <circle cx="135" cy="40" r="4" fill="#14532d" />
    <circle cx="135" cy="60" r="4" fill="#14532d" />
    
    {/* Aperture */}
    <rect x="60" y="90" width="35" height="4" fill="#475569" />
    <rect x="105" y="90" width="35" height="4" fill="#475569" />
    <text x="145" y="93" fill="#94a3b8" fontSize="8">光阑 (Aperture)</text>
    
    {/* Outgoing beam */}
    <path d="M 100 50 L 95 90 L 100 150" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />
    <path d="M 100 50 L 105 90 L 100 150" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />
    
    {/* Specimen plane */}
    <line x1="70" y1="140" x2="130" y2="140" stroke="#ef4444" strokeWidth="2" />
    <text x="135" y="143" fill="#ef4444" fontSize="8">样品 (Specimen)</text>
  </DiagramContainer>
);

export const SpecimenDiagram = () => (
  <DiagramContainer>
    {/* Incoming beam */}
    <path d="M 95 0 L 95 70" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />
    <path d="M 105 0 L 105 70" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />
    <line x1="100" y1="0" x2="100" y2="70" stroke="#60a5fa" strokeWidth="2" />
    
    {/* Specimen */}
    <rect x="60" y="70" width="80" height="10" fill="#7f1d1d" opacity="0.8" />
    <rect x="60" y="70" width="80" height="2" fill="#ef4444" />
    <text x="145" y="75" fill="#ef4444" fontSize="8">样品 (Specimen)</text>
    
    {/* Atoms in specimen */}
    <circle cx="90" cy="75" r="2" fill="#fca5a5" />
    <circle cx="100" cy="75" r="2" fill="#fca5a5" />
    <circle cx="110" cy="75" r="2" fill="#fca5a5" />
    
    {/* Transmitted beam */}
    <line x1="100" y1="80" x2="100" y2="150" stroke="#60a5fa" strokeWidth="2" />
    <text x="105" y="140" fill="#60a5fa" fontSize="8">透射束 (Transmitted)</text>
    
    {/* Scattered beams */}
    <path d="M 100 80 L 70 150" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M 100 80 L 130 150" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M 90 80 L 50 150" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M 110 80 L 150 150" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
    <text x="30" y="130" fill="#3b82f6" fontSize="8">散射束</text>
    <text x="30" y="140" fill="#3b82f6" fontSize="8">(Scattered)</text>
  </DiagramContainer>
);

export const ObjectiveLensDiagram = () => (
  <DiagramContainer>
    {/* Specimen */}
    <line x1="70" y1="20" x2="130" y2="20" stroke="#ef4444" strokeWidth="2" />
    <text x="135" y="23" fill="#ef4444" fontSize="8">样品 (Specimen)</text>
    
    {/* Lens Coils */}
    <rect x="40" y="40" width="30" height="40" fill="#9a3412" rx="2" />
    <rect x="130" y="40" width="30" height="40" fill="#9a3412" rx="2" />
    <text x="165" y="55" fill="#fb923c" fontSize="8">物镜</text>
    <text x="165" y="65" fill="#fb923c" fontSize="8">(Objective)</text>
    
    {/* Beams from specimen */}
    {/* Transmitted */}
    <line x1="100" y1="20" x2="100" y2="150" stroke="#60a5fa" strokeWidth="2" />
    {/* Scattered from center */}
    <path d="M 100 20 L 80 60 L 100 100 L 120 140" fill="none" stroke="#3b82f6" strokeWidth="1" />
    <path d="M 100 20 L 120 60 L 100 100 L 80 140" fill="none" stroke="#3b82f6" strokeWidth="1" />
    
    {/* Scattered from edge */}
    <path d="M 90 20 L 90 60 L 100 100 L 110 140" fill="none" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M 110 20 L 110 60 L 100 100 L 90 140" fill="none" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2 2" />
    
    {/* Back Focal Plane */}
    <line x1="60" y1="100" x2="140" y2="100" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
    <text x="145" y="103" fill="#fbbf24" fontSize="8">后焦面 (BFP)</text>
    
    {/* Image Plane */}
    <line x1="60" y1="140" x2="140" y2="140" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="2 2" />
    <text x="145" y="143" fill="#a7f3d0" fontSize="8">像平面 (Image)</text>
  </DiagramContainer>
);

export const IntermediateLensDiagram = () => (
  <DiagramContainer>
    {/* Object Plane (from Objective) */}
    <line x1="70" y1="20" x2="130" y2="20" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="2 2" />
    <text x="135" y="23" fill="#a7f3d0" fontSize="8">物平面 (Object)</text>
    
    {/* Lens Coils */}
    <rect x="50" y="50" width="25" height="30" fill="#854d0e" rx="2" />
    <rect x="125" y="50" width="25" height="30" fill="#854d0e" rx="2" />
    <text x="155" y="60" fill="#facc15" fontSize="8">中间镜</text>
    <text x="155" y="70" fill="#facc15" fontSize="8">(Intermediate)</text>
    
    {/* Beams */}
    <line x1="100" y1="20" x2="100" y2="150" stroke="#60a5fa" strokeWidth="2" />
    <path d="M 90 20 L 80 65 L 100 110 L 120 150" fill="none" stroke="#3b82f6" strokeWidth="1" />
    <path d="M 110 20 L 120 65 L 100 110 L 80 150" fill="none" stroke="#3b82f6" strokeWidth="1" />
    
    {/* New Image Plane */}
    <line x1="60" y1="110" x2="140" y2="110" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="2 2" />
    <text x="145" y="113" fill="#a7f3d0" fontSize="8">像平面 (Image)</text>
  </DiagramContainer>
);

export const ProjectorLensDiagram = () => (
  <DiagramContainer>
    {/* Object Plane (from Intermediate) */}
    <line x1="80" y1="20" x2="120" y2="20" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="2 2" />
    <text x="125" y="23" fill="#a7f3d0" fontSize="8">物平面 (Object)</text>
    
    {/* Lens Coils */}
    <rect x="45" y="40" width="30" height="30" fill="#a16207" rx="2" />
    <rect x="125" y="40" width="30" height="30" fill="#a16207" rx="2" />
    <text x="160" y="50" fill="#fde047" fontSize="8">投影镜</text>
    <text x="160" y="60" fill="#fde047" fontSize="8">(Projector)</text>
    
    {/* Beams */}
    <line x1="100" y1="20" x2="100" y2="150" stroke="#60a5fa" strokeWidth="2" />
    <path d="M 95 20 L 85 55 L 40 150" fill="none" stroke="#3b82f6" strokeWidth="1" />
    <path d="M 105 20 L 115 55 L 160 150" fill="none" stroke="#3b82f6" strokeWidth="1" />
    
    {/* Projection to screen */}
    <text x="165" y="145" fill="#94a3b8" fontSize="8">至荧光屏</text>
  </DiagramContainer>
);

export const ViewingScreenDiagram = () => (
  <DiagramContainer>
    {/* Incoming diverging beams */}
    <line x1="100" y1="0" x2="100" y2="100" stroke="#60a5fa" strokeWidth="2" />
    <line x1="80" y1="0" x2="40" y2="100" stroke="#3b82f6" strokeWidth="1" />
    <line x1="120" y1="0" x2="160" y2="100" stroke="#3b82f6" strokeWidth="1" />
    <line x1="90" y1="0" x2="70" y2="100" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
    <line x1="110" y1="0" x2="130" y2="100" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
    
    {/* Phosphor Screen */}
    <rect x="20" y="100" width="160" height="6" fill="#4ade80" rx="2" />
    <rect x="20" y="106" width="160" height="4" fill="#334155" rx="1" />
    <text x="145" y="125" fill="#4ade80" fontSize="8">荧光屏 (Phosphor)</text>
    
    {/* Photons emitting */}
    <path d="M 100 100 L 95 85" fill="none" stroke="#a3e635" strokeWidth="1" strokeDasharray="1 1" />
    <path d="M 100 100 L 105 85" fill="none" stroke="#a3e635" strokeWidth="1" strokeDasharray="1 1" />
    <path d="M 40 100 L 35 85" fill="none" stroke="#a3e635" strokeWidth="1" strokeDasharray="1 1" />
    <path d="M 40 100 L 45 85" fill="none" stroke="#a3e635" strokeWidth="1" strokeDasharray="1 1" />
    <path d="M 160 100 L 155 85" fill="none" stroke="#a3e635" strokeWidth="1" strokeDasharray="1 1" />
    <path d="M 160 100 L 165 85" fill="none" stroke="#a3e635" strokeWidth="1" strokeDasharray="1 1" />
    
    <text x="30" y="75" fill="#a3e635" fontSize="8">可见光 (Light)</text>
  </DiagramContainer>
);

export const CameraDiagram = () => (
  <DiagramContainer>
    {/* Incoming beams (screen is lifted) */}
    <line x1="100" y1="0" x2="100" y2="120" stroke="#60a5fa" strokeWidth="2" />
    <line x1="70" y1="0" x2="50" y2="120" stroke="#3b82f6" strokeWidth="1" />
    <line x1="130" y1="0" x2="150" y2="120" stroke="#3b82f6" strokeWidth="1" />
    
    {/* Sensor Array */}
    <rect x="30" y="120" width="140" height="15" fill="#1e293b" rx="2" stroke="#475569" strokeWidth="2" />
    
    {/* Pixels */}
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={35 + i * 11} y="122" width="9" height="11" fill="#334155" />
    ))}
    
    {/* Active pixels */}
    <rect x="90" y="122" width="9" height="11" fill="#60a5fa" />
    <rect x="101" y="122" width="9" height="11" fill="#93c5fd" />
    <rect x="46" y="122" width="9" height="11" fill="#3b82f6" />
    <rect x="145" y="122" width="9" height="11" fill="#3b82f6" />
    
    <text x="140" y="145" fill="#94a3b8" fontSize="8">数字传感器 (Sensor)</text>
    
    {/* Digital signal out */}
    <path d="M 100 135 L 100 150" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" />
    <text x="105" y="145" fill="#10b981" fontSize="8">数字信号 (Data)</text>
  </DiagramContainer>
);

export const getDiagramForPart = (id: string) => {
  switch (id) {
    case 'electron-gun': return <ElectronGunDiagram />;
    case 'condenser-lenses': return <CondenserLensDiagram />;
    case 'specimen': return <SpecimenDiagram />;
    case 'objective-lens': return <ObjectiveLensDiagram />;
    case 'intermediate-lens': return <IntermediateLensDiagram />;
    case 'projector-lens': return <ProjectorLensDiagram />;
    case 'viewing-screen': return <ViewingScreenDiagram />;
    case 'camera': return <CameraDiagram />;
    default: return null;
  }
};
