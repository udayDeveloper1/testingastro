import { useEffect, useState } from 'react';

export const useInitialScreenSizeCategory = () => {
  const [screenCategory, setScreenCategory] = useState(() => {
    const width = window.innerWidth;
    return width > 412 ? 'above-412' : '412-or-below';
  });

  useEffect(() => {
    // Only runs once on mount
    const width = window.innerWidth;
    const category = width > 412 ? 'above-412' : '412-or-below';
    setScreenCategory(category);
  }, []);

  return screenCategory;
};
