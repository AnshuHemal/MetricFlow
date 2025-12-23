"use client";

import { useRouter } from "next/navigation";
import { useNavigation } from "@/contexts/NavigationContext";

export const useLoadingRouter = () => {
  const router = useRouter();
  const { setNavigating } = useNavigation();

  const push = (href: string, options?: { scroll?: boolean }) => {
    setNavigating(true);
    router.push(href, options);
  };

  const replace = (href: string, options?: { scroll?: boolean }) => {
    setNavigating(true);
    router.replace(href, options);
  };

  const back = () => {
    setNavigating(true);
    router.back();
  };

  const forward = () => {
    setNavigating(true);
    router.forward();
  };

  const refresh = () => {
    setNavigating(true);
    router.refresh();
  };

  return {
    push,
    replace,
    back,
    forward,
    refresh,
    // Keep original methods available if needed
    router
  };
};