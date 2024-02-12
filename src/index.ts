import { useState, useEffect, useCallback } from 'react';

// * helpers
import debounce from './helpers/debounce';

// * types
type StorageType = keyof typeof storages;

type StateUpdate<T> = T | ((prev: T) => T);

type UseSyncedReturn<T> = [T, (setter: StateUpdate<T>) => void];

type UseSyncedOptions = Partial<{ type: StorageType; delay: number }>;

// * data
const storages = { local: localStorage, session: sessionStorage };

const useSynced = <T>(
  key: string,
  initialValue: T,
  options?: UseSyncedOptions
): UseSyncedReturn<T> => {
  const [state, setState] = useState<T>(initialValue);
  const storage: Storage = storages[options?.type ?? 'local'];

  const updateState = useCallback((setter: StateUpdate<T>) => {
    setState(prev => {
      let newValue: T;

      if (setter instanceof Function) setter = setter(prev);
      newValue = setter;

      storage.setItem(key, JSON.stringify(newValue));

      return newValue;
    });
  }, []);

  useEffect(() => {
    const savedContent = storage.getItem(key);

    if (!savedContent) return setState(initialValue);

    const updateFn = (e: StorageEvent) => {
      if (storage !== e.storageArea) return;

      try {
        setState(JSON.parse(e.newValue ?? ''));
      } catch (err) {
        storage.removeItem(key);
        setState(initialValue);
        console.error(err);
      }
    };

    const delay = options?.delay ?? undefined;
    const storageUpdateHandler = delay ? debounce(updateFn, delay) : updateFn;

    setState(JSON.parse(savedContent!));

    window.addEventListener('storage', storageUpdateHandler);

    return () => window.removeEventListener('storage', storageUpdateHandler);
  }, []);

  return [state, updateState];
};

export default useSynced;
