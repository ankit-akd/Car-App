'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Car } from '@/lib/types';

const MAX_COMPARE = 3;

interface AppContextValue {
  compareList: Car[];
  addToCompare: (car: Car) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;

  shortlist: Car[];
  addToShortlist: (car: Car) => void;
  removeFromShortlist: (id: string) => void;
  isInShortlist: (id: string) => boolean;
  clearShortlist: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Car[]>([]);
  const [shortlist, setShortlist] = useState<Car[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setCompareList(loadFromStorage<Car[]>('fmc_compare', []));
      setShortlist(loadFromStorage<Car[]>('fmc_shortlist', []));
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage('fmc_compare', compareList);
  }, [compareList, hydrated]);

  useEffect(() => {
    if (hydrated) saveToStorage('fmc_shortlist', shortlist);
  }, [shortlist, hydrated]);

  const addToCompare = useCallback((car: Car) => {
    setCompareList((prev) => {
      if (prev.find((c) => c.id === car.id) || prev.length >= MAX_COMPARE) return prev;
      return [...prev, car];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const isInCompare = useCallback(
    (id: string) => compareList.some((c) => c.id === id),
    [compareList]
  );

  const clearCompare = useCallback(() => setCompareList([]), []);

  const addToShortlist = useCallback((car: Car) => {
    setShortlist((prev) => {
      if (prev.find((c) => c.id === car.id)) return prev;
      return [...prev, car];
    });
  }, []);

  const removeFromShortlist = useCallback((id: string) => {
    setShortlist((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const isInShortlist = useCallback(
    (id: string) => shortlist.some((c) => c.id === id),
    [shortlist]
  );

  const clearShortlist = useCallback(() => setShortlist([]), []);

  return (
    <AppContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        shortlist,
        addToShortlist,
        removeFromShortlist,
        isInShortlist,
        clearShortlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
