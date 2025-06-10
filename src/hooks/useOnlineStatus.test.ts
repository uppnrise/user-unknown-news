import { renderHook, act } from '@testing-library/react';
import { useOnlineStatus } from './useOnlineStatus';

export {};  // Make this a module

describe('useOnlineStatus', () => {
  test('returns initial online status', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true
    });

    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
  });

  test('returns offline status when navigator is offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(false);
  });

  test('updates status when online event is fired', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      });
      
      const onlineEvent = new Event('online');
      window.dispatchEvent(onlineEvent);
    });

    expect(result.current).toBe(true);
  });

  test('updates status when offline event is fired', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true
    });

    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);

    act(() => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });
      
      const offlineEvent = new Event('offline');
      window.dispatchEvent(offlineEvent);
    });

    expect(result.current).toBe(false);
  });
});