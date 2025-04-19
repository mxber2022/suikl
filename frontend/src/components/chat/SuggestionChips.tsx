import React from 'react';
import { Coins, Square } from 'lucide-react';
import { clsx } from 'clsx';

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isThinking: boolean;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({ 
  suggestions, 
  onSuggestionClick, 
  isThinking 
}) => {
  return (
    <div className="px-6 py-3">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-dark-200 scrollbar-track-transparent">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            disabled={isThinking}
            className={clsx(
              'suggestion-chip',
              isThinking
                ? 'text-dark-400 bg-dark-100/20 cursor-not-allowed'
                : 'text-dark-500 hover:text-dark-900 bg-dark-100/20 hover:bg-dark-200/30'
            )}
          >
            {suggestion === "Mint ERC-20 Token" ? (
              <Coins className="w-4 h-4" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};