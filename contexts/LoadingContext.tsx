"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Loading from "@/components/ui/loading";

interface LoadingContextType {
  isLoading: boolean;
  loadingText?: string;
  showLoading: (text?: string) => void;
  hideLoading: () => void;
  setLoadingText: (text: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string>();

  const showLoading = (text?: string) => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingText(undefined);
  };

  const updateLoadingText = (text: string) => {
    setLoadingText(text);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingText,
        showLoading,
        hideLoading,
        setLoadingText: updateLoadingText,
      }}
    >
      {children}
      {isLoading && (
        <Loading 
          variant="page" 
          text={loadingText}
        />
      )}
    </LoadingContext.Provider>
  );
};