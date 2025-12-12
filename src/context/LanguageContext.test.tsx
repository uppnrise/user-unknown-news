import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Test component that uses the language context
const TestComponent: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="translated">{t('app.title')}</span>
      <button onClick={() => setLanguage('de')}>Set German</button>
      <button onClick={() => setLanguage('en')}>Set English</button>
    </div>
  );
};

describe('LanguageContext', () => {
  test('provides default language values', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('translated')).toHaveTextContent('Latest News');
  });

  test('changes language when setLanguage is called', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const germanButton = screen.getByText('Set German');
    
    // Click to change to German
    fireEvent.click(germanButton);
    expect(screen.getByTestId('language')).toHaveTextContent('de');
    expect(screen.getByTestId('translated')).toHaveTextContent('Neueste Nachrichten');

    // Click to change back to English
    const englishButton = screen.getByText('Set English');
    fireEvent.click(englishButton);
    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('translated')).toHaveTextContent('Latest News');
  });

  test('throws error when useLanguage is used outside provider', () => {
    // Suppress console.error for this test
    const spy = jest.spyOn(console, 'error').mockImplementation();
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within LanguageProvider');
    
    spy.mockRestore();
  });
});
