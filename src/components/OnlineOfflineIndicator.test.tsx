import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import OnlineOfflineIndicator from './OnlineOfflineIndicator';
import { LanguageProvider } from '../context/LanguageContext';

// Mock the useOnlineStatus hook
jest.mock('../hooks/useOnlineStatus', () => ({
  useOnlineStatus: jest.fn(),
}));

import { useOnlineStatus } from '../hooks/useOnlineStatus';

const mockUseOnlineStatus = useOnlineStatus as jest.MockedFunction<
  typeof useOnlineStatus
>;

export {}; // Make this a module

describe('OnlineOfflineIndicator', () => {
  test('renders but hidden when online', () => {
    mockUseOnlineStatus.mockReturnValue(true);

    render(
      <LanguageProvider>
        <OnlineOfflineIndicator />
      </LanguageProvider>
    );

    // Component renders but without offline class when online
    const indicator = screen.getByRole('status');
    expect(indicator).toBeInTheDocument();
    expect(indicator).not.toHaveClass('offline');
  });

  test('shows offline status when disconnected', () => {
    mockUseOnlineStatus.mockReturnValue(false);

    render(
      <LanguageProvider>
        <OnlineOfflineIndicator />
      </LanguageProvider>
    );

    expect(screen.getByText(/You are currently offline/)).toBeInTheDocument();
    expect(screen.getByText('📶')).toBeInTheDocument();
  });

  test('has correct accessibility attributes when offline', () => {
    mockUseOnlineStatus.mockReturnValue(false);

    render(
      <LanguageProvider>
        <OnlineOfflineIndicator />
      </LanguageProvider>
    );

    const indicator = screen.getByRole('status');
    expect(indicator).toHaveAttribute('aria-live', 'polite');
  });
});
