import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(localStorage.getItem(key));

  const setItem = (value: string) => {
    localStorage.setItem(key, value);
  };
  const removeItem = () => {
    localStorage.removeItem(key);
  };

  return { value, setItem, removeItem };
};

export default useLocalStorage;
