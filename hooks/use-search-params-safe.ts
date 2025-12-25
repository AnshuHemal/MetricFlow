"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * A safe wrapper around useSearchParams that handles SSR properly
 * This hook ensures that search params are only accessed on the client side
 */
export function useSearchParamsSafe() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeGet = (key: string): string | null => {
    if (!mounted) return null;
    return searchParams.get(key);
  };

  const safeGetAll = (key: string): string[] => {
    if (!mounted) return [];
    return searchParams.getAll(key);
  };

  const safeHas = (key: string): boolean => {
    if (!mounted) return false;
    return searchParams.has(key);
  };

  const safeToString = (): string => {
    if (!mounted) return "";
    return searchParams.toString();
  };

  return {
    mounted,
    get: safeGet,
    getAll: safeGetAll,
    has: safeHas,
    toString: safeToString,
    // For compatibility with existing code
    searchParams: mounted ? searchParams : null,
  };
}