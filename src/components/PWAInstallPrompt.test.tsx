import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PWAInstallPrompt from './PWAInstallPrompt';

export {};  // Make this a module

// Mock the beforeinstallprompt event
const mockPromptEvent = {
  preventDefault: jest.fn(),
  prompt: jest.fn(),
  userChoice: Promise.resolve({ outcome: 'accepted' })
};

describe('PWAInstallPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window.deferredPrompt
    delete (window as any).deferredPrompt;
  });

  test('does not render when no install prompt is available', () => {
    render(<PWAInstallPrompt />);
    const installButton = screen.queryByText('Install App');
    expect(installButton).not.toBeInTheDocument();
  });

  test('renders install button when beforeinstallprompt event is fired', () => {
    render(<PWAInstallPrompt />);
    
    // Simulate beforeinstallprompt event
    const event = new Event('beforeinstallprompt');
    Object.assign(event, mockPromptEvent);
    window.dispatchEvent(event);

    const installButton = screen.getByText('Install App');
    expect(installButton).toBeInTheDocument();
  });

  test('calls prompt when install button is clicked', async () => {
    render(<PWAInstallPrompt />);
    
    // Simulate beforeinstallprompt event
    const event = new Event('beforeinstallprompt');
    Object.assign(event, mockPromptEvent);
    (window as any).deferredPrompt = mockPromptEvent;
    window.dispatchEvent(event);

    const installButton = screen.getByText('Install App');
    fireEvent.click(installButton);

    await waitFor(() => {
      expect(mockPromptEvent.prompt).toHaveBeenCalled();
    });
  });

  test('hides install prompt when app is installed', async () => {
    render(<PWAInstallPrompt />);
    
    // Simulate beforeinstallprompt event
    const beforeEvent = new Event('beforeinstallprompt');
    Object.assign(beforeEvent, mockPromptEvent);
    window.dispatchEvent(beforeEvent);

    expect(screen.getByText('Install App')).toBeInTheDocument();

    // Simulate appinstalled event
    const installedEvent = new Event('appinstalled');
    window.dispatchEvent(installedEvent);

    await waitFor(() => {
      expect(screen.queryByText('Install App')).not.toBeInTheDocument();
    });
  });

  test('can be dismissed with close button', () => {
    render(<PWAInstallPrompt />);
    
    // Simulate beforeinstallprompt event
    const event = new Event('beforeinstallprompt');
    Object.assign(event, mockPromptEvent);
    window.dispatchEvent(event);

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Install App')).not.toBeInTheDocument();
  });
});
