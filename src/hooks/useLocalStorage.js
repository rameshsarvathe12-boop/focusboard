import { useState } from 'react';

/**
 * Custom hook for browser localStorage with React state synchronisation.
 * On mount: reads from localStorage; falls back to initialValue if key is absent.
 * On update: serialises value to JSON and writes to localStorage automatically.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - Default value when key is absent
 * @returns {[*, Function]} Tuple of [storedValue, setValue]
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`[useLocalStorage] Error writing key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
