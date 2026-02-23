import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { MAIN_NAV } from '../constants';

interface SidebarProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (val: boolean) => void;
  activeMainTab: string;
  setActiveMainTab: (val: string) => void;
}

export const Sidebar = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  activeMainTab,
  setActiveMainTab
}: SidebarProps) => {
  return (
    <aside className={cn("bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 transition-all duration-300", isSidebarCollapsed ? "w-20" : "w-64")}>
      <div className="p-6 flex items-center justify-between">
        {!isSidebarCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-nutrio-green text-3xl font-bold tracking-tight">Nutrio</span>
          </div>
        )}
        <ChevronLeft 
          className={cn("w-5 h-5 text-slate-400 cursor-pointer transition-transform", isSidebarCollapsed && "rotate-180 mx-auto")} 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {MAIN_NAV.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setActiveMainTab(item.id)}
            className={cn(
              "sidebar-item",
              activeMainTab === item.id && "sidebar-item-active",
              isSidebarCollapsed && "justify-center px-0"
            )}
            title={isSidebarCollapsed ? item.label : ""}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
          </div>
        ))}
      </nav>
    </aside>
  );
};
