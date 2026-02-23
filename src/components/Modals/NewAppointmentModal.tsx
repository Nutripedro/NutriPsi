import React from 'react';
import { Plus } from 'lucide-react';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
}

export const NewAppointmentModal = ({ isOpen, onClose, patientName }: NewAppointmentModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Agendar Nova Consulta</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Plus className="w-5 h-5 rotate-45 text-slate-400" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Paciente</label>
            <select className="input-field">
              <option>{patientName}</option>
              <option>João Silva</option>
              <option>Mariana Costa</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Data</label>
              <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Horário</label>
              <input type="time" className="input-field" defaultValue="14:00" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Tipo de consulta</label>
            <div className="grid grid-cols-2 gap-2">
              {['Primeira vez', 'Retorno', 'Acompanhamento', 'Check-up'].map(type => (
                <button key={type} className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-nutrio-green hover:text-nutrio-green transition-all">{type}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50">
          <button onClick={onClose} className="w-full py-2.5 bg-nutrio-green text-white font-bold rounded-lg">Confirmar Agendamento</button>
        </div>
      </div>
    </div>
  );
};
