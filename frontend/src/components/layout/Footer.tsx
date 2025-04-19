import React from 'react';
import { Flame, Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-dark-200 bg-white/80 backdrop-blur-xl py-6 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-dark-500">
          <Flame className="w-4 h-4 text-brand-500" />
          <span className="text-sm">
            Built with ❤️ by <a href="#" className="text-brand-600 hover:text-brand-700 transition-colors">KayaAI Team</a>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-dark-400 hover:text-dark-900 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-dark-400 hover:text-dark-900 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-sm text-dark-500 hover:text-dark-900 transition-colors">
            Documentation
          </a>
          <a href="#" className="text-sm text-dark-500 hover:text-dark-900 transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};