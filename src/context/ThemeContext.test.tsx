import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { act } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';

// Test component that uses the theme context
const TestComponent: React.FC = () => {
  const { theme, effectiveTheme, setTheme } = useTheme();
  
  const handleToggle = () => {
    // Cycle through themes: system -> light -> dark -> system
    const nextTheme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    setTheme(nextTheme);
  };
  
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="effective-theme">{effectiveTheme}</span>
      <button onClick={handleToggle}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  test('provides default theme values', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('system');
    expect(screen.getByTestId('effective-theme')).toHaveTextContent('light');
  });

  test('toggles theme when button is clicked', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle');
    
    // Initial state
    expect(screen.getByTestId('theme')).toHaveTextContent('system');

    // Click once - should cycle to light
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(screen.getByTestId('theme')).toHaveTextContent('light');

    // Click again - should cycle to dark
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    // Click again - should cycle back to system
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(screen.getByTestId('theme')).toHaveTextContent('system');
  });

  test('throws error when useTheme is used outside provider', () => {
    // Suppress console.error for this test
    const spy = jest.spyOn(console, 'error').mockImplementation();
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within ThemeProvider');
    
    spy.mockRestore();
  });
});
