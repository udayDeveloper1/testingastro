import { useEffect, useState } from "react";

export function useLocalStorageValue(key, parse = false) {
  const getInitialValue = () => {
    const stored = localStorage.getItem(key);
    return parse && stored ? JSON.parse(stored) : stored;
  };

  const [value, setValue] = useState(getInitialValue);

  // Manual setter that syncs localStorage and state
  const updateValue = (newVal) => {
    const stringified = typeof newVal === "string" ? newVal : JSON.stringify(newVal);
    localStorage.setItem(key, stringified);

    // ✅ update local state manually (works in same tab)
    setValue(newVal);

    // ✅ trigger storage event manually (simulate cross-tab)
    window.dispatchEvent(
      new StorageEvent("storage", { key, newValue: stringified })
    );
  };

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === key) {
        const newVal = parse && e.newValue ? JSON.parse(e.newValue) : e.newValue;
        setValue(newVal);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, parse]);

  return [value, updateValue];
}
