"use client";

import { cn } from "@/lib/utils";
import { Loader2, BarChart3, TrendingUp, Activity } from "lucide-react";

interface LoadingProps {
  variant?: "default" | "page" | "card" | "button" | "overlay";
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
}

const Loading = ({ 
  variant = "default", 
  size = "md", 
  text,
  className 
}: LoadingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg", 
    xl: "text-xl"
  };

  // Default spinner loading
  if (variant === "default") {
    return (
      <div className={cn("flex items-center justify-center space-x-2", className)}>
        <Loader2 className={cn("animate-spin text-blue-600", sizeClasses[size])} />
        {text && (
          <span className={cn("text-gray-600 font-medium", textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    );
  }

  // Full page loading with animated background
  if (variant === "page") {
    return (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          {/* Animated logo/icon area */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-center space-x-2">
                <BarChart3 className="w-8 h-8 text-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <TrendingUp className="w-8 h-8 text-green-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <Activity className="w-8 h-8 text-purple-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>

          {/* Loading text */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {text || "Loading MetricFlow"}
            </h3>
            <p className="text-gray-600">Please wait while we prepare your analytics...</p>
          </div>

          {/* Animated progress bar */}
          <div className="w-64 mx-auto">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Floating dots animation */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Card loading with skeleton effect
  if (variant === "card") {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-200 p-6 animate-pulse", className)}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="flex space-x-2">
            <div className="h-3 bg-gray-200 rounded flex-1"></div>
            <div className="h-3 bg-gray-200 rounded flex-1"></div>
          </div>
        </div>
      </div>
    );
  }

  // Button loading
  if (variant === "button") {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className={cn("animate-spin", sizeClasses[size])} />
        {text && <span className={textSizeClasses[size]}>{text}</span>}
      </div>
    );
  }

  // Overlay loading
  if (variant === "overlay") {
    return (
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
        <div className="text-center space-y-3">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          {text && (
            <p className="text-gray-600 font-medium">{text}</p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

// Skeleton components for specific use cases
export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn("bg-white rounded-lg border border-gray-200 p-4 animate-pulse", className)}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded"></div>
    </div>
    <div className="h-16 bg-gray-200 rounded mb-3"></div>
    <div className="flex justify-between">
      <div className="h-3 bg-gray-200 rounded w-20"></div>
      <div className="h-3 bg-gray-200 rounded w-12"></div>
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, className }: { rows?: number; className?: string }) => (
  <div className={cn("bg-white rounded-lg border border-gray-200 overflow-hidden", className)}>
    <div className="p-4 border-b border-gray-200 animate-pulse">
      <div className="flex space-x-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="p-4 border-b border-gray-100 animate-pulse">
        <div className="flex space-x-4">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonChart = ({ className }: { className?: string }) => (
  <div className={cn("bg-white rounded-lg border border-gray-200 p-6 animate-pulse", className)}>
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-32"></div>
        <div className="h-3 bg-gray-200 rounded w-48"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-20"></div>
    </div>
    <div className="h-64 bg-gray-200 rounded"></div>
  </div>
);

export default Loading;