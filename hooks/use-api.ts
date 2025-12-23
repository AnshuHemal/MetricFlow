"use client";

import { useState, useCallback } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { toast } from "sonner";
import axios from "axios";

interface UseApiOptions {
  loadingText?: string;
  successMessage?: string;
  errorMessage?: string;
  showGlobalLoading?: boolean;
}

export const useApi = <T = any>(options: UseApiOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const execute = useCallback(async (
    apiCall: () => Promise<T>,
    customOptions?: Partial<UseApiOptions>
  ) => {
    const finalOptions = { ...options, ...customOptions };
    
    try {
      setLoading(true);
      setError(null);
      
      if (finalOptions.showGlobalLoading !== false) {
        showLoading(finalOptions.loadingText);
      }

      const result = await apiCall();
      setData(result);

      if (finalOptions.successMessage) {
        toast.success(finalOptions.successMessage);
      }

      return result;
    } catch (err: unknown) {
      let errorDetails: any = {};
      let errorMsg = finalOptions.errorMessage || "An error occurred";
      
      if (axios.isAxiosError(err)) {
        errorDetails = {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          url: err.config?.url,
          method: err.config?.method
        };

        if (err.response?.status === 404) {
          errorMsg = "API endpoint not found. Please check if the server is running.";
        } else if (err.response?.status === 401) {
          errorMsg = "Unauthorized access. Please log in again.";
        } else if (err.response?.status === 500) {
          errorMsg = "Server error. Please try again later.";
        } else if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err.message) {
          errorMsg = err.message;
        }
      } else if (err instanceof Error) {
        errorDetails = {
          name: err.name,
          message: err.message,
          stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        };
        errorMsg = err.message;
      } else {
        errorDetails = { error: err };
        errorMsg = "Unknown error occurred";
      }

      console.error('API Error:', {
        error: errorDetails,
        finalOptions
      });

      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
      if (finalOptions.showGlobalLoading !== false) {
        hideLoading();
      }
    }
  }, [options, showLoading, hideLoading]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    reset
  };
};