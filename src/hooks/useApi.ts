import { useState, useEffect, useCallback, useRef } from 'react';
import { config } from '../config';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface FetchOptions {
  retry?: boolean;
  retryCount?: number;
  timeout?: number;
  cacheKey?: string;
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

/**
 * Custom hook for API data fetching with retry logic, error handling, and caching
 */
export function useApi<T>(
  url: string,
  options: FetchOptions = {}
): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const {
    retry = true,
    retryCount = config.api.maxRetries,
    timeout = config.api.timeout,
    cacheKey = url,
  } = options;

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Check cache first
    const cached = cache.get(cacheKey);
    if (
      cached &&
      Date.now() - cached.timestamp < config.performance.cacheDuration
    ) {
      setState({ data: cached.data, loading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    let lastError: Error | null = null;
    let attempts = 0;

    while (attempts <= retryCount) {
      try {
        abortControllerRef.current = new AbortController();
        const timeoutId = setTimeout(
          () => abortControllerRef.current?.abort(),
          timeout
        );

        const response = await fetch(url, {
          signal: abortControllerRef.current.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Cache the response
        cache.set(cacheKey, { data, timestamp: Date.now() });

        setState({ data, loading: false, error: null });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return; // Request was cancelled, don't update state
        }

        lastError = error instanceof Error ? error : new Error('Unknown error');
        attempts++;

        if (!retry || attempts > retryCount) {
          break;
        }

        // Exponential backoff delay
        const delay = Math.min(1000 * Math.pow(2, attempts - 1), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    setState({
      data: null,
      loading: false,
      error: lastError?.message || 'Failed to fetch data',
    });
  }, [url, retry, retryCount, timeout, cacheKey]);

  const refetch = useCallback(() => {
    // Clear cache for this key
    cache.delete(cacheKey);
    fetchData();
  }, [fetchData, cacheKey]);

  useEffect(() => {
    fetchData();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    ...state,
    refetch,
  };
}

export default useApi;
