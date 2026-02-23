import React from 'react';
import { Plus, FileText, Download, Share2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface WeeklyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeeklyReportModal = ({ isOpen, onClose }: WeeklyReportModalProps) => {
  const [isExporting, setIsExporting] = React.useState(false);
  if (!isOpen) return null;

  const handleShare = (name?: string) => {
    const message = name 
      ? `Compartilhando relatório semanal de ${name}` 
      : "Compartilhando relatório semanal geral";
    alert(message + " (Simulação)");
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Relatório semanal exportado com sucesso! (Simulação)");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-nutrio-green" />
            <h3 className="text-lg font-bold text-slate-800">Relatório Semanal de Aderência</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Plus className="w-5 h-5 rotate-45 text-slate-400" />
          </button>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Média Semanal</p>
              <p className="text-2xl font-bold text-nutrio-green">82%</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Registros</p>
              <p className="text-2xl font-bold text-slate-800">284</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alertas</p>
              <p className="text-2xl font-bold text-red-500">14</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700">Resumo por Paciente</h4>
            <div className="space-y-2">
              {[
                { name: 'Ana Carolina', adherence: 92, status: 'Excelente' },
                { name: 'João Silva', adherence: 45, status: 'Crítico' },
                { name: 'Mariana Costa', adherence: 78, status: 'Bom' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                      {item.name[0]}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleShare(item.name)}
                      className="p-1.5 text-slate-400 hover:text-nutrio-green opacity-0 group-hover:opacity-100 transition-all"
                      title="Compartilhar relatório individual"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-700">{item.adherence}%</p>
                      <p className="text-[10px] text-slate-400">{item.status}</p>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      item.adherence > 80 ? "bg-green-500" : item.adherence > 50 ? "bg-yellow-500" : "bg-red-500"
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 flex items-center gap-3">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex-1 py-2.5 bg-nutrio-green text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-nutrio-green-dark transition-all disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Exportar PDF
              </>
            )}
          </button>
          <button 
            onClick={() => handleShare()}
            className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            <Share2 className="w-4 h-4" /> Compartilhar
          </button>
        </div>
      </div>
    </div>
  );
};
