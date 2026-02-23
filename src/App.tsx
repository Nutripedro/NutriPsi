/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

// Components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PatientSidebar } from './components/PatientSidebar';
import { Dashboard } from './components/Dashboard';
import { MealPlan } from './components/MealPlan';
import { Diaries } from './components/Diaries';
import { Financial } from './components/Financial';
import { Settings } from './components/Settings';
import { Favorites } from './components/Favorites';
import { VideoCall } from './components/VideoCall';
import { Analytics } from './components/Analytics';
import { BottomBar } from './components/BottomBar';

// Modals
import { TransactionModal } from './components/Modals/TransactionModal';
import { ProfileModal } from './components/Modals/ProfileModal';
import { FavoritesModal } from './components/Modals/FavoritesModal';
import { PdfSettingsModal } from './components/Modals/PdfSettingsModal';
import { MicronutrientsModal } from './components/Modals/MicronutrientsModal';
import { NutrioCreatorModal } from './components/Modals/NutrioCreatorModal';
import { NewAppointmentModal } from './components/Modals/NewAppointmentModal';
import { AlertsModal } from './components/Modals/AlertsModal';
import { WeeklyReportModal } from './components/Modals/WeeklyReportModal';

// Constants & Types
import { INITIAL_MEALS } from './constants';
import { Meal, Transaction, Diary } from './types';

