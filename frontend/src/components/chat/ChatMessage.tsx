import React from 'react';
import ReactMarkdown from 'react-markdown';
import { twMerge } from 'tailwind-merge';

interface ChatMessageProps {
  sender: 'user' | 'assistant';
  text: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text }) => {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} message-enter message-enter-active`}>
      <div
        className={twMerge(
          'max-w-[80%] p-6 rounded-xl message-bubble',
          sender === 'user' 
            ? 'bg-brand-500 text-white ml-8' 
            : 'glass-panel mr-8'
        )}
      >
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 flex items-center gap-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-3 flex items-center gap-2" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-medium mb-2" {...props} />,
            p: ({node, ...props}) => <p className="leading-relaxed mb-4 last:mb-0" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
            li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
            strong: ({node, ...props}) => <strong className="font-semibold text-brand-600" {...props} />,
            em: ({node, ...props}) => <em className="italic opacity-80" {...props} />,
            code: ({node, inline, ...props}) => 
              inline 
                ? <code className="font-mono bg-dark-100/20 px-1.5 py-0.5 rounded text-sm" {...props} />
                : <code className="font-mono block bg-dark-100/20 p-4 rounded-xl my-4 text-sm overflow-x-auto" {...props} />,
            hr: ({node, ...props}) => <hr className="my-6 border-dark-200" {...props} />,
            a: ({node, ...props}) => (
              <a
                {...props}
                className="text-brand-600 hover:text-brand-700 underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};