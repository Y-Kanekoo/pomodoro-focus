import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalStorage } from './useLocalStorage';
import { mockLocalStorage } from './__tests__/storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    mockLocalStorage();
  });

  it('保存済みの値を読み込み、関数による更新を保存する', async () => {
    window.localStorage.setItem('count', JSON.stringify(3));
    const { result } = renderHook(() => useLocalStorage('count', 0));

    await waitFor(() => expect(result.current[0]).toBe(3));
    expect(result.current[2]).toBe(true);

    act(() => result.current[1]((value) => value + 1));

    expect(result.current[0]).toBe(4);
    expect(window.localStorage.getItem('count')).toBe('4');
  });

  it('別タブからの保存値の変更を反映する', async () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));

    window.localStorage.setItem('count', '5');
    act(() => window.dispatchEvent(new StorageEvent('storage', { key: 'count' })));

    await waitFor(() => expect(result.current[0]).toBe(5));
  });
});
