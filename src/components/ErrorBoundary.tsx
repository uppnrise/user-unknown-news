import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

// Styled components for error boundary
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f8f9fa;
  text-align: center;
`;

const ErrorContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;

  h2 {
    color: #e53e3e;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;

    &:hover {
      background: #0056b3;
    }
  }

  details {
    margin-top: 1rem;
    text-align: left;

    summary {
      cursor: pointer;
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    pre {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      padding: 1rem;
      overflow-x: auto;
      font-size: 0.8rem;
      color: #666;
    }
  }
`;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // You can also log the error to an error reporting service here
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <ErrorContainer>
          <ErrorContent>
            <h2>🚨 Something went wrong</h2>
            <p>
              We're sorry, but something unexpected happened. Please try
              refreshing the page or contact support if the problem persists.
            </p>
            <button onClick={this.handleReset}>Try Again</button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details>
                <summary>Error Details (Development Only)</summary>
                <pre>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </ErrorContent>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
