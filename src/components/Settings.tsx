import React from 'react';
import { User, Sparkles, FileText, ExternalLink, MessageSquare, Calendar, DollarSign, FileUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface SettingsProps {
  activeSettingsTab: string;
  setActiveSettingsTab: (val: string) => void;
  clinicName: string;
  setClinicName: (val: string) => void;
  clinicPhone: string;
  setClinicPhone: (val: string) => void;
  clinicAddress: string;
  setClinicAddress: (val: string) => void;
  handleSaveSettings: () => void;
  isSavingSettings: boolean;
}

export const Settings = ({
  activeSettingsTab,
  setActiveSettingsTab,
  clinicName,
  setClinicName,
  clinicPhone,
  setClinicPhone,
  clinicAddress,
  setClinicAddress,
  handleSaveSettings,
  isSavingSettings
}: SettingsProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Configurações</h1>
        <p className="text-slate-500 text-sm">Gerencie as informações da sua clínica e preferências do sistema.</p>
      </div>

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0 space-y-1">
          {[
            { id: 'clinica', label: 'Dados da Clínica', icon: User },
            { id: 'personalizacao', label: 'Personalização', icon: Sparkles },
            { id: 'pdf', label: 'Preferências de PDF', icon: FileText },
            { id: 'integracoes', label: 'Integrações', icon: ExternalLink },
          ].map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveSettingsTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all",
                activeSettingsTab === tab.id 
                  ? "bg-nutrio-green text-white shadow-md shadow-green-100" 
                  : "text-slate-500 hover:bg-white hover:text-slate-700"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-bold">{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="card p-8">
            {activeSettingsTab === 'clinica' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Dados da Clínica</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Nome da Clínica</label>
                    <input 
                      type="text" 
                      value={clinicName} 
                      onChange={(e) => setClinicName(e.target.value)}
                      className="input-field" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Telefone de Contato</label>
                    <input 
                      type="text" 
                      value={clinicPhone} 
                      onChange={(e) => setClinicPhone(e.target.value)}
                      className="input-field" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Endereço Completo</label>
                  <input 
                    type="text" 
                    value={clinicAddress} 
                    onChange={(e) => setClinicAddress(e.target.value)}
                    className="input-field" 
                  />
                </div>
                <div className="pt-4 border-t border-slate-50">
                  <button 
                    onClick={handleSaveSettings}
                    disabled={isSavingSettings}
                    className="px-6 py-2.5 bg-nutrio-green text-white font-bold rounded-lg hover:bg-nutrio-green-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSavingSettings ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeSettingsTab === 'personalizacao' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Personalização</h3>
                <div className="flex items-center gap-8">
                  <div className="w-32 h-32 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 group cursor-pointer hover:border-nutrio-green transition-colors">
                    <div className="text-center">
                      <FileUp className="w-6 h-6 text-slate-400 mx-auto mb-2 group-hover:text-nutrio-green" />
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-nutrio-green">Upload Logo</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-700">Logotipo da Clínica</p>
                    <p className="text-xs text-slate-400 max-w-xs">Este logo aparecerá nos seus PDFs e na tela de login dos pacientes.</p>
                    <button className="text-xs font-bold text-nutrio-green hover:underline">Remover logotipo</button>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-50">
                  <label className="block text-xs font-medium text-slate-500 mb-3">Cor Principal do Sistema</label>
                  <div className="flex gap-3">
                    {['#22C55E', '#A855F7', '#3B82F6', '#F59E0B', '#EF4444', '#06B6D4'].map(color => (
                      <div 
                        key={color} 
                        className="w-10 h-10 rounded-xl cursor-pointer border-4 border-white shadow-sm hover:scale-110 transition-all" 
                        style={{ backgroundColor: color }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSettingsTab === 'pdf' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Preferências de PDF</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="text-sm font-bold text-slate-700">Cabeçalho Automático</p>
                      <p className="text-xs text-slate-400">Incluir dados da clínica no topo de todos os documentos.</p>
                    </div>
                    <button className="w-12 h-6 bg-nutrio-green rounded-full relative transition-colors">
                      <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="text-sm font-bold text-slate-700">Rodapé com Numeração</p>
                      <p className="text-xs text-slate-400">Adicionar número de página e data de geração no rodapé.</p>
                    </div>
                    <button className="w-12 h-6 bg-nutrio-green rounded-full relative transition-colors">
                      <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Texto Padrão do Rodapé</label>
                    <textarea 
                      className="input-field min-h-[100px]" 
                      placeholder="Ex: Nutricionista Gabriel Dias - CRN 123456"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSettingsTab === 'integracoes' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Integrações</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'WhatsApp', desc: 'Envio automático de lembretes', status: 'Conectado', icon: MessageSquare, color: 'text-green-500' },
                    { name: 'Google Calendar', desc: 'Sincronize sua agenda', status: 'Desconectado', icon: Calendar, color: 'text-blue-500' },
                    { name: 'Stripe', desc: 'Receba pagamentos online', status: 'Desconectado', icon: DollarSign, color: 'text-indigo-500' },
                    { name: 'Instagram', desc: 'Mostre seu portfólio', status: 'Conectado', icon: Sparkles, color: 'text-pink-500' },
                  ].map((item) => (
                    <div key={item.name} className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between hover:border-nutrio-green/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center", item.color)}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{item.name}</p>
                          <p className="text-[10px] text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                      <button className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-lg transition-colors",
                        item.status === 'Conectado' ? "bg-green-50 text-nutrio-green" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                      )}>
                        {item.status === 'Conectado' ? 'Configurar' : 'Conectar'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
