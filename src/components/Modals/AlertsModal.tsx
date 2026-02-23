import React from 'react';
import { Plus, Bell, ShieldAlert } from 'lucide-react';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertsModal = ({ isOpen, onClose }: AlertsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-nutrio-green" />
            <h3 className="text-lg font-bold text-slate-800">Configurar Alertas</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Plus className="w-5 h-5 rotate-45 text-slate-400" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-700">Aderência Baixa</p>
                <p className="text-[10px] text-slate-400">Notificar quando a aderência for menor que 60%.</p>
              </div>
              <button className="w-12 h-6 bg-nutrio-green rounded-full relative transition-colors">
                <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-700">Diário Pendente</p>
                <p className="text-[10px] text-slate-400">Notificar após 24h sem registro do paciente.</p>
              </div>
              <button className="w-12 h-6 bg-nutrio-green rounded-full relative transition-colors">
                <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-700">Consumo Excessivo</p>
                <p className="text-[10px] text-slate-400">Notificar se ultrapassar 20% da meta calórica.</p>
              </div>
              <button className="w-12 h-6 bg-slate-200 rounded-full relative transition-colors">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex gap-3">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-red-700">Alertas Críticos</p>
              <p className="text-[10px] text-red-600/70">Alertas críticos serão enviados via WhatsApp para o profissional.</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50">
          <button onClick={onClose} className="w-full py-2.5 bg-nutrio-green text-white font-bold rounded-lg shadow-lg shadow-green-100 hover:bg-nutrio-green-dark transition-all">Salvar Configurações</button>
        </div>
      </div>
    </div>
  );
};
