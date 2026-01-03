'use client';

import { useState } from 'react';
import { usePomodoro } from '@/hooks/usePomodoro';
import { Timer } from '@/components/features/Timer';
import { Controls } from '@/components/features/Controls';
import { ModeSelector } from '@/components/features/ModeSelector';
import { Statistics } from '@/components/features/Statistics';
import { Settings } from '@/components/features/Settings';
import { AdBanner } from '@/components/features/AdBanner';

export default function Home() {
  const {
    mode,
    status,
    timeLeft,
    sessionsCompleted,
    settings,
    start,
    pause,
    reset,
    skip,
    switchMode,
    setSettings,
    getTodayStats,
    getDurationForMode,
  } = usePomodoro();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const todayStats = getTodayStats();
  const totalTime = getDurationForMode(mode);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-4 py-8">
      {/* ヘッダー */}
      <header className="flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Pomodoro Focus</h1>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="設定を開く"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </header>

      {/* メインコンテンツ */}
      <main className="flex flex-1 flex-col items-center justify-center gap-8">
        {/* モード選択 */}
        <ModeSelector currentMode={mode} onModeChange={switchMode} />

        {/* タイマー */}
        <Timer mode={mode} status={status} timeLeft={timeLeft} totalTime={totalTime} />

        {/* コントロール */}
        <Controls
          status={status}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSkip={skip}
        />

        {/* 統計 */}
        <Statistics todayStats={todayStats} sessionsCompleted={sessionsCompleted} />
      </main>

      {/* 広告バナー */}
      <footer className="mt-8 w-full flex justify-center">
        <AdBanner format="horizontal" />
      </footer>

      {/* 設定モーダル */}
      <Settings
        settings={settings}
        onSettingsChange={setSettings}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
