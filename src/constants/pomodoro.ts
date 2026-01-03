import { PomodoroSettings, TimerMode } from '@/types/pomodoro';

// デフォルトの設定値
export const DEFAULT_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  soundEnabled: true,
};

// モードの表示名
export const MODE_LABELS: Record<TimerMode, string> = {
  focus: '集中',
  shortBreak: '小休憩',
  longBreak: '大休憩',
};

// モードの色
export const MODE_COLORS: Record<TimerMode, { bg: string; text: string; ring: string }> = {
  focus: {
    bg: 'bg-rose-500',
    text: 'text-rose-500',
    ring: 'ring-rose-500/30',
  },
  shortBreak: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-500',
    ring: 'ring-emerald-500/30',
  },
  longBreak: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    ring: 'ring-blue-500/30',
  },
};

// ストレージキー
export const STORAGE_KEYS = {
  settings: 'pomodoro-settings',
  sessions: 'pomodoro-sessions',
  dailyStats: 'pomodoro-daily-stats',
} as const;
