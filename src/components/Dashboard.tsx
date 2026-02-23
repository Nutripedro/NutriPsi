import React from 'react';
import { Users, Calendar, ClipboardList, MessageSquare, Plus, Star, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface DashboardProps {
  userName: string;
  setIsNewAppointmentOpen: (val: boolean) => void;
  setActiveMainTab: (val: string) => void;
}

export const Dashboard = ({
  userName,
  setIsNewAppointmentOpen,
  setActiveMainTab
}: DashboardProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bem-vindo de volta, {userName}</h1>
          <p className="text-slate-500 text-sm">Aqui está o que está acontecendo com seus pacientes hoje.</p>
        </div>
        <button 
          onClick={() => setIsNewAppointmentOpen(true)}
          className="px-4 py-2 bg-nutrio-green text-white rounded-lg font-bold text-sm shadow-sm hover:bg-nutrio-green-dark transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nova consulta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total de Pacientes', value: '124', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Consultas Hoje', value: '8', icon: Calendar, color: 'text-nutrio-green', bg: 'bg-green-50' },
          { label: 'Planos Pendentes', value: '3', icon: ClipboardList, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Mensagens Novas', value: '12', icon: MessageSquare, color: 'text-nutrio-purple', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="card p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-nutrio-green" /> Próximas Consultas
            </h3>
            <div className="card divide-y divide-slate-50">
              {[
                { name: 'Ana Carolina', time: '14:00', type: 'Retorno', status: 'Confirmado' },
                { name: 'João Silva', time: '15:30', type: 'Primeira Consulta', status: 'Pendente' },
                { name: 'Mariana Costa', time: '17:00', type: 'Acompanhamento', status: 'Confirmado' },
              ].map((apt, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                      {apt.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{apt.name}</p>
                      <p className="text-xs text-slate-400">{apt.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-700">{apt.time}</p>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      apt.status === 'Confirmado' ? "bg-green-100 text-nutrio-green" : "bg-orange-100 text-orange-500"
                    )}>{apt.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" /> Atalhos Rápidos
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsNewAppointmentOpen(true)}
                className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:border-nutrio-green hover:shadow-sm transition-all group"
              >
                <Plus className="w-6 h-6 text-nutrio-green group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-600">Novo Paciente</span>
              </button>
              <button 
                onClick={() => setActiveMainTab('pacientes')}
                className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:border-nutrio-purple hover:shadow-sm transition-all group"
              >
                <Sparkles className="w-6 h-6 text-nutrio-purple group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-600">Criar Plano</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
