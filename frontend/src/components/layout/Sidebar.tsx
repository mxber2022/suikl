import React from 'react';
import { X, Command, LayoutDashboard, Wallet, Shield, History, Settings, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNavigationChange: (view: string) => void;
  currentView: string;
}

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, view: 'chat' },
  { name: 'Portfolio', icon: Wallet, view: 'portfolio' },
  { name: 'Security', icon: Shield, view: 'security' },
  { name: 'History', icon: History, view: 'history' },
  { name: 'Settings', icon: Settings, view: 'settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  isCollapsed, 
  onToggleCollapse,
  onNavigationChange,
  currentView
}) => {
  return (
    <>
      <aside 
        className={clsx(
          "fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-24" : "lg:w-64"
        )}
      >
        <div className="h-full flex flex-col p-4 bg-white/95 backdrop-blur-xl border-r border-dark-200 relative">
          <div className={clsx(
            "flex items-center transition-all duration-300 mb-6",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            <Logo collapsed={isCollapsed} />
            <button
              onClick={onClose}
              className="lg:hidden text-dark-400 hover:text-dark-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigationChange(item.view)}
                className={clsx(
                  'nav-link group relative w-full',
                  currentView === item.view && 'nav-link-active',
                  isCollapsed ? 'justify-center h-14' : 'px-4 h-12',
                  'hover:bg-brand-50'
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <div className={clsx(
                  "flex items-center justify-center transition-all duration-300",
                  isCollapsed ? "w-14 h-14" : "w-10 h-10"
                )}>
                  <item.icon className={clsx(
                    "transition-all duration-300",
                    isCollapsed ? "w-6 h-6" : "w-5 h-5",
                    currentView === item.view ? "text-brand-600" : "text-dark-500",
                    "group-hover:text-brand-600 group-hover:scale-110"
                  )} />
                </div>
                <span className={clsx(
                  "transition-all duration-300 whitespace-nowrap",
                  isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100 ml-3",
                  currentView === item.view ? "text-brand-600" : "text-dark-500"
                )}>
                  {item.name}
                </span>
                {currentView === item.view && (
                  <div className={clsx(
                    "absolute bg-brand-500/10",
                    isCollapsed ? "inset-2 rounded-xl" : "inset-1 rounded-xl"
                  )} />
                )}
              </button>
            ))}
          </nav>

          <div className={clsx(
            "mt-auto transition-all duration-300 overflow-hidden",
            isCollapsed ? "h-0 opacity-0" : "h-auto opacity-100"
          )}>
            <div className="p-4 rounded-xl bg-dark-100/20 space-y-3">
              <div className="flex items-center gap-3 text-sm font-medium text-dark-900">
                <Command className="w-4 h-4 text-brand-500" />
                Quick Actions
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 text-xs text-dark-500 hover:text-dark-900 bg-dark-100/20 hover:bg-dark-200/30 rounded-lg transition-colors">
                  New Token
                </button>
                <button className="p-2 text-xs text-dark-500 hover:text-dark-900 bg-dark-100/20 hover:bg-dark-200/30 rounded-lg transition-colors">
                  Import
                </button>
                <button className="p-2 text-xs text-dark-500 hover:text-dark-900 bg-dark-100/20 hover:bg-dark-200/30 rounded-lg transition-colors">
                  Deploy
                </button>
                <button className="p-2 text-xs text-dark-500 hover:text-dark-900 bg-dark-100/20 hover:bg-dark-200/30 rounded-lg transition-colors">
                  Verify
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onToggleCollapse}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-white border border-dark-200 text-dark-400 hover:text-dark-900 transition-all duration-300 hover:border-dark-300 hover:shadow-md hover:scale-110"
          >
            <ChevronRight className={clsx(
              "w-5 h-5 transition-transform duration-300",
              isCollapsed ? "" : "rotate-180"
            )} />
          </button>
        </div>
      </aside>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};