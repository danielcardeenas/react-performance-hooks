type MemoryStatus = {
  deviceMemory?: number;
  totalJSHeapSize?: number | null;
  usedJSHeapSize?: number | null;
  jsHeapSizeLimit?: number | null;
};

declare namespace navigator {
  const deviceMemory: number;
}

declare namespace performance {
  const memory: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  };
}

let unsupported: boolean;
if (typeof navigator !== "undefined" && "deviceMemory" in navigator) {
  unsupported = false;
} else {
  unsupported = true;
}
let memoryStatus: MemoryStatus & { unsupported: boolean };
if (!unsupported) {
  const performanceMemory = "memory" in performance ? performance.memory : null;
  memoryStatus = {
    unsupported,
    deviceMemory: navigator.deviceMemory,
    totalJSHeapSize: performanceMemory
      ? performanceMemory.totalJSHeapSize
      : null,
    usedJSHeapSize: performanceMemory ? performanceMemory.usedJSHeapSize : null,
    jsHeapSizeLimit: performanceMemory
      ? performanceMemory.jsHeapSizeLimit
      : null,
  };
} else {
  memoryStatus = { unsupported };
}

/**
 * Utility for adapting based on the user's device memory (RAM)
 * `deviceMemory` values can be the approximate amount of device memory in gigabytes.
 * @param initialMemoryStatus
 * @returns
 */
const useMemoryStatus = (
  initialMemoryStatus?: MemoryStatus
): MemoryStatus & { unsupported: boolean } => {
  return unsupported && initialMemoryStatus
    ? { ...memoryStatus, ...initialMemoryStatus }
    : { ...memoryStatus };
};

export { useMemoryStatus };
