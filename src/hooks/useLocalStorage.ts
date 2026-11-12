'use client';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

// ローカルストレージからデータを取得・保存するhook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [initial] = useState(initialValue);

  // ブラウザー内と別タブからの変更を購読
  const subscribe = useCallback((onStoreChange: () => void) => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) {
        onStoreChange();
      }
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(`pomodoro-storage:${key}`, onStoreChange);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(`pomodoro-storage:${key}`, onStoreChange);
    };
  }, [key]);

  const getSnapshot = useCallback((): string | null => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error(`ローカルストレージの読み込みエラー: ${key}`, error);
      return null;
    }
  }, [key]);

  const getServerSnapshot = useCallback((): undefined => undefined, []);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLoaded = snapshot !== undefined;
  const [localOverride, setLocalOverride] = useState<{ key: string; value: T } | null>(null);
  const savedValue = useMemo((): T => {
    if (snapshot === undefined || snapshot === null) {
      return initial;
    }
    try {
      return JSON.parse(snapshot) as T;
    } catch (error) {
      console.error(`ローカルストレージの読み込みエラー: ${key}`, error);
      return initial;
    }
  }, [initial, key, snapshot]);
  const storedValue = localOverride?.key === key ? localOverride.value : savedValue;

  // 値を更新
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setLocalOverride(null);
            window.dispatchEvent(new Event(`pomodoro-storage:${key}`));
          } catch (error) {
            setLocalOverride({ key, value: valueToStore });
            throw error;
          }
        } else {
          setLocalOverride({ key, value: valueToStore });
        }
      } catch (error) {
        console.error(`ローカルストレージの保存エラー: ${key}`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue, isLoaded] as const;
}
