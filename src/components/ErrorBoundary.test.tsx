import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// A component that throws an error on render when `shouldThrow` is true
const ProblemChild: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>All good</div>;
};

describe('ErrorBoundary', () => {
  // Suppress React's error boundary console.error noise for these tests
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  test('renders default fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  test('renders custom fallback UI when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <ProblemChild shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  test('resets error state when "Try Again" is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ProblemChild shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // After clicking reset, the boundary re-renders children.
    // Provide non-throwing children on rerender to simulate recovery.
    rerender(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(screen.getByText('All good')).toBeInTheDocument();
  });
});
