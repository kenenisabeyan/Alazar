import { useState } from 'react';

/**
 * useState that persists its value to localStorage.
 *
 * @param {string} key           — localStorage key
 * @param {*}      initialValue  — default value when key is absent
 *
 * @example
 *   const [theme, setTheme] = useLocalStorage('theme', 'light');
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const toStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(toStore);
      window.localStorage.setItem(key, JSON.stringify(toStore));
    } catch (err) {
      console.warn(`[useLocalStorage] Could not set "${key}":`, err);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
