import React, { createContext, useContext, ReactNode } from 'react';

interface LogoContextType {
  customLogoUrl: string | null;
  hasCustomLogo: boolean;
}

const LogoContext = createContext<LogoContextType>({
  customLogoUrl: null,
  hasCustomLogo: false,
});

export const LogoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LogoContext.Provider
      value={{
        customLogoUrl: null,
        hasCustomLogo: false,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => useContext(LogoContext);
