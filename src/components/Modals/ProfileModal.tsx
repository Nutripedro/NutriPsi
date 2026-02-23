import React, { useRef } from 'react';
import { Plus } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  setUserName: (val: string) => void;
  userEmail: string;
  setUserEmail: (val: string) => void;
  userCrm: string;
  setUserCrm: (val: string) => void;
  userAvatar: string;
  setUserAvatar: (val: string) => void;
}

export const ProfileModal = ({
  isOpen,
  onClose,
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userCrm,
  setUserCrm,
  userAvatar,
  setUserAvatar
}: ProfileModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Meu Perfil</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Plus className="w-5 h-5 rotate-45 text-slate-400" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden border-4 border-slate-50 shadow-sm mb-3">
              <img src={userAvatar} alt="Avatar" referrerPolicy="no-referrer" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              className="hidden" 
              accept="image/*" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-nutrio-green hover:underline"
            >
              Alterar foto
            </button>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Nome completo</label>
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              className="input-field" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">E-mail profissional</label>
            <input 
              type="email" 
              value={userEmail} 
              onChange={(e) => setUserEmail(e.target.value)}
              className="input-field" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Registro Profissional (CRM/CRN)</label>
            <input 
              type="text" 
              value={userCrm} 
              onChange={(e) => setUserCrm(e.target.value)}
              className="input-field" 
            />
          </div>
        </div>
        <div className="p-6 bg-slate-50 flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-nutrio-green text-white text-sm font-bold rounded-lg hover:bg-nutrio-green-dark transition-all active:scale-95"
          >
            Salvar alterações
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:bg-white transition-all"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
