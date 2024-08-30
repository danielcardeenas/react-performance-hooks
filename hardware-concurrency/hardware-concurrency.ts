/**
 * Utility for adapting to the number of logical CPU processor cores on the user's device.
 * @param defaultParams 
 * @returns 
 */
const useHardwareConcurrency = (defaultParams?: {
  numberOfLogicalProcessors: number;
}) => {
  let initialHardwareConcurrency: {
    unsupported: boolean;
    numberOfLogicalProcessors: number;
  };
  if (typeof navigator !== "undefined" && "hardwareConcurrency" in navigator) {
    initialHardwareConcurrency = {
      unsupported: false,
      numberOfLogicalProcessors: navigator.hardwareConcurrency,
    };
  } else {
    initialHardwareConcurrency = {
      unsupported: true,
      numberOfLogicalProcessors: defaultParams?.numberOfLogicalProcessors ?? 1,
    };
  }

  return { ...defaultParams, ...initialHardwareConcurrency };
};

export { useHardwareConcurrency };
