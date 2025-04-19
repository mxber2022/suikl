import React, { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b border-dark-200 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden text-dark-400 hover:text-dark-900 transition-colors p-2 hover:bg-dark-100/20 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="lg:hidden">
          <Logo />
        </div>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-dark-400 hover:text-dark-900 transition-colors hover:bg-dark-100/20 rounded-lg"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full" />
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-dark-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-dark-900">Notifications</h3>
              <button className="text-sm text-brand-600 hover:text-brand-700">
                Mark all as read
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-dark-100/10">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-sm text-dark-900">Token deployment successful</p>
                  <p className="text-xs text-dark-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-dark-100/10">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-500 text-sm">i</span>
                </div>
                <div>
                  <p className="text-sm text-dark-900">New DeFi opportunity available</p>
                  <p className="text-xs text-dark-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-dark-100/10">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-500 text-sm">!</span>
                </div>
                <div>
                  <p className="text-sm text-dark-900">Gas prices are high</p>
                  <p className="text-xs text-dark-500">2 hours ago</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 text-center text-sm text-dark-500 hover:text-dark-900 p-2 rounded-lg hover:bg-dark-100/10">
              View all notifications
            </button>
          </div>
        )}
      </div>
    </header>
  );
};