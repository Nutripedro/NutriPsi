import React from 'react';
import { Plus } from 'lucide-react';

interface PdfSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfSettingsModal = ({ isOpen, onClose }: PdfSettingsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Configurações do PDF</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Plus className="w-5 h-5 rotate-45 text-slate-400" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <span className="text-sm font-medium text-slate-600">Mostrar logomarca</span>
            <button className="w-10 h-5 bg-nutrio-green rounded-full relative"><div className="absolute top-1 left-6 w-3 h-3 bg-white rounded-full" /></button>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <span className="text-sm font-medium text-slate-600">Incluir análise de macros</span>
            <button className="w-10 h-5 bg-nutrio-green rounded-full relative"><div className="absolute top-1 left-6 w-3 h-3 bg-white rounded-full" /></button>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <span className="text-sm font-medium text-slate-600">Incluir orientações gerais</span>
            <button className="w-10 h-5 bg-slate-300 rounded-full relative"><div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full" /></button>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Cor principal do PDF</label>
            <div className="flex gap-2">
              {['#22C55E', '#A855F7', '#3B82F6', '#F59E0B', '#EF4444'].map(color => (
                <div key={color} className="w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-slate-300" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50">
          <button onClick={onClose} className="w-full py-2.5 bg-nutrio-green text-white font-bold rounded-lg">Aplicar configurações</button>
        </div>
      </div>
    </div>
  );
};
