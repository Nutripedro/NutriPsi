import React from 'react';
import { Plus, Calculator } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomBarProps {
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  totals: { protein: number; carbs: number; fat: number; calories: number };
  addMeal: () => void;
}

export const BottomBar = ({
  isVisible,
  setIsVisible,
  totals,
  addMeal
}: BottomBarProps) => {
  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 w-10 h-10 bg-white border border-slate-200 shadow-lg rounded-full flex items-center justify-center text-nutrio-green hover:scale-110 transition-all z-20 animate-in fade-in slide-in-from-right-4"
        title="Mostrar resumo"
      >
        <Calculator className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-xl rounded-2xl px-8 py-4 flex items-center gap-8 z-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Proteínas</span>
        <span className="text-sm font-bold text-slate-700">{totals.protein.toFixed(1)}g <span className="text-[10px] font-normal text-slate-400">({(totals.protein / 79).toFixed(1)}g/kg)</span></span>
      </div>
      <div className="w-px h-8 bg-slate-100" />
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Carboidratos</span>
        <span className="text-sm font-bold text-slate-700">{totals.carbs.toFixed(1)}g <span className="text-[10px] font-normal text-slate-400">({(totals.carbs / 79).toFixed(1)}g/kg)</span></span>
      </div>
      <div className="w-px h-8 bg-slate-100" />
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lipídios</span>
        <span className="text-sm font-bold text-slate-700">{totals.fat.toFixed(1)}g <span className="text-[10px] font-normal text-slate-400">({(totals.fat / 79).toFixed(1)}g/kg)</span></span>
      </div>
      <div className="w-px h-8 bg-slate-100" />
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-700">{totals.calories.toFixed(0)} Kcal <span className="text-[10px] font-normal text-slate-400">({(totals.calories / 79).toFixed(1)}Kcal/kg)</span></span>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button 
          onClick={addMeal}
          className="text-slate-300 hover:text-nutrio-green transition-colors"
          title="Adicionar nova refeição"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-slate-300 hover:text-red-500 transition-colors"
          title="Ocultar barra"
        >
          <Plus className="w-4 h-4 rotate-45" />
        </button>
      </div>
    </div>
  );
};
