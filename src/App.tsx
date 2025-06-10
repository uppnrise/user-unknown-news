import React, { Suspense } from 'react';
import Container from './components/Container';
import SkipLink from './components/SkipLink';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OnlineOfflineIndicator from './components/OnlineOfflineIndicator';
import PerformanceMetrics from './components/PerformanceMetrics';
import { NewsItem } from './types';
import { config } from './config';
import { useApi } from './hooks/useApi';

// Lazy load NewsList component for better performance
const NewsList = React.lazy(() => import('./components/NewsList'));

// Defining the App component as a functional component using React.FC (Functional Component) type
const App: React.FC = () => {
  // Using the custom useApi hook for data fetching with retry logic and error handling
  const {
    data: newsData,
    loading,
    error,
    refetch,
  } = useApi<Record<string, NewsItem[]>>(config.api.newsUrl);

  // The render method of the component.
  return (
    <>
      <OnlineOfflineIndicator />
      <SkipLink />
      <PWAInstallPrompt />
      {process.env.NODE_ENV === 'development' && <PerformanceMetrics />}
      {/* Using the Container component to wrap the content. */}
      <Container>
        <main id="main-content" role="main">
          {/* // Displaying a heading */}
          <h1>Latest News</h1>

          {/* Loading state */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading latest news...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="error-container">
              <h3>Failed to load news</h3>
              <p>{error}</p>
              <button onClick={refetch}>Try Again</button>
            </div>
          )}

          {/* News content */}
          {!loading && !error && (
            <>
              {!newsData || Object.keys(newsData).length === 0 ? (
                <div className="no-news">
                  <p>No news available at the moment.</p>
                </div>
              ) : (
                // Wrapping NewsList rendering in React Suspense for lazy loading
                <Suspense
                  fallback={
                    <div className="loading-spinner">
                      Loading news categories...
                    </div>
                  }
                >
                  {Object.keys(newsData).map(category => (
                    // Rendering the NewsList component for each news category.
                    // The 'key' prop is necessary for React to handle list rendering efficiently.
                    <NewsList
                      key={category}
                      category={category}
                      newsItems={newsData[category]}
                    />
                  ))}
                </Suspense>
              )}
            </>
          )}
        </main>
      </Container>
    </>
  );
};

// Exporting the App component for use in other parts of the application.
export default App;