export default function App() {
  // --- State ---
  const [activeMainTab, setActiveMainTab] = useState('dashboard');
  const [activePatientTab, setActivePatientTab] = useState('plano');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Patient & Plan State
  const [patientName, setPatientName] = useState("Ana Carolina");
  const [planTitle, setPlanTitle] = useState("Plano alimentar");
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [isPlanActive, setIsPlanActive] = useState(false);
  const [meals, setMeals] = useState<Meal[]>(INITIAL_MEALS);
  const [targetCalories, setTargetCalories] = useState(2088);
  
  // User State
  const [userName, setUserName] = useState("Gabriel Dias");
  const [userEmail, setUserEmail] = useState("gabriel.dias@nutrio.com");
  const [userCrm, setUserCrm] = useState("CRM/SP 123456");
  const [userAvatar, setUserAvatar] = useState("https://picsum.photos/seed/user/200/200");
  
  // Clinic State
  const [clinicName, setClinicName] = useState("Nutrio Clinic");
  const [clinicPhone, setClinicPhone] = useState("(11) 99999-9999");
  const [clinicAddress, setClinicAddress] = useState("Av. Paulista, 1000 - São Paulo, SP");
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImportingPdf, setIsImportingPdf] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isSavingPlan, setIsSavingPlan] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [activeSettingsTab, setActiveSettingsTab] = useState('clinica');

  // Modal State
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isPdfSettingsOpen, setIsPdfSettingsOpen] = useState(false);
  const [isMicrosOpen, setIsMicrosOpen] = useState(false);
  const [isNutrioCreatorOpen, setIsNutrioCreatorOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isWeeklyReportModalOpen, setIsWeeklyReportModalOpen] = useState(false);

  // Data State
  const [diaries] = useState<Diary[]>([
    { id: '1', patient: 'Maria Silva', date: '2024-03-20', status: 'completed', adherence: 95 },
    { id: '2', patient: 'João Pereira', date: '2024-03-20', status: 'pending', adherence: 0 },
    { id: '3', patient: 'Ana Costa', date: '2024-03-19', status: 'completed', adherence: 88 },
    { id: '4', patient: 'Carlos Souza', date: '2024-03-19', status: 'completed', adherence: 72 },
  ]);
  const [transactions] = useState<Transaction[]>([
    { id: '1', date: '2024-03-20', description: 'Consulta - Maria Silva', category: 'Consulta', amount: 250.00, type: 'income' },
    { id: '2', date: '2024-03-19', description: 'Aluguel Sala', category: 'Infraestrutura', amount: -1500.00, type: 'expense' },
    { id: '3', date: '2024-03-18', description: 'Consulta - João Pereira', category: 'Consulta', amount: 250.00, type: 'income' },
    { id: '4', date: '2024-03-17', description: 'Software Nutrio', category: 'Assinatura', amount: -89.90, type: 'expense' },
  ]);

  // --- Calculations ---
  const calculateTotals = () => {
    return meals.reduce((acc, meal) => {
      const mealTotals = meal.foods.length > 0 
        ? meal.foods.reduce((fAcc, food) => ({
            protein: fAcc.protein + food.protein,
            carbs: fAcc.carbs + food.carbs,
            fat: fAcc.fat + food.fat,
            calories: fAcc.calories + food.calories,
          }), { protein: 0, carbs: 0, fat: 0, calories: 0 })
        : { protein: meal.protein, carbs: meal.carbs, fat: meal.fat, calories: meal.calories };
      
      return {
        protein: acc.protein + mealTotals.protein,
        carbs: acc.carbs + mealTotals.carbs,
        fat: acc.fat + mealTotals.fat,
        calories: acc.calories + mealTotals.calories,
      };
    }, { protein: 0, carbs: 0, fat: 0, calories: 0 });
  };

  const totals = calculateTotals();

  const macroChartData = [
    { name: 'Lipídios', value: totals.fat, color: '#FBBF24' },
    { name: 'Carboidratos', value: totals.carbs, color: '#F97316' },
    { name: 'Proteínas', value: totals.protein, color: '#22C55E' },
  ];

  // --- Handlers ---
  const generateWithAI = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Gere um plano alimentar completo e equilibrado para um dia para um paciente chamado ${patientName}. 
        O plano deve conter pelo menos 5 refeições (Café da Manhã, Lanche da Manhã, Almoço, Lanche da Tarde, Jantar).
        Cada refeição deve ter alimentos realistas com valores nutricionais aproximados.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                name: { type: Type.STRING },
                foods: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      protein: { type: Type.NUMBER },
                      carbs: { type: Type.NUMBER },
                      fat: { type: Type.NUMBER },
                      calories: { type: Type.NUMBER },
                    },
                    required: ["name", "protein", "carbs", "fat", "calories"]
                  }
                }
              },
              required: ["time", "name", "foods"]
            }
          }
        }
      });
      
      const generatedMeals = JSON.parse(response.text || "[]");
      
      const formattedMeals = generatedMeals.map((m: any) => ({
        ...m,
        id: Math.random().toString(36).substr(2, 9),
        image: `https://picsum.photos/seed/${Math.random()}/100/100`,
        protein: m.foods.reduce((s: number, f: any) => s + f.protein, 0),
        carbs: m.foods.reduce((s: number, f: any) => s + f.carbs, 0),
        fat: m.foods.reduce((s: number, f: any) => s + f.fat, 0),
        calories: m.foods.reduce((s: number, f: any) => s + f.calories, 0),
        isExpanded: false
      }));
      
      setMeals(formattedMeals);
    } catch (error) {
      console.error("Erro ao gerar plano:", error);
      alert("Erro ao conectar com a IA. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImportPdf = () => {
    setIsImportingPdf(true);
    setTimeout(() => {
      setIsImportingPdf(false);
      alert("PDF importado e processado com sucesso! (Simulação)");
    }, 2000);
  };

  const handleSaveSettings = () => {
    setIsSavingSettings(true);
    setTimeout(() => {
      setIsSavingSettings(false);
      alert("Configurações salvas com sucesso!");
    }, 1500);
  };

  const handleSavePlan = () => {
    setIsSavingPlan(true);
    setTimeout(() => {
      setIsSavingPlan(false);
      alert("Plano alimentar salvo com sucesso!");
    }, 1500);
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

  return (
    <div className="flex min-h-screen bg-nutrio-bg">
      <Sidebar 
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
      />

      {activeMainTab === 'pacientes' && (
        <PatientSidebar 
          patientName={patientName}
          activePatientTab={activePatientTab}
          setActivePatientTab={setActivePatientTab}
        />
      )}
      
      <main className="flex-1 flex flex-col">
        <Header 
          onSearch={setSearchQuery} 
          patientName={patientName} 
          userName={userName} 
          userAvatar={userAvatar}
          onProfileClick={() => setIsProfileModalOpen(true)}
        />
        
        <div className="p-8 pb-32">
          {activeMainTab === 'dashboard' && (
            <Dashboard 
              userName={userName}
              setIsNewAppointmentOpen={setIsNewAppointmentOpen}
              setActiveMainTab={setActiveMainTab}
            />
          )}

          {activeMainTab === 'pacientes' && (
            <MealPlan 
              planTitle={planTitle}
              setPlanTitle={setPlanTitle}
              isIndeterminate={isIndeterminate}
              setIsIndeterminate={setIsIndeterminate}
              isPlanActive={isPlanActive}
              setIsPlanActive={setIsPlanActive}
              meals={meals}
              setMeals={setMeals}
              searchQuery={searchQuery}
              isGenerating={isGenerating}
              generateWithAI={generateWithAI}
              handleImportPdf={handleImportPdf}
              isImportingPdf={isImportingPdf}
              handleSavePlan={handleSavePlan}
              isSavingPlan={isSavingPlan}
              setIsFavoritesOpen={setIsFavoritesOpen}
              setIsNutrioCreatorOpen={setIsNutrioCreatorOpen}
              setIsMicrosOpen={setIsMicrosOpen}
              setIsPdfSettingsOpen={setIsPdfSettingsOpen}
              targetCalories={targetCalories}
              setTargetCalories={setTargetCalories}
              totals={totals}
              macroChartData={macroChartData}
              setActiveMainTab={setActiveMainTab}
              setActivePatientTab={setActivePatientTab}
            />
          )}

          {activeMainTab === 'diarios' && (
            <Diaries 
              diaries={diaries} 
              onConfigureAlerts={() => setIsAlertsModalOpen(true)}
              onWeeklyReport={() => setIsWeeklyReportModalOpen(true)}
            />
          )}

          {activeMainTab === 'analises' && (
            <Analytics />
          )}

          {activeMainTab === 'financeiro' && (
            <Financial 
              transactions={transactions}
              setIsTransactionModalOpen={setIsTransactionModalOpen}
            />
          )}

          {activeMainTab === 'configuracoes' && (
            <Settings 
              activeSettingsTab={activeSettingsTab}
              setActiveSettingsTab={setActiveSettingsTab}
              clinicName={clinicName}
              setClinicName={setClinicName}
              clinicPhone={clinicPhone}
              setClinicPhone={setClinicPhone}
              clinicAddress={clinicAddress}
              setClinicAddress={setClinicAddress}
              handleSaveSettings={handleSaveSettings}
              isSavingSettings={isSavingSettings}
            />
          )}

          {activeMainTab === 'favoritos' && (
            <Favorites />
          )}

          {activeMainTab === 'videochamada' && (
            <VideoCall />
          )}

          {!['dashboard', 'pacientes', 'diarios', 'analises', 'financeiro', 'configuracoes', 'favoritos', 'videochamada'].includes(activeMainTab) && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <p className="text-lg font-medium">Esta aba está em desenvolvimento.</p>
              <button 
                onClick={() => setActiveMainTab('dashboard')}
                className="mt-4 text-nutrio-green font-bold hover:underline"
              >
                Voltar para o Dashboard
              </button>
            </div>
          )}
        </div>

        <BottomBar 
          isVisible={isBottomBarVisible}
          setIsVisible={setIsBottomBarVisible}
          totals={totals}
          addMeal={addMeal}
        />

        {/* Modals */}
        <TransactionModal 
          isOpen={isTransactionModalOpen}
          onClose={() => setIsTransactionModalOpen(false)}
        />
        <ProfileModal 
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userName={userName}
          setUserName={setUserName}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userCrm={userCrm}
          setUserCrm={setUserCrm}
          userAvatar={userAvatar}
          setUserAvatar={setUserAvatar}
        />
        <FavoritesModal 
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          meals={meals}
          setMeals={setMeals}
        />
        <PdfSettingsModal 
          isOpen={isPdfSettingsOpen}
          onClose={() => setIsPdfSettingsOpen(false)}
        />
        <MicronutrientsModal 
          isOpen={isMicrosOpen}
          onClose={() => setIsMicrosOpen(false)}
        />
        <NutrioCreatorModal 
          isOpen={isNutrioCreatorOpen}
          onClose={() => setIsNutrioCreatorOpen(false)}
        />
        <NewAppointmentModal 
          isOpen={isNewAppointmentOpen}
          onClose={() => setIsNewAppointmentOpen(false)}
          patientName={patientName}
        />
        <AlertsModal 
          isOpen={isAlertsModalOpen}
          onClose={() => setIsAlertsModalOpen(false)}
        />
        <WeeklyReportModal 
          isOpen={isWeeklyReportModalOpen}
          onClose={() => setIsWeeklyReportModalOpen(false)}
        />
      </main>
    </div>
  );
}
