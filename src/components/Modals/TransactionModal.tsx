import React from 'react';
import { Plus } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionModal = ({ isOpen, onClose }: TransactionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Nova Transação</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Plus className="w-5 h-5 rotate-45 text-slate-400" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Descrição</label>
            <input type="text" className="input-field" placeholder="Ex: Consulta Maria Silva" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Valor (R$)</label>
              <input type="number" className="input-field" placeholder="0,00" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Tipo</label>
              <select className="input-field">
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Categoria</label>
            <select className="input-field">
              <option>Consulta</option>
              <option>Infraestrutura</option>
              <option>Assinatura</option>
              <option>Marketing</option>
              <option>Outros</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Data</label>
            <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
        </div>
        <div className="p-6 bg-slate-50">
          <button onClick={onClose} className="w-full py-2.5 bg-nutrio-green text-white font-bold rounded-lg">Salvar Transação</button>
        </div>
      </div>
    </div>
  );
};
