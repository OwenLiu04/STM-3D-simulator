import { useState, Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { CameraControls, Stars, ContactShadows, Html, useProgress } from '@react-three/drei';
import TEMModel from './components/TEMModel';
import InfoPanel from './components/InfoPanel';
import ControlConsole from './components/ControlConsole';
import { TEMPart } from './data/temParts';
import { samples, Sample } from './data/samples';
import { MousePointerClick, Move3d, ZoomIn } from 'lucide-react';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-emerald-400 text-xl font-bold tracking-widest animate-pulse whitespace-nowrap bg-slate-900/80 px-6 py-3 rounded-full backdrop-blur-md border border-emerald-500/30">
        LOADING {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function ModelRotator({ setTemRotation }: { setTemRotation: React.Dispatch<React.SetStateAction<number>> }) {
  const { gl } = useThree();
  
  useEffect(() => {
    let isDragging = false;
    let previousX = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button === 0) {
        isDragging = true;
        previousX = e.clientX;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousX;
        setTemRotation(prev => prev + deltaX * 0.01);
        previousX = e.clientX;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = gl.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [gl, setTemRotation]);

  return null;
}

export default function App() {
  const [selectedPart, setSelectedPart] = useState<TEMPart | null>(null);
  const [hoveredPart, setHoveredPart] = useState<TEMPart | null>(null);
  const [temRotation, setTemRotation] = useState(0);
  
  // Control Console State
  const [isBeamOn, setIsBeamOn] = useState(false);
  const [voltage, setVoltage] = useState(200);
  const [selectedSample, setSelectedSample] = useState<Sample>(samples[0]);

  return (
    <div className="w-screen h-screen bg-slate-900 overflow-hidden font-sans text-slate-50 flex">
      {/* 3D Canvas Area */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [12, 0, 15], fov: 45 }}>
          {/* Brighter background color */}
          <color attach="background" args={['#0f172a']} />
          
          {/* Adjusted lighting for offline mode (no HDRI Environment) */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2.0} />
          <directionalLight position={[-10, 10, -5]} intensity={1.5} color="#3b82f6" />
          <pointLight position={[0, -10, 0]} intensity={1.0} />
          
          <Suspense fallback={<Loader />}>
            <ModelRotator setTemRotation={setTemRotation} />
            <TEMModel 
              onHover={setHoveredPart} 
              onClick={setSelectedPart} 
              selectedPartId={selectedPart?.id || null}
              isBeamOn={isBeamOn}
              rotation={temRotation}
            />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <ContactShadows position={[0, -9, 0]} opacity={0.5} scale={20} blur={2} far={15} color="#000000" />
          </Suspense>

          <CameraControls 
            makeDefault
            dollyToCursor={true}
            minDistance={5}
            maxDistance={30}
            azimuthRotateSpeed={0}
          />
        </Canvas>

        {/* UI Overlay: Header */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-sm">
            TEM 3D
          </h1>
          <p className="text-slate-400 font-medium tracking-wide text-sm mt-1 uppercase">
            透射电子显微镜教学系统
          </p>
        </div>

        {/* Control Console */}
        <ControlConsole 
          isBeamOn={isBeamOn}
          onToggleBeam={() => setIsBeamOn(!isBeamOn)}
          voltage={voltage}
          onVoltageChange={setVoltage}
          samples={samples}
          selectedSample={selectedSample}
          onSampleChange={setSelectedSample}
        />

        {/* UI Overlay: Instructions */}
        <div className="absolute bottom-6 left-6 z-10 pointer-events-none flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-600/50 shadow-lg">
            <Move3d className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-slate-200">左键拖拽旋转</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-600/50 shadow-lg">
            <ZoomIn className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-slate-200">滚轮缩放视角</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-600/50 shadow-lg">
            <MousePointerClick className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium text-slate-200">点击部件查看详情</span>
          </div>
        </div>

        {/* Author Info */}
        <div className="absolute bottom-6 right-6 z-10 pointer-events-none text-right">
          <p className="text-xs text-slate-500 font-mono">作者: OwenLiu04</p>
          <p className="text-xs text-slate-500 font-mono">邮箱: lf19902001@qq.com</p>
        </div>

      </div>

      {/* Info Panel (Slides in from right) */}
      <InfoPanel 
        part={selectedPart} 
        onClose={() => setSelectedPart(null)} 
      />
    </div>
  );
}
