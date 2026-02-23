import React, { useState } from 'react';
import { Search, Smartphone, Bell, User, ChevronDown, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  onSearch: (val: string) => void;
  patientName: string;
  userName: string;
  userAvatar: string;
  onProfileClick: () => void;
}

export const Header = ({ 
  onSearch, 
  patientName, 
  userName,
  userAvatar,
  onProfileClick
}: HeaderProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Pesquisar refeições..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nutrio-green/20"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 mr-4">
          <Smartphone 
            className="w-5 h-5 text-slate-400 cursor-pointer hover:text-nutrio-green transition-colors" 
            onClick={() => alert("Nutrio Creator: Em breve!")}
          />
          <div className="relative cursor-pointer" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">18</span>
            
            {isNotificationsOpen && (
              <div className="absolute top-10 right-0 w-64 bg-white border border-slate-200 shadow-xl rounded-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                <h4 className="text-xs font-bold text-slate-700 mb-3">Notificações</h4>
                <div className="space-y-3">
                  <div className="text-[10px] text-slate-500 border-b border-slate-50 pb-2">
                    <p className="font-bold text-slate-700">Novo diário alimentar</p>
                    <p>{patientName} preencheu o diário de hoje.</p>
                  </div>
                  <div className="text-[10px] text-slate-500 pb-2">
                    <p className="font-bold text-slate-700">Consulta amanhã</p>
                    <p>Lembrete: Consulta com João Silva às 14:00.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-100 group-hover:border-nutrio-green transition-colors">
              <img src={userAvatar} alt="Avatar" referrerPolicy="no-referrer" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-slate-700 group-hover:text-nutrio-green transition-colors">{userName}</span>
              <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isUserMenuOpen && "rotate-180")} />
            </div>
          </div>

          {isUserMenuOpen && (
            <div className="absolute top-12 right-0 w-48 bg-white border border-slate-200 shadow-xl rounded-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div 
                className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-600 flex items-center gap-2"
                onClick={() => {
                  onProfileClick();
                  setIsUserMenuOpen(false);
                }}
              >
                <User className="w-4 h-4" /> Meu Perfil
              </div>
              <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-600 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Configurações
              </div>
              <div className="border-t border-slate-100 my-1" />
              <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-red-500 flex items-center gap-2">
                Sair
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
