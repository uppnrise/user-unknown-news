import React from 'react';
import { render, screen } from '@testing-library/react';
import OnlineOfflineIndicator from './OnlineOfflineIndicator';

// Mock the useOnlineStatus hook
jest.mock('../hooks/useOnlineStatus', () => ({
  useOnlineStatus: jest.fn()
}));

import { useOnlineStatus } from '../hooks/useOnlineStatus';

const mockUseOnlineStatus = useOnlineStatus as jest.MockedFunction<typeof useOnlineStatus>;

export {};  // Make this a module

describe('OnlineOfflineIndicator', () => {
  test('shows online status when connected', () => {
    mockUseOnlineStatus.mockReturnValue(true);
    
    render(<OnlineOfflineIndicator />);
    
    expect(screen.getByText('● Online')).toBeInTheDocument();
    expect(screen.getByText('● Online')).toHaveStyle({
      backgroundColor: '#4CAF50'
    });
  });

  test('shows offline status when disconnected', () => {
    mockUseOnlineStatus.mockReturnValue(false);
    
    render(<OnlineOfflineIndicator />);
    
    expect(screen.getByText('● Offline')).toBeInTheDocument();
    expect(screen.getByText('● Offline')).toHaveStyle({
      backgroundColor: '#f44336'
    });
  });

  test('has correct accessibility attributes', () => {
    mockUseOnlineStatus.mockReturnValue(true);
    
    render(<OnlineOfflineIndicator />);
    
    const indicator = screen.getByRole('status');
    expect(indicator).toHaveAttribute('aria-live', 'polite');
  });
});
