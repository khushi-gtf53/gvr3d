import { useEffect, useState } from "react";

export function useBreakpointValue(values) {
  const [value, setValue] = useState(values.base);

  useEffect(() => {
    const updateValue = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setValue(values.sm ?? values.base); // mobile
      } else if (width < 1024) {
        setValue(values.md ?? values.base); // tablet
      } else {
        setValue(values.lg ?? values.base); // desktop
      }
    };

    updateValue();
    window.addEventListener("resize", updateValue);
    return () => window.removeEventListener("resize", updateValue);
  }, [values]);

  return value;
}
