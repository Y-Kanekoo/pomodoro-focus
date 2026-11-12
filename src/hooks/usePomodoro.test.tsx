import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/constants/pomodoro';
import { usePomodoro } from './usePomodoro';
import { mockLocalStorage } from './__tests__/storage';

describe('usePomodoro', () => {
  beforeEach(() => {
    mockLocalStorage();
  });

  it('待機中は保存した設定時間を表示し、開始時にも同じ時間を使用する', async () => {
    window.localStorage.setItem(
      STORAGE_KEYS.settings,
      JSON.stringify({ ...DEFAULT_SETTINGS, focusDuration: 10 })
    );
    const { result } = renderHook(() => usePomodoro());

    await waitFor(() => expect(result.current.timeLeft).toBe(600));

    act(() => result.current.start());
    expect(result.current.status).toBe('running');
    expect(result.current.timeLeft).toBe(600);

    act(() => result.current.pause());
    act(() => result.current.setSettings({ ...DEFAULT_SETTINGS, focusDuration: 15 }));
    expect(result.current.timeLeft).toBe(600);

    act(() => result.current.reset());
    expect(result.current.status).toBe('idle');
    expect(result.current.timeLeft).toBe(900);
  });
});
