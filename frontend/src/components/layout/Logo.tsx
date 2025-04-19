import React from 'react';
import { Flame } from 'lucide-react';
import { clsx } from 'clsx';

interface LogoProps {
  collapsed?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <div className={clsx(
      "flex items-center",
      collapsed ? "gap-0" : "gap-3"
    )}>
      <div className="relative flex items-center justify-center w-10 h-10 flex-shrink-0">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/20 to-brand-600/20 animate-pulse-slow"></div>
        <Flame className="w-5 h-5 text-brand-500" />
      </div>
      <div className={clsx(
        "flex items-baseline gap-1 transition-all duration-300",
        collapsed && "hidden"
      )}>
        <span className="text-xl font-light tracking-tight text-dark-900">
          Token<span className="font-bold">Forge</span>
        </span>
        <div className="px-1.5 py-0.5 text-[10px] font-medium bg-brand-500/10 text-brand-500 rounded-md">
          BETA
        </div>
      </div>
    </div>
  );
};