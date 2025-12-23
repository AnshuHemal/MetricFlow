"use client";

import Link, { LinkProps } from "next/link";
import { useNavigation } from "@/contexts/NavigationContext";
import { ReactNode, MouseEvent } from "react";

interface LoadingLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  loadingText?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const LoadingLink = ({ 
  children, 
  className, 
  loadingText = "Loading page...",
  onClick,
  ...props 
}: LoadingLinkProps) => {
  const { setNavigating } = useNavigation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Don't show loading for external links or if default prevented
    if (e.defaultPrevented) return;
    
    const href = props.href.toString();
    
    // Don't show loading for external links, anchors, or same page
    if (
      href.startsWith('http') || 
      href.startsWith('mailto:') || 
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) {
      return;
    }

    // Show loading for internal navigation
    setNavigating(true);
  };

  return (
    <Link {...props} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};