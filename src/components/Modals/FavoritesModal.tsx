import React from 'react';
import { Star, Plus } from 'lucide-react';
import { Meal, Food } from '../../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  meals: Meal[];
  setMeals: (meals: Meal[]) => void;
}

export const FavoritesModal = ({ isOpen, onClose, meals, setMeals }: FavoritesModalProps) => {
  if (!isOpen) return null;

  const handleAddFavorite = (food: any) => {
    if (meals.length > 0) {
      const firstMealId = meals[0].id;
      const newFood: Food = { ...food, id: Math.random().toString(36).substr(2, 9) };
      setMeals(meals.map(m => m.id === firstMealId ? { ...m, foods: [...m.foods, newFood], isExpanded: true } : m));
      onClose();
    } else {
      alert("Adicione uma refeição primeiro!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Meus Favoritos
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Plus className="w-5 h-5 rotate-45 text-slate-400" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {[
            { name: 'Frango Grelhado (100g)', protein: 31, carbs: 0, fat: 3.6, calories: 165 },
            { name: 'Arroz Integral (100g)', protein: 2.6, carbs: 23, fat: 0.9, calories: 111 },
            { name: 'Ovo Cozido (1 un)', protein: 6, carbs: 0.5, fat: 5, calories: 70 },
            { name: 'Banana Prata (1 un)', protein: 1.3, carbs: 23, fat: 0.3, calories: 89 },
            { name: 'Whey Protein (30g)', protein: 24, carbs: 3, fat: 2, calories: 120 },
          ].map((food, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
              <div>
                <p className="text-sm font-bold text-slate-700">{food.name}</p>
                <p className="text-[10px] text-slate-400">P: {food.protein}g | C: {food.carbs}g | L: {food.fat}g | {food.calories} Kcal</p>
              </div>
              <button 
                onClick={() => handleAddFavorite(food)}
                className="p-2 bg-white rounded-lg border border-slate-200 text-nutrio-green opacity-0 group-hover:opacity-100 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="p-6 bg-slate-50 text-center">
          <p className="text-xs text-slate-400">Você pode gerenciar seus favoritos na aba "Meus favoritos" no menu lateral.</p>
        </div>
      </div>
    </div>
  );
};
