import { renderHook, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { useApi } from './useApi';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest.useRealTimers();
});

describe('useApi', () => {
  test('fetches data successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ hello: 'world' }));

    const { result } = renderHook(() =>
      useApi<{ hello: string }>('https://example.com/api', {
        cacheKey: 'success-test',
      })
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual({ hello: 'world' });
    expect(result.current.error).toBeNull();
  });

  test('sets an error when the response is not ok', async () => {
    fetchMock.mockResponseOnce('', { status: 500 });

    const { result } = renderHook(() =>
      useApi('https://example.com/api', {
        retry: false,
        cacheKey: 'error-test',
      })
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toContain('500');
  });

  test('retries the configured number of times before failing', async () => {
    fetchMock.mockReject(new Error('network error'));

    const { result } = renderHook(() =>
      useApi('https://example.com/api', {
        retry: true,
        retryCount: 2,
        cacheKey: 'retry-test',
      })
    );

    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 10000,
    });

    // Initial attempt + 2 retries = 3 calls
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(result.current.error).toBe('network error');
  }, 15000);

  test('serves cached data on subsequent calls with the same cache key', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ cached: true }));

    const { result, unmount } = renderHook(() =>
      useApi<{ cached: boolean }>('https://example.com/api', {
        cacheKey: 'cache-test',
      })
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ cached: true });
    unmount();

    fetchMock.resetMocks();

    const { result: result2 } = renderHook(() =>
      useApi<{ cached: boolean }>('https://example.com/api', {
        cacheKey: 'cache-test',
      })
    );

    await waitFor(() => expect(result2.current.loading).toBe(false));
    expect(result2.current.data).toEqual({ cached: true });
    // No new fetch call should have been made since data was cached
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('refetch clears the cache and requests fresh data', async () => {
    fetchMock.mockResponses(
      [JSON.stringify({ value: 1 }), { status: 200 }],
      [JSON.stringify({ value: 2 }), { status: 200 }]
    );

    const { result } = renderHook(() =>
      useApi<{ value: number }>('https://example.com/api', {
        cacheKey: 'refetch-test',
      })
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ value: 1 });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.data).toEqual({ value: 2 }));
  });
});
