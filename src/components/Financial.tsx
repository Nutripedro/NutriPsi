import React from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { Transaction } from '../types';

interface FinancialProps {
  transactions: Transaction[];
  setIsTransactionModalOpen: (val: boolean) => void;
}

export const Financial = ({ transactions, setIsTransactionModalOpen }: FinancialProps) => {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Relatório financeiro exportado com sucesso! (Simulação)");
    }, 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Financeiro</h1>
          <p className="text-slate-500 text-sm">Controle suas receitas e despesas de forma simples.</p>
        </div>
        <button 
          onClick={() => setIsTransactionModalOpen(true)}
          className="px-4 py-2 bg-nutrio-green text-white rounded-lg font-bold text-sm shadow-sm hover:bg-nutrio-green-dark transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nova transação
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 border-l-4 border-green-500">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Saldo Total</p>
          <p className="text-2xl font-bold text-slate-800">R$ 4.250,00</p>
          <p className="text-[10px] text-green-500 font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% este mês
          </p>
        </div>
        <div className="card p-6 border-l-4 border-blue-500">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Receitas (Mês)</p>
          <p className="text-2xl font-bold text-slate-800">R$ 6.800,00</p>
        </div>
        <div className="card p-6 border-l-4 border-red-500">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Despesas (Mês)</p>
          <p className="text-2xl font-bold text-slate-800">R$ 2.550,00</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Últimas Transações</h3>
          <div className="flex gap-2">
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isExporting ? (
                <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : null}
              Exportar PDF
            </button>
            <button className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">Filtrar</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Valor</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{t.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md uppercase">
                      {t.category}
                    </span>
                  </td>
                  <td className={cn(
                    "px-6 py-4 text-sm font-bold text-right",
                    t.type === 'income' ? "text-green-500" : "text-red-500"
                  )}>
                    {t.type === 'income' ? '+' : ''} {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Pago
                    </span>
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
