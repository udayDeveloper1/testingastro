import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update debouncedValue after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout if value or delay changes or on unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Added delay to dependencies for completeness

  return debouncedValue;
};

export default useDebounce;
