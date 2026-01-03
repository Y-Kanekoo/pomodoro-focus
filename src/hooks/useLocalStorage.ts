'use client';

import { useState, useEffect, useCallback } from 'react';

// ローカルストレージからデータを取得・保存するhook
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 初期値を取得
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // クライアントサイドでのみローカルストレージから読み込み
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`ローカルストレージの読み込みエラー: ${key}`, error);
    }
    setIsLoaded(true);
  }, [key]);

  // 値を更新
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`ローカルストレージの保存エラー: ${key}`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue, isLoaded] as const;
}
