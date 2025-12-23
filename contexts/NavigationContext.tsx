"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/ui/loading";

interface NavigationContextType {
  isNavigating: boolean;
  setNavigating: (navigating: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Hide loading when route changes complete
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  const setNavigating = (navigating: boolean) => {
    setIsNavigating(navigating);
  };

  return (
    <NavigationContext.Provider
      value={{
        isNavigating,
        setNavigating,
      }}
    >
      {children}
      {isNavigating && (
        <Loading 
          variant="page" 
          text="Loading..."
        />
      )}
    </NavigationContext.Provider>
  );
};