// ポモドーロタイマーの型定義

// タイマーのモード
export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

// タイマーの状態
export type TimerStatus = 'idle' | 'running' | 'paused';

// 設定値
export interface PomodoroSettings {
  focusDuration: number; // 集中時間（分）
  shortBreakDuration: number; // 短い休憩（分）
  longBreakDuration: number; // 長い休憩（分）
  longBreakInterval: number; // 長い休憩までのセッション数
  autoStartBreaks: boolean; // 休憩を自動開始
  autoStartFocus: boolean; // 集中を自動開始
  soundEnabled: boolean; // 通知音
}

// セッション履歴
export interface PomodoroSession {
  id: string;
  mode: TimerMode;
  duration: number; // 完了した秒数
  completedAt: string; // ISO日付文字列
}

// 日別統計
export interface DailyStats {
  date: string; // YYYY-MM-DD形式
  focusSessions: number;
  totalFocusMinutes: number;
}

// タイマーの状態
export interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number; // 残り秒数
  sessionsCompleted: number; // 完了したセッション数
}
