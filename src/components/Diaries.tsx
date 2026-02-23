import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { Diary } from '../types';

interface DiariesProps {
  diaries: Diary[];
  onConfigureAlerts: () => void;
  onWeeklyReport: () => void;
}

export const Diaries = ({ diaries, onConfigureAlerts, onWeeklyReport }: DiariesProps) => {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Diários alimentares exportados com sucesso! (Simulação)");
    }, 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Diários Alimentares</h1>
          <p className="text-slate-500 text-sm">Acompanhe o registro diário de seus pacientes em tempo real.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            ) : null}
            Exportar PDF
          </button>
          <button 
            onClick={onWeeklyReport}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all"
          >
            Relatório Semanal
          </button>
          <button 
            onClick={onConfigureAlerts}
            className="px-4 py-2 bg-nutrio-green text-white rounded-lg font-bold text-sm shadow-sm hover:bg-nutrio-green-dark transition-all"
          >
            Configurar Alertas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Registros Hoje</p>
          <p className="text-2xl font-bold text-slate-800">42</p>
        </div>
        <div className="card p-6">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Aderência Média</p>
          <p className="text-2xl font-bold text-slate-800">84%</p>
        </div>
        <div className="card p-6">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Alertas Críticos</p>
          <p className="text-2xl font-bold text-red-500">3</p>
        </div>
        <div className="card p-6">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Pendentes</p>
          <p className="text-2xl font-bold text-orange-500">12</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Registros Recentes</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar paciente..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-xs focus:ring-2 focus:ring-nutrio-green/20 w-64" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paciente</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aderência</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {diaries.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                        {d.patient.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{d.patient}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{new Date(d.date).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 text-[10px] font-bold rounded-md uppercase",
                      d.status === 'completed' ? "bg-green-50 text-green-500" : "bg-orange-50 text-orange-500"
                    )}>
                      {d.status === 'completed' ? 'Preenchido' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                        <div className={cn(
                          "h-full rounded-full",
                          d.adherence > 80 ? "bg-green-500" : d.adherence > 50 ? "bg-orange-500" : "bg-red-500"
                        )} style={{ width: `${d.adherence}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{d.adherence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-nutrio-green hover:underline text-xs font-bold">Ver detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
