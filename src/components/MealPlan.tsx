import React from 'react';
import { 
  ChevronDown, 
  Sparkles, 
  FileUp, 
  Plus, 
  Calculator, 
  Copy, 
  Trash2, 
  Smartphone, 
  Save,
  Search
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { cn } from '../lib/utils';
import { Meal, Food } from '../types';

interface MealPlanProps {
  planTitle: string;
  setPlanTitle: (val: string) => void;
  isIndeterminate: boolean;
  setIsIndeterminate: (val: boolean) => void;
  isPlanActive: boolean;
  setIsPlanActive: (val: boolean) => void;
  meals: Meal[];
  setMeals: (meals: Meal[]) => void;
  searchQuery: string;
  isGenerating: boolean;
  generateWithAI: () => void;
  handleImportPdf: () => void;
  isImportingPdf: boolean;
  handleSavePlan: () => void;
  isSavingPlan: boolean;
  setIsFavoritesOpen: (val: boolean) => void;
  setIsNutrioCreatorOpen: (val: boolean) => void;
  setIsMicrosOpen: (val: boolean) => void;
  setIsPdfSettingsOpen: (val: boolean) => void;
  targetCalories: number;
  setTargetCalories: (val: number) => void;
  totals: { protein: number; carbs: number; fat: number; calories: number };
  macroChartData: any[];
  setActiveMainTab: (val: string) => void;
  setActivePatientTab: (val: string) => void;
}

export const MealPlan = ({
  planTitle,
  setPlanTitle,
  isIndeterminate,
  setIsIndeterminate,
  isPlanActive,
  setIsPlanActive,
  meals,
  setMeals,
  searchQuery,
  isGenerating,
  generateWithAI,
  handleImportPdf,
  isImportingPdf,
  handleSavePlan,
  isSavingPlan,
  setIsFavoritesOpen,
  setIsNutrioCreatorOpen,
  setIsMicrosOpen,
  setIsPdfSettingsOpen,
  targetCalories,
  setTargetCalories,
  totals,
  macroChartData,
  setActiveMainTab,
  setActivePatientTab
}: MealPlanProps) => {

  const filteredMeals = meals.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.foods.some(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const calculateMealTotals = (meal: Meal) => {
    if (meal.foods.length === 0) return { protein: meal.protein, carbs: meal.carbs, fat: meal.fat, calories: meal.calories };
    return meal.foods.reduce((acc, food) => ({
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat,
      calories: acc.calories + food.calories,
    }), { protein: 0, carbs: 0, fat: 0, calories: 0 });
  };

  const addMeal = () => {
    const newMeal: Meal = {
      id: Math.random().toString(36).substr(2, 9),
      time: '12:00',
      name: 'Nova Refeição',
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      image: `https://picsum.photos/seed/${Math.random()}/100/100`,
      foods: [],
      isExpanded: true
    };
    setMeals([...meals, newMeal]);
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(m => m.id !== id));
  };

  const updateMeal = (id: string, updates: Partial<Meal>) => {
    setMeals(meals.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const addFood = (mealId: string) => {
    const newFood: Food = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Novo Alimento',
      protein: 10,
      carbs: 20,
      fat: 5,
      calories: 165
    };
    setMeals(meals.map(m => m.id === mealId ? { ...m, foods: [...m.foods, newFood] } : m));
  };

  const removeFood = (mealId: string, foodId: string) => {
    setMeals(meals.map(m => m.id === mealId ? { ...m, foods: m.foods.filter(f => f.id !== foodId) } : m));
  };

  const toggleExpand = (id: string) => {
    setMeals(meals.map(m => m.id === id ? { ...m, isExpanded: !m.isExpanded } : m));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <span className="hover:text-nutrio-green cursor-pointer transition-colors" onClick={() => setActiveMainTab('pacientes')}>Prescrições</span>
        <ChevronDown className="w-3 h-3 -rotate-90" />
        <span className="text-slate-600 font-medium hover:text-nutrio-green cursor-pointer transition-colors" onClick={() => setActivePatientTab('plano')}>Editar</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Prescrição por alimentos</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPlanActive(!isPlanActive)}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full transition-colors",
              isPlanActive ? "bg-green-100 text-nutrio-green" : "bg-slate-100 text-slate-500"
            )}
          >
            {isPlanActive ? "Plano ativo" : "Plano inativo"}
          </button>
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            Abrir PDF do plano
          </button>
        </div>
      </div>

      {/* Section: Dados */}
      <section className="mb-8">
        <h3 className="text-nutrio-green font-bold text-sm mb-4">Dados</h3>
        <div className="card grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Título do plano</label>
            <input 
              type="text" 
              value={planTitle} 
              onChange={(e) => setPlanTitle(e.target.value)}
              className="input-field" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Data de término</label>
            <input type="text" value={isIndeterminate ? "Indeterminado" : "22/03/2026"} className={cn("input-field transition-colors", isIndeterminate ? "bg-slate-50 text-slate-400" : "bg-white text-slate-800")} disabled={isIndeterminate} />
          </div>
          <div className="flex items-center gap-3 pb-2">
            <button 
              onClick={() => setIsIndeterminate(!isIndeterminate)}
              className={cn(
                "w-10 h-5 rounded-full transition-colors relative",
                isIndeterminate ? "bg-nutrio-green" : "bg-slate-300"
              )}
            >
              <div className={cn(
                "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                isIndeterminate ? "left-6" : "left-1"
              )} />
            </button>
            <span className="text-xs font-medium text-slate-600">Tempo indeterminado</span>
          </div>
        </div>
      </section>

      {/* Section: Refeições */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-nutrio-green font-bold text-sm">Refeições</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setIsFavoritesOpen(true)}
                className="px-4 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-2 bg-white hover:bg-slate-50"
              >
                Meus favoritos <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <button 
              onClick={generateWithAI}
              disabled={isGenerating}
              className="px-4 py-1.5 border border-nutrio-purple/30 rounded-lg text-xs font-medium text-nutrio-purple flex items-center gap-2 bg-white hover:bg-purple-50 transition-colors disabled:opacity-50"
            >
              <Sparkles className={cn("w-3 h-3", isGenerating && "animate-spin")} /> 
              {isGenerating ? "Gerando..." : "Gerar cardápio com IA"}
            </button>
            <button 
              onClick={handleImportPdf}
              disabled={isImportingPdf}
              className="px-4 py-1.5 border border-nutrio-purple/30 rounded-lg text-xs font-medium text-nutrio-purple flex items-center gap-2 bg-white hover:bg-purple-50 transition-colors disabled:opacity-50"
            >
              <FileUp className={cn("w-3 h-3", isImportingPdf && "animate-pulse")} /> 
              {isImportingPdf ? "Importando..." : "Importar de PDF"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredMeals.length === 0 && searchQuery && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Nenhuma refeição encontrada para "{searchQuery}"</p>
            </div>
          )}
          {filteredMeals.map((meal) => {
            const mealTotals = calculateMealTotals(meal);
            return (
              <div key={meal.id} className="flex flex-col gap-2">
                <div className="card p-4 flex items-center gap-4 hover:border-nutrio-green/30 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
                    <img src={meal.image} alt={meal.name} referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex flex-col gap-0.5 cursor-grab active:cursor-grabbing">
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    </div>
                    <input 
                      type="text" 
                      value={meal.time} 
                      onChange={(e) => updateMeal(meal.id, { time: e.target.value })}
                      className="w-16 px-2 py-1 border border-slate-200 rounded text-xs text-center focus:border-nutrio-green focus:outline-none" 
                    />
                  </div>
                  <input 
                    type="text" 
                    value={meal.name} 
                    onChange={(e) => updateMeal(meal.id, { name: e.target.value })}
                    className="flex-1 px-3 py-1 border border-slate-200 rounded text-sm font-medium focus:border-nutrio-green focus:outline-none" 
                  />
                  
                  <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-orange-400" /> {mealTotals.protein.toFixed(1)}g
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-orange-600" /> {mealTotals.carbs.toFixed(1)}g
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-400" /> {mealTotals.fat.toFixed(1)}g
                    </div>
                    <span className="text-slate-400">{mealTotals.calories.toFixed(0)} Kcal</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleExpand(meal.id)}
                      className={cn(
                        "px-3 py-1.5 text-[11px] font-bold rounded-lg transition-colors",
                        meal.isExpanded ? "bg-nutrio-green text-white" : "bg-slate-800 text-white"
                      )}
                    >
                      Alimentos
                    </button>
                    <button 
                      onClick={() => alert("Calculando recomendações para esta refeição...")}
                      className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
                    >
                      <Calculator className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        const duplicatedMeal = {
                          ...meal,
                          id: Math.random().toString(36).substr(2, 9),
                          name: `${meal.name} (Cópia)`,
                          foods: meal.foods.map(f => ({ ...f, id: Math.random().toString(36).substr(2, 9) }))
                        };
                        setMeals([...meals, duplicatedMeal]);
                      }}
                      className="p-1.5 border border-slate-200 rounded-lg text-nutrio-green hover:bg-green-50 transition-all"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteMeal(meal.id)}
                      className="p-1.5 border border-slate-200 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronDown 
                      className={cn("w-4 h-4 text-slate-300 ml-2 cursor-pointer transition-transform", meal.isExpanded && "rotate-180")} 
                      onClick={() => toggleExpand(meal.id)}
                    />
                  </div>
                </div>
                
                {meal.isExpanded && (
                  <div className="mx-4 p-4 bg-white border-x border-b border-slate-100 rounded-b-xl -mt-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-bold text-slate-700">Alimentos da refeição</h4>
                      <button 
                        onClick={() => addFood(meal.id)}
                        className="text-[10px] text-nutrio-green font-bold flex items-center gap-1 hover:underline"
                      >
                        <Plus className="w-3 h-3" /> Adicionar alimento
                      </button>
                    </div>
                    <div className="space-y-2">
                      {meal.foods.length === 0 && (
                        <p className="text-[10px] text-slate-400 italic text-center py-2">Nenhum alimento adicionado.</p>
                      )}
                      {meal.foods.map((food) => (
                        <div key={food.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs group/food">
                          <input 
                            type="text" 
                            value={food.name} 
                            onChange={(e) => {
                              const newFoods = meal.foods.map(f => f.id === food.id ? { ...f, name: e.target.value } : f);
                              updateMeal(meal.id, { foods: newFoods });
                            }}
                            className="bg-transparent border-none focus:ring-0 p-0 text-slate-600 flex-1"
                          />
                          <div className="flex items-center gap-4 text-slate-400">
                            <div className="flex items-center gap-1">
                              <input 
                                type="number" 
                                value={food.protein} 
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  const newFoods = meal.foods.map(f => f.id === food.id ? { ...f, protein: val } : f);
                                  updateMeal(meal.id, { foods: newFoods });
                                }}
                                className="w-10 bg-transparent border-none p-0 text-right focus:ring-0"
                              />g P
                            </div>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number" 
                                value={food.carbs} 
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  const newFoods = meal.foods.map(f => f.id === food.id ? { ...f, carbs: val } : f);
                                  updateMeal(meal.id, { foods: newFoods });
                                }}
                                className="w-10 bg-transparent border-none p-0 text-right focus:ring-0"
                              />g C
                            </div>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number" 
                                value={food.fat} 
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  const newFoods = meal.foods.map(f => f.id === food.id ? { ...f, fat: val } : f);
                                  updateMeal(meal.id, { foods: newFoods });
                                }}
                                className="w-10 bg-transparent border-none p-0 text-right focus:ring-0"
                              />g L
                            </div>
                            <span className="font-bold text-slate-500 w-16 text-right">{(food.protein * 4 + food.carbs * 4 + food.fat * 9).toFixed(0)} Kcal</span>
                            <Trash2 
                              className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" 
                              onClick={() => removeFood(meal.id, food.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center gap-3">
            <button 
              onClick={addMeal}
              className="px-6 py-2.5 bg-nutrio-green text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-sm hover:bg-nutrio-green-dark transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" /> Adicionar refeição ou orientação
            </button>
            <button 
              onClick={() => setIsNutrioCreatorOpen(true)}
              className="px-6 py-2.5 bg-nutrio-purple text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-sm hover:opacity-90 transition-all active:scale-95"
            >
              <Smartphone className="w-4 h-4" /> Nutrio Creator
            </button>
            <button 
              onClick={handleSavePlan}
              disabled={isSavingPlan}
              className="px-6 py-2.5 bg-nutrio-green text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-sm hover:bg-nutrio-green-dark transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSavingPlan ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Salvar
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Section: Análise */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-nutrio-green font-bold text-sm">Análise de macronutrientes</h3>
          <button 
            onClick={() => setIsMicrosOpen(true)}
            className="px-4 py-1.5 bg-nutrio-green text-white text-xs font-bold rounded-lg hover:bg-nutrio-green-dark transition-colors"
          >
            Total micronutrientes
          </button>
        </div>

        <div className="card grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex items-center gap-8">
            <div className="w-48 h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {macroChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">{totals.calories.toFixed(0)}</span>
                <span className="text-xs text-slate-400">Kcal</span>
              </div>
            </div>
            <div className="space-y-2">
              {macroChartData.map((item) => {
                const totalValue = macroChartData.reduce((s, i) => s + i.value, 0);
                const percentage = totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0;
                return (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium text-slate-600">{item.name}</span>
                    <span className="text-xs font-bold text-slate-400">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">Calorias totais</p>
                  <p className="text-xl font-bold text-slate-800">{totals.calories.toFixed(0)} <span className="text-sm font-normal text-slate-400">/ {targetCalories} kcal</span></p>
                </div>
                <span className={cn("font-bold text-sm", totals.calories > targetCalories ? "text-red-500" : "text-nutrio-green")}>
                  {Math.round((totals.calories / targetCalories) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full rounded-full transition-all duration-500", totals.calories > targetCalories ? "bg-red-500" : "bg-nutrio-green")} 
                  style={{ width: `${Math.min((totals.calories / targetCalories) * 100, 100)}%` }} 
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="pb-2 font-medium">Macro</th>
                    <th className="pb-2 font-medium">Prescrito</th>
                    <th className="pb-2 font-medium">Pretendido</th>
                    <th className="pb-2 font-medium">Diferença</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-50">
                    <td className="py-3 font-medium">Carboidratos</td>
                    <td className="py-3">{totals.carbs.toFixed(1)}g <span className="text-[10px] text-slate-400">({(totals.carbs / 79).toFixed(1)}g/kg)</span></td>
                    <td className="py-3">261.1g <span className="text-[10px] text-slate-400">(3.3g/kg)</span></td>
                    <td className="py-3">
                      <span className={cn("px-2 py-0.5 rounded flex items-center gap-1 w-fit", totals.carbs < 261.1 ? "bg-red-50 text-red-500" : "bg-green-50 text-nutrio-green")}>
                        {totals.carbs < 261.1 ? <ChevronDown className="w-3 h-3" /> : <Plus className="w-3 h-3 rotate-45" />} 
                        {Math.abs(totals.carbs - 261.1).toFixed(1)}g
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-3 font-medium">Proteínas</td>
                    <td className="py-3">{totals.protein.toFixed(1)}g <span className="text-[10px] text-slate-400">({(totals.protein / 79).toFixed(1)}g/kg)</span></td>
                    <td className="py-3">156.6g <span className="text-[10px] text-slate-400">(2.0g/kg)</span></td>
                    <td className="py-3">
                      <span className={cn("px-2 py-0.5 rounded flex items-center gap-1 w-fit", totals.protein < 156.6 ? "bg-red-50 text-red-500" : "bg-green-50 text-nutrio-green")}>
                        {totals.protein < 156.6 ? <ChevronDown className="w-3 h-3" /> : <Plus className="w-3 h-3 rotate-45" />} 
                        {Math.abs(totals.protein - 156.6).toFixed(1)}g
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Lipídios</td>
                    <td className="py-3">{totals.fat.toFixed(1)}g <span className="text-[10px] text-slate-400">({(totals.fat / 79).toFixed(1)}g/kg)</span></td>
                    <td className="py-3">46.4g <span className="text-[10px] text-slate-400">(0.6g/kg)</span></td>
                    <td className="py-3">
                      <span className={cn("px-2 py-0.5 rounded flex items-center gap-1 w-fit", totals.fat < 46.4 ? "bg-red-50 text-red-500" : "bg-green-50 text-nutrio-green")}>
                        {totals.fat < 46.4 ? <ChevronDown className="w-3 h-3" /> : <Plus className="w-3 h-3 rotate-45" />} 
                        {Math.abs(totals.fat - 46.4).toFixed(1)}g
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button 
              onClick={() => setTargetCalories(totals.calories > 0 ? totals.calories : 2088)}
              className="mt-6 px-4 py-2 bg-nutrio-green text-white text-xs font-bold rounded-lg w-fit hover:bg-nutrio-green-dark transition-colors"
            >
              Incluir cálculo energético
            </button>
          </div>
        </div>
      </section>

      {/* Section: Configurações Finais */}
      <section>
        <h3 className="text-nutrio-green font-bold text-sm mb-4">Configurações finais</h3>
        <div 
          onClick={() => setIsPdfSettingsOpen(true)}
          className="card cursor-pointer hover:bg-slate-50 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 group-hover:text-nutrio-green transition-colors">Configurações do PDF</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </section>
    </div>
  );
};
