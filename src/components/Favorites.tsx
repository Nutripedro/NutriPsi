import React from 'react';
import { Star, Plus, Trash2, Search } from 'lucide-react';

export const Favorites = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const favoriteFoods = [
    { id: '1', name: 'Frango Grelhado (100g)', protein: 31, carbs: 0, fat: 3.6, calories: 165, category: 'Proteínas' },
    { id: '2', name: 'Arroz Integral (100g)', protein: 2.6, carbs: 23, fat: 0.9, calories: 111, category: 'Carboidratos' },
    { id: '3', name: 'Ovo Cozido (1 un)', protein: 6, carbs: 0.5, fat: 5, calories: 70, category: 'Proteínas' },
    { id: '4', name: 'Banana Prata (1 un)', protein: 1.3, carbs: 23, fat: 0.3, calories: 89, category: 'Frutas' },
    { id: '5', name: 'Whey Protein (30g)', protein: 24, carbs: 3, fat: 2, calories: 120, category: 'Suplementos' },
    { id: '6', name: 'Azeite de Oliva (13ml)', protein: 0, carbs: 0, fat: 12, calories: 108, category: 'Gorduras' },
    { id: '7', name: 'Batata Doce Cozida (100g)', protein: 0.6, carbs: 18, fat: 0.1, calories: 77, category: 'Carboidratos' },
  ];

  const filteredFoods = favoriteFoods.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Meus Favoritos</h1>
          <p className="text-slate-500 text-sm">Gerencie seus alimentos e receitas favoritos para prescrição rápida.</p>
        </div>
        <button className="px-4 py-2 bg-nutrio-green text-white rounded-lg font-bold text-sm shadow-sm hover:bg-nutrio-green-dark transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Novo Alimento
        </button>
      </div>

      <div className="card mb-8">
        <div className="p-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar nos favoritos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nutrio-green/20"
            />
          </div>
          <select className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600 focus:outline-none">
            <option>Todas as categorias</option>
            <option>Proteínas</option>
            <option>Carboidratos</option>
            <option>Gorduras</option>
            <option>Frutas</option>
            <option>Suplementos</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <div key={food.id} className="card p-6 hover:border-nutrio-green/30 transition-all group relative">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-500">
                <Star className="w-5 h-5 fill-yellow-500" />
              </div>
              <button className="p-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{food.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{food.category}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proteína</p>
                <p className="text-sm font-bold text-slate-700">{food.protein}g</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Carbos</p>
                <p className="text-sm font-bold text-slate-700">{food.carbs}g</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gordura</p>
                <p className="text-sm font-bold text-slate-700">{food.fat}g</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calorias</p>
                <p className="text-sm font-bold text-slate-700">{food.calories} Kcal</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
