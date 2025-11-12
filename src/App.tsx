import React, {
  Suspense,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import Container from './components/Container';
import SkipLink from './components/SkipLink';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OnlineOfflineIndicator from './components/OnlineOfflineIndicator';
import PerformanceMetrics from './components/PerformanceMetrics';
import AppControls from './components/AppControls';
import SearchBar from './components/SearchBar';
import { NewsByCategory } from './types';
import { useLanguage } from './context/LanguageContext';
import { fetchNews } from './services/newsService';

// Lazy load NewsList component for better performance
const NewsList = React.lazy(() => import('./components/NewsList'));

// Defining the App component as a functional component using React.FC (Functional Component) type
const App: React.FC = () => {
  const { language, t } = useLanguage();
  const [newsData, setNewsData] = useState<NewsByCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch news data
  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNews(language);
      setNewsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('app.error'));
    } finally {
      setLoading(false);
    }
  }, [language, t]);

  // Load news on mount and language change
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // Get all categories
  const categories = useMemo(() => {
    if (!newsData) return [];
    return Object.keys(newsData);
  }, [newsData]);

  // Filter news based on search query and selected category
  const filteredNews = useMemo(() => {
    if (!newsData) return null;

    let filtered = newsData;

    // Filter by category
    if (selectedCategory) {
      filtered = {
        [selectedCategory]: newsData[selectedCategory] || [],
      };
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchFiltered: NewsByCategory = {};

      Object.keys(filtered).forEach(category => {
        const filteredItems = filtered[category].filter(
          item =>
            item.title.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.source?.toLowerCase().includes(query)
        );

        if (filteredItems.length > 0) {
          searchFiltered[category] = filteredItems;
        }
      });

      return searchFiltered;
    }

    return filtered;
  }, [newsData, searchQuery, selectedCategory]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  // The render method of the component.
  return (
    <>
      <OnlineOfflineIndicator />
      <SkipLink />
      <PWAInstallPrompt />
      <AppControls />
      {process.env.NODE_ENV === 'development' && <PerformanceMetrics />}

      <Container>
        <main id="main-content" role="main">
          <h1>{t('app.title')}</h1>

          {/* Search and Filter */}
          {!loading && !error && newsData && (
            <SearchBar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              categories={categories}
              selectedCategory={selectedCategory}
            />
          )}

          {/* Loading state */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>{t('app.loading')}</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="error-container">
              <h3>{t('app.error')}</h3>
              <p>{error}</p>
              <button onClick={loadNews}>{t('app.tryAgain')}</button>
            </div>
          )}

          {/* News content */}
          {!loading && !error && (
            <>
              {!filteredNews || Object.keys(filteredNews).length === 0 ? (
                <div className="no-news">
                  <p>{t('app.noNews')}</p>
                </div>
              ) : (
                <Suspense
                  fallback={
                    <div className="loading-spinner">{t('app.loading')}</div>
                  }
                >
                  {Object.keys(filteredNews).map(category => (
                    <NewsList
                      key={category}
                      category={category}
                      newsItems={filteredNews[category]}
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
