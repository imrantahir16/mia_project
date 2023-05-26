import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
  // If we are using it in Next.js SSR
  if (typeof window === "undefined") return initValue;

  // if a value is already store in LocalStorage
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // if initial value is a function then return result of the function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
