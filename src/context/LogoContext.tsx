import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logoConfig } from '../config/logoConfig';

interface LogoContextType {
  customLogoUrl: string | null;
  logoFileName: string | null;
  isUploadModalOpen: boolean;
  openUploadModal: () => void;
  closeUploadModal: () => void;
  saveCustomLogo: (dataUrl: string, fileName?: string) => void;
  resetLogoToDefault: () => void;
  hasCustomLogo: boolean;
}

const STORAGE_KEY_DATA = 'snapshots_custom_logo_data';
const STORAGE_KEY_NAME = 'snapshots_custom_logo_name';
const CUSTOM_EVENT_NAME = 'snapshots_logo_updated';

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Initialize from localStorage or static configuration
  useEffect(() => {
    const loadStoredLogo = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY_DATA);
        const storedName = localStorage.getItem(STORAGE_KEY_NAME);

        if (storedData) {
          setCustomLogoUrl(storedData);
          setLogoFileName(storedName || 'uploaded-logo');
          return;
        }

        // If no browser-uploaded logo exists, check static path
        if (logoConfig.staticLogoPath && logoConfig.staticLogoPath.trim() !== '') {
          setCustomLogoUrl(logoConfig.staticLogoPath.trim());
          setLogoFileName('static-logo');
          return;
        }

        setCustomLogoUrl(null);
        setLogoFileName(null);
      } catch (err) {
        console.warn('Failed to read logo from localStorage:', err);
      }
    };

    loadStoredLogo();

    // Listen for cross-tab or same-window changes
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

  const saveCustomLogo = (dataUrl: string, fileName: string = 'custom-logo') => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, dataUrl);
      localStorage.setItem(STORAGE_KEY_NAME, fileName);
      setCustomLogoUrl(dataUrl);
      setLogoFileName(fileName);

      // Dispatch event for any other listeners
      window.dispatchEvent(new Event(CUSTOM_EVENT_NAME));
    } catch (err) {
      console.error('Failed to persist logo in localStorage:', err);
    }
  };

  const resetLogoToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
      localStorage.removeItem(STORAGE_KEY_NAME);

      if (logoConfig.staticLogoPath && logoConfig.staticLogoPath.trim() !== '') {
        setCustomLogoUrl(logoConfig.staticLogoPath.trim());
        setLogoFileName('static-logo');
      } else {
        setCustomLogoUrl(null);
        setLogoFileName(null);
      }

      window.dispatchEvent(new Event(CUSTOM_EVENT_NAME));
    } catch (err) {
      console.error('Failed to reset logo in localStorage:', err);
    }
  };

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  return (
    <LogoContext.Provider
      value={{
        customLogoUrl,
        logoFileName,
        isUploadModalOpen,
        openUploadModal,
        closeUploadModal,
        saveCustomLogo,
        resetLogoToDefault,
        hasCustomLogo: Boolean(customLogoUrl),
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = (): LogoContextType => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};
