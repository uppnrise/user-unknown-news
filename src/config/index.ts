/**
 * Configuration service for environment variables and app settings
 */

export const config = {
  // API Configuration
  api: {
    // Original ok.surf API
    okSurfUrl:
      process.env.REACT_APP_NEWS_API_URL ||
      'https://ok.surf/api/v1/cors/news-feed',

    // NewsAPI.org - supports German news
    newsApiUrl: 'https://newsapi.org/v2',
    newsApiKey: process.env.REACT_APP_NEWSAPI_KEY || '',

    // NewsData.io - supports German news
    newsDataUrl: 'https://newsdata.io/api/1',
    newsDataKey: process.env.REACT_APP_NEWSDATA_KEY || '',

    timeout: 10000, // 10 seconds
    maxRetries: parseInt(process.env.REACT_APP_MAX_RETRIES || '3', 10),
  },

  // App Configuration
  app: {
    name: process.env.REACT_APP_NAME || "User Unknown's News",
    version: process.env.REACT_APP_VERSION || '2.0.0',
    defaultLanguage: (process.env.REACT_APP_DEFAULT_LANGUAGE || 'en') as
      | 'en'
      | 'de',
  },

  // Performance Configuration
  performance: {
    cacheDuration: parseInt(
      process.env.REACT_APP_CACHE_DURATION || '300000',
      10
    ), // 5 minutes
    debounceDelay: 300,
  },

  // Feature Flags
  features: {
    enableOfflineMode: true,
    enableDarkMode: true,
    enableAnalytics: false,
    enableGermanNews: true,
    enableSearch: true,
    enableFiltering: true,
  },
} as const;

export default config;
