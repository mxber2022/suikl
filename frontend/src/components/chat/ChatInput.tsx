import React from 'react';
import { Send } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AudioRecorder } from './AudioRecorder';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onAudioRecorded: (audioBlob: Blob) => void;
  isThinking: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onSend, 
  onAudioRecorded,
  isThinking 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="p-6 border-t border-dark-200">
      <div className="flex items-center gap-4">
        <AudioRecorder onRecordingComplete={onAudioRecorded} />
        <Input
          type="text"
          placeholder="Ask about token creation..."
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={isThinking}
        />
        <Button
          onClick={onSend}
          disabled={isThinking}
          variant={isThinking ? 'secondary' : 'primary'}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};