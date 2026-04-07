import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Zap, Settings, Eye, Crosshair, Layers } from 'lucide-react';
import { TEMPart } from '../data/temParts';
import { getDiagramForPart } from './Diagrams';

interface InfoPanelProps {
  part: TEMPart | null;
  onClose: () => void;
}

const getIconForPart = (id: string) => {
  switch (id) {
    case 'electron-gun': return <Zap className="w-6 h-6 text-blue-400" />;
    case 'condenser-lens': return <Crosshair className="w-6 h-6 text-emerald-400" />;
    case 'sample-chamber': return <Layers className="w-6 h-6 text-amber-400" />;
    case 'objective-lens': return <Eye className="w-6 h-6 text-violet-400" />;
    case 'projector-lens': return <Settings className="w-6 h-6 text-pink-400" />;
    case 'detector': return <Info className="w-6 h-6 text-slate-400" />;
    default: return <Info className="w-6 h-6 text-white" />;
  }
};

export default function InfoPanel({ part, onClose }: InfoPanelProps) {
  return (
    <AnimatePresence>
      {part && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute top-0 right-0 h-full w-full sm:w-96 bg-black/60 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col shadow-2xl z-20 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-8 mt-2">
            <div 
              className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner"
              style={{ boxShadow: `inset 0 0 20px ${part.color}40` }}
            >
              {getIconForPart(part.id)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{part.name}</h2>
              <p className="text-sm text-gray-400 font-mono mt-1">{part.englishName}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
              <div className="px-4 py-2 bg-black/40 border-b border-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-3 h-3" />
                原理示意图 (Schematic)
              </div>
              <div className="w-full h-48 bg-[#0f172a] flex items-center justify-center p-2">
                {getDiagramForPart(part.id)}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                核心功能
              </h3>
              <p className="text-gray-200 leading-relaxed text-sm">
                {part.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                工作原理
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {part.principle}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: part.color }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
