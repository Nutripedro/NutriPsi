import React from 'react';
import { FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { PATIENT_MENU } from '../constants';

interface PatientSidebarProps {
  patientName: string;
  activePatientTab: string;
  setActivePatientTab: (val: string) => void;
}

export const PatientSidebar = ({
  patientName,
  activePatientTab,
  setActivePatientTab
}: PatientSidebarProps) => {
  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 overflow-y-auto hidden xl:flex">
      <div className="p-6 border-bottom border-slate-50">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-slate-800">{patientName}</h2>
          <FileText className="w-4 h-4 text-slate-400" />
        </div>
        <p className="text-xs text-slate-400">23 anos, Feminino</p>
      </div>
      
      <nav className="px-4 py-2 space-y-0.5">
        {PATIENT_MENU.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setActivePatientTab(item.id)}
            className={cn(
              "patient-menu-item",
              activePatientTab === item.id && "patient-menu-item-active"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};
