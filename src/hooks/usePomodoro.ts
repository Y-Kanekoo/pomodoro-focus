'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode, TimerStatus, PomodoroSettings, PomodoroSession, DailyStats } from '@/types/pomodoro';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/constants/pomodoro';
import { useLocalStorage } from './useLocalStorage';

// 今日の日付をYYYY-MM-DD形式で取得
function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// ユニークIDを生成
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function usePomodoro() {
  // 設定
  const [settings, setSettings] = useLocalStorage<PomodoroSettings>(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS
  );

  // セッション履歴
  const [sessions, setSessions] = useLocalStorage<PomodoroSession[]>(
    STORAGE_KEYS.sessions,
    []
  );

  // 日別統計
  const [dailyStats, setDailyStats] = useLocalStorage<DailyStats[]>(
    STORAGE_KEYS.dailyStats,
    []
  );

  // タイマーの状態
  const [mode, setMode] = useState<TimerMode>('focus');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // インターバルの参照
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // モードに応じた時間を取得
  const getDurationForMode = useCallback(
    (targetMode: TimerMode): number => {
      switch (targetMode) {
        case 'focus':
          return settings.focusDuration * 60;
        case 'shortBreak':
          return settings.shortBreakDuration * 60;
        case 'longBreak':
          return settings.longBreakDuration * 60;
      }
    },
    [settings]
  );

  // 設定変更時にタイマーをリセット
  useEffect(() => {
    if (status === 'idle') {
      setTimeLeft(getDurationForMode(mode));
    }
  }, [settings, mode, status, getDurationForMode]);

  // 通知音を再生
  const playSound = useCallback(() => {
    if (settings.soundEnabled && typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);

      // 3回鳴らす
      setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        osc2.connect(gainNode);
        osc2.frequency.value = 800;
        osc2.type = 'sine';
        osc2.start();
        osc2.stop(audioContext.currentTime + 0.3);
      }, 400);

      setTimeout(() => {
        const osc3 = audioContext.createOscillator();
        osc3.connect(gainNode);
        osc3.frequency.value = 1000;
        osc3.type = 'sine';
        osc3.start();
        osc3.stop(audioContext.currentTime + 0.5);
      }, 800);
    }
  }, [settings.soundEnabled]);

  // セッション完了時の処理
  const completeSession = useCallback(() => {
    const now = new Date().toISOString();
    const today = getTodayString();

    // セッション履歴を追加
    const newSession: PomodoroSession = {
      id: generateId(),
      mode,
      duration: getDurationForMode(mode),
      completedAt: now,
    };
    setSessions((prev) => [...prev.slice(-99), newSession]); // 最大100件

    // 集中セッションの場合、統計を更新
    if (mode === 'focus') {
      setDailyStats((prev) => {
        const todayStats = prev.find((s) => s.date === today);
        if (todayStats) {
          return prev.map((s) =>
            s.date === today
              ? {
                  ...s,
                  focusSessions: s.focusSessions + 1,
                  totalFocusMinutes: s.totalFocusMinutes + settings.focusDuration,
                }
              : s
          );
        } else {
          return [
            ...prev.slice(-29), // 最大30日分
            {
              date: today,
              focusSessions: 1,
              totalFocusMinutes: settings.focusDuration,
            },
          ];
        }
      });
    }

    playSound();

    // 次のモードへ
    if (mode === 'focus') {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);

      // 長い休憩かどうか判定
      const nextMode =
        newSessionsCompleted % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setTimeLeft(getDurationForMode(nextMode));

      if (settings.autoStartBreaks) {
        setStatus('running');
      } else {
        setStatus('idle');
      }
    } else {
      // 休憩終了後は集中モードへ
      setMode('focus');
      setTimeLeft(getDurationForMode('focus'));

      if (settings.autoStartFocus) {
        setStatus('running');
      } else {
        setStatus('idle');
      }
    }
  }, [
    mode,
    sessionsCompleted,
    settings,
    getDurationForMode,
    playSound,
    setSessions,
    setDailyStats,
  ]);

  // タイマーのtick
  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, completeSession]);

  // タイマーを開始
  const start = useCallback(() => {
    setStatus('running');
  }, []);

  // タイマーを一時停止
  const pause = useCallback(() => {
    setStatus('paused');
  }, []);

  // タイマーをリセット
  const reset = useCallback(() => {
    setStatus('idle');
    setTimeLeft(getDurationForMode(mode));
  }, [mode, getDurationForMode]);

  // モードを切り替え
  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setStatus('idle');
      setMode(newMode);
      setTimeLeft(getDurationForMode(newMode));
    },
    [getDurationForMode]
  );

  // スキップ（現在のセッションを完了扱いにせず次へ）
  const skip = useCallback(() => {
    if (mode === 'focus') {
      const nextMode =
        (sessionsCompleted + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setTimeLeft(getDurationForMode(nextMode));
    } else {
      setMode('focus');
      setTimeLeft(getDurationForMode('focus'));
    }
    setStatus('idle');
  }, [mode, sessionsCompleted, settings.longBreakInterval, getDurationForMode]);

  // 今日の統計を取得
  const getTodayStats = useCallback((): DailyStats => {
    const today = getTodayString();
    return (
      dailyStats.find((s) => s.date === today) || {
        date: today,
        focusSessions: 0,
        totalFocusMinutes: 0,
      }
    );
  }, [dailyStats]);

  return {
    // 状態
    mode,
    status,
    timeLeft,
    sessionsCompleted,
    settings,
    sessions,
    dailyStats,

    // アクション
    start,
    pause,
    reset,
    skip,
    switchMode,
    setSettings,

    // ユーティリティ
    getTodayStats,
    getDurationForMode,
  };
}
