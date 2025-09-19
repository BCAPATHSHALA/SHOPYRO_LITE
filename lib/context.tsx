"use client";

import { createContext, useContext, ReactNode } from "react";

type WebsyroContextType = {
  isWebsyro: boolean;
};

const WebsyroContext = createContext<WebsyroContextType | undefined>(undefined);

type WebsyroProviderProps = {
  children: ReactNode;
  isWebsyro: boolean;
};

export const WebsyroProvider = ({
  children,
  isWebsyro,
}: WebsyroProviderProps) => {
  return (
    <WebsyroContext.Provider value={{ isWebsyro }}>
      {children}
    </WebsyroContext.Provider>
  );
};

export const useIsWebsyro = (): boolean => {
  const context = useContext(WebsyroContext);
  if (context === undefined) {
    throw new Error("useIsWebsyro must be used within a WebsyroProvider");
  }
  return context.isWebsyro;
};
