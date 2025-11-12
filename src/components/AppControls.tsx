/**
 * AppControls - Theme and Language toggle controls
 */

import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ControlsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    gap: 8px;
  }
`;

const ControlButton = styled.button<{ $active?: boolean }>`
  background: ${props =>
    props.$active ? 'var(--primary-color)' : 'var(--control-bg)'};
  color: ${props => (props.$active ? 'white' : 'var(--text-color)')};
  border: 2px solid
    ${props => (props.$active ? 'var(--primary-color)' : 'var(--border-color)')};
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

const ThemeToggle = styled.div`
  display: flex;
  gap: 4px;
  background: var(--control-bg);
  border-radius: 12px;
  padding: 4px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ThemeButton = styled.button<{ $active?: boolean }>`
  background: ${props =>
    props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => (props.$active ? 'white' : 'var(--text-color)')};
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props =>
      props.$active ? 'var(--primary-color-dark)' : 'var(--hover-bg)'};
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 18px;
  }
`;

const AppControls: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <ControlsContainer>
      {/* Language Toggle */}
      <ControlButton
        $active={language === 'en'}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
      >
        🇬🇧 EN
      </ControlButton>
      <ControlButton
        $active={language === 'de'}
        onClick={() => setLanguage('de')}
        aria-label="Switch to German"
      >
        🇩🇪 DE
      </ControlButton>

      {/* Theme Toggle */}
      <ThemeToggle>
        <ThemeButton
          $active={theme === 'light'}
          onClick={() => setTheme('light')}
          aria-label="Light mode"
          title="Light mode"
        >
          ☀️
        </ThemeButton>
        <ThemeButton
          $active={theme === 'dark'}
          onClick={() => setTheme('dark')}
          aria-label="Dark mode"
          title="Dark mode"
        >
          🌙
        </ThemeButton>
        <ThemeButton
          $active={theme === 'system'}
          onClick={() => setTheme('system')}
          aria-label="System theme"
          title="System theme"
        >
          💻
        </ThemeButton>
      </ThemeToggle>
    </ControlsContainer>
  );
};

export default AppControls;
