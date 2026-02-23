import React from 'react';
import { Plus, Smartphone, Sparkles } from 'lucide-react';

interface NutrioCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NutrioCreatorModal = ({ isOpen, onClose }: NutrioCreatorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-nutrio-purple/5">
          <h3 className="text-lg font-bold text-nutrio-purple flex items-center gap-2">
            <Smartphone className="w-5 h-5" /> Nutrio Creator
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Plus className="w-5 h-5 rotate-45 text-slate-400" />
          </button>
        </div>
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-nutrio-purple/10 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-nutrio-purple" />
          </div>
          <h4 className="text-xl font-bold text-slate-800 mb-2">Crie receitas inteligentes com IA</h4>
          <p className="text-slate-500 text-sm max-w-md mb-8">
            Descreva o que você quer criar (ex: "Lanche proteico sem glúten") e nossa IA gerará a receita completa com macros calculados.
          </p>
          <div className="w-full max-w-md relative mb-6">
            <textarea 
              placeholder="Descreva a receita ou objetivo..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-nutrio-purple/20 focus:border-nutrio-purple min-h-[120px]"
            />
            <button className="absolute bottom-4 right-4 p-2 bg-nutrio-purple text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-nutrio-purple text-white font-bold rounded-lg text-sm">Gerar Receita</button>
            <button onClick={onClose} className="px-6 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg text-sm">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
