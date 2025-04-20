import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Loader2 } from 'lucide-react';

interface AudioMessageProps {
  audioUrl: string;
}

export const AudioMessage: React.FC<AudioMessageProps> = ({ audioUrl }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [duration, setDuration] = React.useState<number>(0);
  const [currentTime, setCurrentTime] = React.useState<number>(0);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#6366f1',
        progressColor: '#4f46e5',
        cursorColor: 'transparent',
        barWidth: 2,
        barGap: 3,
        barRadius: 3,
        height: 48,
        normalize: true,
      });

      wavesurferRef.current.load(audioUrl);

      wavesurferRef.current.on('ready', () => {
        setIsLoading(false);
        setDuration(wavesurferRef.current?.getDuration() || 0);
      });

      wavesurferRef.current.on('audioprocess', () => {
        setCurrentTime(wavesurferRef.current?.getCurrentTime() || 0);
      });

      wavesurferRef.current.on('finish', () => {
        setIsPlaying(false);
        setCurrentTime(duration);
      });

      return () => {
        wavesurferRef.current?.destroy();
      };
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player">
      <button
        onClick={togglePlayPause}
        disabled={isLoading}
        className="audio-button"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
      <div className="flex-1">
        <div ref={waveformRef} className="mb-1" />
        <div className="flex justify-between text-xs text-dark-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};