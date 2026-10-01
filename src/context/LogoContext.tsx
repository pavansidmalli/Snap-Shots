import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LogoContextType {
  customLogoUrl: string | null;
  logoFileName: string | null;
  hasCustomLogo: boolean;
  saveCustomLogo: (dataUrl: string, fileName?: string) => void;
  removeCustomLogo: () => void;
}

const STORAGE_KEY_DATA = 'snapshots_custom_logo_data';
const STORAGE_KEY_NAME = 'snapshots_custom_logo_name';
const CUSTOM_EVENT_NAME = 'snapshots_logo_updated';

const LogoContext = createContext<LogoContextType>({
  customLogoUrl: null,
  logoFileName: null,
  hasCustomLogo: false,
  saveCustomLogo: () => {},
  removeCustomLogo: () => {},
});

export const LogoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);

  useEffect(() => {
    const loadStoredLogo = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY_DATA);
        const storedName = localStorage.getItem(STORAGE_KEY_NAME);
        if (storedData) {
          setCustomLogoUrl(storedData);
          setLogoFileName(storedName || 'custom-logo.png');
        } else {
          setCustomLogoUrl(null);
          setLogoFileName(null);
        }
      } catch {
        setCustomLogoUrl(null);
        setLogoFileName(null);
      }
    };

    loadStoredLogo();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_DATA || e.key === STORAGE_KEY_NAME) {
        loadStoredLogo();
      }
    };

    const handleCustomEvent = () => {
      loadStoredLogo();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);
    };
  }, []);

  const saveCustomLogo = (dataUrl: string, fileName: string = 'custom-logo.png') => {
    // Always set active in React state first
    setCustomLogoUrl(dataUrl);
    setLogoFileName(fileName);
    try {
      localStorage.setItem(STORAGE_KEY_DATA, dataUrl);
      localStorage.setItem(STORAGE_KEY_NAME, fileName);
      window.dispatchEvent(new Event(CUSTOM_EVENT_NAME));
    } catch (err) {
      console.warn('LocalStorage save failed, but logo is active in memory:', err);
    }
  };

  const removeCustomLogo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
      localStorage.removeItem(STORAGE_KEY_NAME);
      setCustomLogoUrl(null);
      setLogoFileName(null);
      window.dispatchEvent(new Event(CUSTOM_EVENT_NAME));
    } catch (err) {
      console.error('Failed to remove logo:', err);
    }
  };

  return (
    <LogoContext.Provider
      value={{
        customLogoUrl,
        logoFileName,
        hasCustomLogo: Boolean(customLogoUrl),
        saveCustomLogo,
        removeCustomLogo,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = (): LogoContextType => {
  return useContext(LogoContext);
};
