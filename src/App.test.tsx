import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks for your tests
fetchMock.enableMocks();

beforeEach(() => {
  // Reset the mocks before each test
  fetchMock.resetMocks();
});

describe('App Component', () => {
  test('renders the heading', () => {
    render(<App />);
    expect(screen.getByText('Latest News')).toBeInTheDocument();
  });

  test('fetches news data and displays news items', async () => {
    // Mock the fetch response
    const mockNewsData = {
      technology: [{ id: 1, title: 'Tech News Item' }],
      sports: [{ id: 2, title: 'Sports News Item' }]
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockNewsData));

    render(<App />);

    // Wait for the effect to run and the state to update
    await waitFor(() => {
      expect(screen.getByText('Tech News Item')).toBeInTheDocument();
      expect(screen.getByText('Sports News Item')).toBeInTheDocument();
    });
  });
});
