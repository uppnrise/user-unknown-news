import React from 'react';
import styled from 'styled-components';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const OfflineIndicator = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #ff6b6b;
  color: white;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  z-index: 1001;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;

  &.offline {
    transform: translateY(0);
  }

  .offline-icon {
    margin-right: 8px;
  }
`;

const OnlineOfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <OfflineIndicator className={!isOnline ? 'offline' : ''}>
      <span className="offline-icon">📶</span>
      You are currently offline. Some features may not be available.
    </OfflineIndicator>
  );
};

export default OnlineOfflineIndicator;
