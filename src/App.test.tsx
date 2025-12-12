import { render } from '@testing-library/react';
import { waitFor, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from './App';
import fetchMock from 'jest-fetch-mock';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

// Enable fetch mocks for your tests
fetchMock.enableMocks();

beforeEach(() => {
  // Reset the mocks before each test
  fetchMock.resetMocks();
});

describe('App Component', () => {
  test('renders the heading', () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('Latest News')).toBeInTheDocument();
  });

  test('renders without crashing and shows app controls', () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    );

    // Check that the app renders basic UI elements
    expect(screen.getByText('Latest News')).toBeInTheDocument();
    
    // Should render skip link
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });
});
