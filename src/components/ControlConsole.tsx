import { Play, Square, Monitor, Zap, SlidersHorizontal } from 'lucide-react';
import { Sample } from '../data/samples';

interface ControlConsoleProps {
  isBeamOn: boolean;
  onToggleBeam: () => void;
  voltage: number;
  onVoltageChange: (v: number) => void;
  samples: Sample[];
  selectedSample: Sample;
  onSampleChange: (sample: Sample) => void;
}

export default function ControlConsole({
  isBeamOn,
  onToggleBeam,
  voltage,
  onVoltageChange,
  samples,
  selectedSample,
  onSampleChange
}: ControlConsoleProps) {
  // Calculate blur based on voltage (80kV to 300kV)
  // Lower voltage = more blur (worse resolution)
  // At 80kV, blur is (300-80)/20 = 11px. At 300kV, blur is 0px.
  // This steeper curve makes the resolution difference more obvious.
  const blurAmount = Math.max(0, (300 - voltage) / 20);

  return (
    <div className="absolute left-6 top-28 w-80 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-20 flex flex-col scale-[0.8] origin-top-left">
      {/* Console Header */}
      <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-slate-400" />
        <h2 className="text-sm font-bold text-slate-200 tracking-wider">TEM 操作控制台</h2>
      </div>

      {/* Screen Area */}
      <div className="p-4 bg-slate-950">
        <div className="relative w-full aspect-square bg-black rounded-lg border-2 border-slate-800 overflow-hidden shadow-inner">
          {isBeamOn ? (
            <>
              <img 
                src={selectedSample.imageUrl} 
                alt="TEM View" 
                className="w-full h-full object-cover opacity-90 mix-blend-screen transition-all duration-300"
                style={{ 
                  filter: `blur(${blurAmount}px)` 
                }}
              />
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-50"></div>
              {/* Screen overlay info */}
              <div className="absolute bottom-2 left-2 text-[10px] text-green-400 font-mono">
                HV: {voltage}kV<br/>
                MAG: 500kx<br/>
                {selectedSample.id.toUpperCase()}
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-[10px] text-red-500 font-mono">BEAM ON</span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
              <Monitor className="w-12 h-12 mb-2 opacity-20" />
              <span className="text-xs font-mono tracking-widest">NO SIGNAL</span>
              <span className="text-[10px] font-mono mt-1 opacity-50">PRESS START TO EMIT BEAM</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls Area */}
      <div className="p-5 space-y-6">
        {/* Sample Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">载入样品 (Sample)</label>
          <select 
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
            value={selectedSample.id}
            onChange={(e) => {
              const sample = samples.find(s => s.id === e.target.value);
              if (sample) onSampleChange(sample);
            }}
          >
            {samples.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Voltage Control */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">加速电压 (Voltage)</label>
            <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">{voltage} kV</span>
          </div>
          <input 
            type="range" 
            min="80" 
            max="300" 
            step="10"
            value={voltage}
            onChange={(e) => onVoltageChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>80kV</span>
            <span>300kV</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-700/50">
          <button
            onClick={onToggleBeam}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
              isBeamOn 
                ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
            }`}
          >
            {isBeamOn ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                停止扫描 (BEAM OFF)
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                开始扫描 (BEAM ON)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
