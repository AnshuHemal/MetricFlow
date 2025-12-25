"use client";

import { createContext, useContext, useEffect, useState, ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useSearchParamsSafe } from "@/hooks/use-search-params-safe";
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

function NavigationProviderContent({ children }: NavigationProviderProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const { mounted, toString } = useSearchParamsSafe();

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, toString(), mounted]);

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
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loading variant="page" text="Initializing..." />
      </div>
    }>
      <NavigationProviderContent>
        {children}
      </NavigationProviderContent>
    </Suspense>
  );
};