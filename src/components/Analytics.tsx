import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Download, Filter, TrendingUp, Users, Activity, Target } from 'lucide-react';

const adherenceData = [
  { month: 'Jan', adherence: 65, target: 80 },
  { month: 'Fev', adherence: 68, target: 80 },
  { month: 'Mar', adherence: 74, target: 80 },
  { month: 'Abr', adherence: 79, target: 80 },
  { month: 'Mai', adherence: 82, target: 80 },
  { month: 'Jun', adherence: 85, target: 80 },
];

const goalsData = [
  { name: 'Emagrecimento', value: 45 },
  { name: 'Hipertrofia', value: 30 },
  { name: 'Manutenção', value: 15 },
  { name: 'Saúde/Clínico', value: 10 },
];

const weightLossData = [
  { week: 'Semana 1', avgLoss: 0.8 },
  { week: 'Semana 2', avgLoss: 1.2 },
  { week: 'Semana 3', avgLoss: 0.9 },
  { week: 'Semana 4', avgLoss: 1.5 },
  { week: 'Semana 5', avgLoss: 1.1 },
  { week: 'Semana 6', avgLoss: 1.3 },
];

const COLORS = ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444'];

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Relatório detalhado exportado com sucesso! (Simulação)');
    }, 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Análise de Dados</h1>
          <p className="text-slate-500 text-sm">Visualize tendências de saúde e gere relatórios detalhados dos seus pacientes.</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-nutrio-green/20"
          >
            <option value="30d">Últimos 30 dias</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último ano</option>
          </select>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-nutrio-green text-white rounded-lg font-bold text-sm shadow-sm hover:bg-nutrio-green-dark transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 border-l-4 border-nutrio-green">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg text-nutrio-green">
              <Activity className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aderência Média</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">85%</p>
          <p className="text-[10px] text-green-500 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +3% vs mês anterior
          </p>
        </div>
        
        <div className="card p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pacientes Ativos</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">142</p>
          <p className="text-[10px] text-green-500 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12 novos este mês
          </p>
        </div>

        <div className="card p-6 border-l-4 border-orange-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
              <Target className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metas Atingidas</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">68%</p>
          <p className="text-[10px] text-orange-500 font-bold mt-1 flex items-center gap-1">
            Estável vs mês anterior
          </p>
        </div>

        <div className="card p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Perda de Peso Média</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">1.2 kg</p>
          <p className="text-[10px] text-slate-400 font-bold mt-1">
            Por paciente/mês
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Adherence Trend */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Evolução da Aderência</h3>
            <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adherenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Area type="monotone" dataKey="adherence" name="Aderência Real (%)" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorAdherence)" />
                <Line type="monotone" dataKey="target" name="Meta (80%)" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals Distribution */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Distribuição de Objetivos</h3>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={goalsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {goalsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold', color: '#1E293B' }}
                  formatter={(value: number) => [`${value}%`, 'Pacientes']}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', fontWeight: '500' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weight Loss Trend */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Média de Perda de Peso (kg/semana)</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weightLossData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value} kg`, 'Perda Média']}
                />
                <Bar dataKey="avgLoss" name="Perda de Peso (kg)" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="card p-6 bg-slate-800 text-white">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-nutrio-green" />
            Insights da IA
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
              <p className="text-sm font-medium leading-relaxed">
                A aderência aos planos alimentares aumentou <span className="text-nutrio-green font-bold">15%</span> nos últimos 3 meses, correlacionando com o uso do aplicativo pelos pacientes.
              </p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
              <p className="text-sm font-medium leading-relaxed">
                Pacientes com objetivo de <span className="text-blue-400 font-bold">Hipertrofia</span> apresentam maior dificuldade em atingir a meta de carboidratos.
              </p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
              <p className="text-sm font-medium leading-relaxed">
                O horário com maior índice de "furos" na dieta é o <span className="text-orange-400 font-bold">Lanche da Tarde</span> (15h - 17h).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
