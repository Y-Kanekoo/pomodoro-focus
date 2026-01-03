'use client';

import { useState } from 'react';
import { PomodoroSettings } from '@/types/pomodoro';

interface SettingsProps {
  settings: PomodoroSettings;
  onSettingsChange: (settings: PomodoroSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ settings, onSettingsChange, isOpen, onClose }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleChange = (key: keyof PomodoroSettings, value: number | boolean) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="settings-title" className="text-lg font-semibold text-gray-900 dark:text-white">
            設定
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="閉じる"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* 時間設定 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">タイマー設定（分）</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">集中</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={localSettings.focusDuration}
                  onChange={(e) => handleChange('focusDuration', parseInt(e.target.value) || 25)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">小休憩</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={localSettings.shortBreakDuration}
                  onChange={(e) => handleChange('shortBreakDuration', parseInt(e.target.value) || 5)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">大休憩</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={localSettings.longBreakDuration}
                  onChange={(e) => handleChange('longBreakDuration', parseInt(e.target.value) || 15)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* インターバル設定 */}
          <div>
            <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">
              大休憩までのセッション数
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={localSettings.longBreakInterval}
              onChange={(e) => handleChange('longBreakInterval', parseInt(e.target.value) || 4)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* 自動開始設定 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">自動開始</h3>
            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">休憩を自動開始</span>
              <input
                type="checkbox"
                checked={localSettings.autoStartBreaks}
                onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
                className="h-5 w-5 rounded accent-rose-500"
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">集中を自動開始</span>
              <input
                type="checkbox"
                checked={localSettings.autoStartFocus}
                onChange={(e) => handleChange('autoStartFocus', e.target.checked)}
                className="h-5 w-5 rounded accent-rose-500"
              />
            </label>
          </div>

          {/* サウンド設定 */}
          <label className="flex cursor-pointer items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">通知音</span>
            <input
              type="checkbox"
              checked={localSettings.soundEnabled}
              onChange={(e) => handleChange('soundEnabled', e.target.checked)}
              className="h-5 w-5 rounded accent-rose-500"
            />
          </label>
        </div>

        {/* 保存ボタン */}
        <button
          onClick={handleSave}
          className="mt-6 w-full rounded-full bg-gray-900 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          保存
        </button>
      </div>
    </div>
  );
}
