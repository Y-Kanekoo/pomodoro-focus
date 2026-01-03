'use client';

import { CircularProgress } from '@/components/ui/CircularProgress';
import { TimerMode, TimerStatus } from '@/types/pomodoro';
import { MODE_LABELS } from '@/constants/pomodoro';

interface TimerProps {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number;
  totalTime: number;
}

// 時間をフォーマット（MM:SS）
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// モードに応じたストロークカラー
const MODE_STROKE_COLORS: Record<TimerMode, string> = {
  focus: 'stroke-rose-500',
  shortBreak: 'stroke-emerald-500',
  longBreak: 'stroke-blue-500',
};

export function Timer({ mode, status, timeLeft, totalTime }: TimerProps) {
  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* モード表示 */}
      <div
        className={`text-sm font-medium uppercase tracking-wider ${
          mode === 'focus'
            ? 'text-rose-500'
            : mode === 'shortBreak'
            ? 'text-emerald-500'
            : 'text-blue-500'
        }`}
      >
        {MODE_LABELS[mode]}
      </div>

      {/* 円形プログレス */}
      <CircularProgress
        progress={progress}
        size={280}
        strokeWidth={8}
        color={MODE_STROKE_COLORS[mode]}
      >
        <div className="flex flex-col items-center">
          {/* 時間表示 */}
          <div
            className="text-6xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-white"
            aria-live="polite"
            aria-atomic="true"
          >
            {formatTime(timeLeft)}
          </div>
          {/* ステータス表示 */}
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {status === 'running'
              ? '実行中'
              : status === 'paused'
              ? '一時停止中'
              : '準備完了'}
          </div>
        </div>
      </CircularProgress>
    </div>
  );
}
