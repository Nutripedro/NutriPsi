import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MicronutrientsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MicronutrientsModal = ({ isOpen, onClose }: MicronutrientsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Total de Micronutrientes</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Plus className="w-5 h-5 rotate-45 text-slate-400" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          {[
            { name: 'Cálcio', value: '850mg', target: '1000mg', color: 'bg-blue-500' },
            { name: 'Ferro', value: '14mg', target: '18mg', color: 'bg-red-500' },
            { name: 'Vitamina C', value: '65mg', target: '75mg', color: 'bg-orange-500' },
            { name: 'Vitamina D', value: '5mcg', target: '15mcg', color: 'bg-yellow-500' },
            { name: 'Magnésio', value: '310mg', target: '320mg', color: 'bg-purple-500' },
            { name: 'Zinco', value: '7mg', target: '8mg', color: 'bg-green-500' },
          ].map((micro, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-600">{micro.name}</span>
                <span className="text-[10px] text-slate-400">{micro.value} / {micro.target}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full", micro.color)} style={{ width: `${(parseInt(micro.value) / parseInt(micro.target)) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-slate-50 text-center">
          <p className="text-xs text-slate-400">Valores baseados nas DRIs para o perfil do paciente.</p>
        </div>
      </div>
    </div>
  );
};
