'use client';

import { DailyStats } from '@/types/pomodoro';

interface StatisticsProps {
  todayStats: DailyStats;
  sessionsCompleted: number;
}

export function Statistics({ todayStats, sessionsCompleted }: StatisticsProps) {
  return (
    <div className="w-full max-w-sm">
      <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
        今日の記録
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {/* 完了セッション */}
        <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {todayStats.focusSessions}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">セッション</div>
        </div>

        {/* 集中時間 */}
        <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {todayStats.totalFocusMinutes}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">分</div>
        </div>

        {/* 現在のセッション */}
        <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {sessionsCompleted}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">連続</div>
        </div>
      </div>
    </div>
  );
}
