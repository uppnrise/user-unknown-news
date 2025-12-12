/**
 * Configuration service for environment variables and app settings
 */

export const config = {
  // API Configuration
  api: {
    newsUrl:
      process.env.REACT_APP_NEWS_API_URL ||
      'https://ok.surf/api/v1/cors/news-feed',
    timeout: 10000, // 10 seconds
    maxRetries: parseInt(process.env.REACT_APP_MAX_RETRIES || '3', 10),
  },

  // App Configuration
  app: {
    name: process.env.REACT_APP_NAME || "User Unknown's News",
    version: process.env.REACT_APP_VERSION || '1.0.0',
    defaultLanguage: 'en' as const,
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
    enableOfflineMode: false,
    enableDarkMode: false,
    enableAnalytics: false,
  },
} as const;

export default config;
