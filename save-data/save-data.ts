declare namespace navigator {
  const connection: {
    downlink: number;
    effectiveType: string;
    onchange: any;
    rtt: number;
    saveData: boolean;
  };
}

let unsupported;

/**
 * Utility for adapting based on the user's browser Data Saver preferences.
 * @param initialSaveData 
 * @returns 
 */
const useSaveData = (initialSaveData = null) => {
  if (
    typeof navigator !== 'undefined' &&
    'connection' in navigator &&
    'saveData' in navigator.connection
  ) {
    unsupported = false;
  } else {
    unsupported = true;
  }

  return {
    unsupported,
    saveData: unsupported
      ? initialSaveData
      : navigator.connection.saveData === true,
  };
};

export { useSaveData };
