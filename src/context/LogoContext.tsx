import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LogoContextType {
  customLogoUrl: string | null;
  logoFileName: string | null;
  hasCustomLogo: boolean;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  saveCustomLogo: (dataUrl: string, fileName?: string) => void;
  removeCustomLogo: () => void;
}

const STORAGE_KEY_DATA = 'snapshots_custom_logo_data';
const STORAGE_KEY_NAME = 'snapshots_custom_logo_name';
const STORAGE_KEY_ADMIN = 'snapshots_is_admin';
const CUSTOM_EVENT_NAME = 'snapshots_logo_updated';

const LogoContext = createContext<LogoContextType>({
  customLogoUrl: null,
  logoFileName: null,
  hasCustomLogo: false,
  isAdmin: false,
  setIsAdmin: () => {},
  saveCustomLogo: () => {},
  removeCustomLogo: () => {},
});

export const LogoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [isAdmin, setIsAdminState] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check Admin status from URL params (?admin=true) or LocalStorage
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const adminParam = urlParams.get('admin');
      const storedAdmin = localStorage.getItem(STORAGE_KEY_ADMIN);

      if (adminParam === 'true' || adminParam === '1') {
        localStorage.setItem(STORAGE_KEY_ADMIN, 'true');
        setIsAdminState(true);
      } else if (storedAdmin === 'true') {
        setIsAdminState(true);
      } else {
        setIsAdminState(false);
      }
    } catch {
      setIsAdminState(false);
    }

    // 2. Load stored custom logo if any (reset any stale/invalid uploads to restore exact live logo)
    const loadStoredLogo = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY_DATA);
        const storedName = localStorage.getItem(STORAGE_KEY_NAME);

        // Always prioritize the official brand logo from the live website
        if (
          !storedData ||
          storedData === '/snapshots-logo.svg' ||
          storedData === '/snapshots-logo-dark.svg' ||
          !storedData.startsWith('data:image/')
        ) {
          localStorage.removeItem(STORAGE_KEY_DATA);
          localStorage.removeItem(STORAGE_KEY_NAME);
          setCustomLogoUrl(null);
          setLogoFileName(null);
        } else {
          setCustomLogoUrl(storedData);
          setLogoFileName(storedName || 'uploaded-logo.png');
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
      if (e.key === STORAGE_KEY_ADMIN) {
        setIsAdminState(e.newValue === 'true');
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

  const setIsAdmin = (val: boolean) => {
    setIsAdminState(val);
    try {
      if (val) {
        localStorage.setItem(STORAGE_KEY_ADMIN, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEY_ADMIN);
      }
    } catch {
      // ignore
    }
  };

  const saveCustomLogo = (dataUrl: string, fileName?: string) => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, dataUrl);
      if (fileName) {
        localStorage.setItem(STORAGE_KEY_NAME, fileName);
      }
      setCustomLogoUrl(dataUrl);
      setLogoFileName(fileName || 'custom-logo');
      window.dispatchEvent(new Event(CUSTOM_EVENT_NAME));
    } catch {
      setCustomLogoUrl(dataUrl);
      setLogoFileName(fileName || 'custom-logo');
    }
  };

  const removeCustomLogo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
      localStorage.removeItem(STORAGE_KEY_NAME);
      setCustomLogoUrl(null);
      setLogoFileName(null);
      window.dispatchEvent(new Event(CUSTOM_EVENT_NAME));
    } catch {
      setCustomLogoUrl(null);
      setLogoFileName(null);
    }
  };

  return (
    <LogoContext.Provider
      value={{
        customLogoUrl,
        logoFileName,
        hasCustomLogo: !!customLogoUrl,
        isAdmin,
        setIsAdmin,
        saveCustomLogo,
        removeCustomLogo,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => useContext(LogoContext);
