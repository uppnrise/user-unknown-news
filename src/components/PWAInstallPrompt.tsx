import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InstallPromptContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #007bff;
  color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 300px;

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }

  .install-content {
    margin-bottom: 12px;

    h4 {
      margin: 0 0 8px 0;
      font-size: 16px;
    }

    p {
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    }
  }

  .install-buttons {
    display: flex;
    gap: 8px;

    button {
      flex: 1;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;

      &.install {
        background: white;
        color: #007bff;

        &:hover {
          background: #f8f9fa;
        }
      }

      &.dismiss {
        background: transparent;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
`;

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismissClick = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);

    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already dismissed in this session
  if (sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  if (!showInstallPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <InstallPromptContainer>
      <div className="install-content">
        <h4>📱 Install App</h4>
        <p>
          Install User Unknown's News for a better experience and offline
          access!
        </p>
      </div>
      <div className="install-buttons">
        <button className="install" onClick={handleInstallClick}>
          Install
        </button>
        <button className="dismiss" onClick={handleDismissClick}>
          Not Now
        </button>
      </div>
    </InstallPromptContainer>
  );
};

export default PWAInstallPrompt;
