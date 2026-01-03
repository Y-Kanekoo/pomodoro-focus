'use client';

import { TimerMode } from '@/types/pomodoro';
import { MODE_LABELS } from '@/constants/pomodoro';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

const MODES: TimerMode[] = ['focus', 'shortBreak', 'longBreak'];

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex rounded-full bg-gray-100 p-1 dark:bg-gray-800">
      {MODES.map((mode) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            currentMode === mode
              ? mode === 'focus'
                ? 'bg-rose-500 text-white'
                : mode === 'shortBreak'
                ? 'bg-emerald-500 text-white'
                : 'bg-blue-500 text-white'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
          aria-pressed={currentMode === mode}
        >
          {MODE_LABELS[mode]}
        </button>
      ))}
    </div>
  );
}
