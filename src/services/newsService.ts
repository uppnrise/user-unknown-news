/**
 * News Service - Multi-source news aggregator
 * Fetches news from multiple APIs and normalizes the data
 */

import { NewsByCategory, Language } from '../types';
import { config } from '../config';

/**
 * Fetch news from ok.surf API
 */
async function fetchOkSurfNews(): Promise<NewsByCategory> {
  const response = await fetch(config.api.okSurfUrl, {
    signal: AbortSignal.timeout(config.api.timeout),
  });

  if (!response.ok) {
    throw new Error(`ok.surf API error: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Fetch news from NewsAPI.org
 */
async function fetchNewsApiNews(language: Language): Promise<NewsByCategory> {
  const { newsApiKey, newsApiUrl } = config.api;

  // If no API key, return empty result
  if (!newsApiKey) {
    return {};
  }

  const country = language === 'de' ? 'de' : 'us';
  const url = `${newsApiUrl}/top-headlines?country=${country}&apiKey=${newsApiKey}`;

  const response = await fetch(url, {
    signal: AbortSignal.timeout(config.api.timeout),
  });

  if (!response.ok) {
    throw new Error(`NewsAPI error: ${response.statusText}`);
  }

  const data = await response.json();

  // Normalize NewsAPI response to our format
  const newsByCategory: NewsByCategory = {};

  if (data.articles && Array.isArray(data.articles)) {
    // Group by category or use "Top Headlines"
    data.articles.forEach((article: any) => {
      const category = article.source?.name || 'Top Headlines';

      if (!newsByCategory[category]) {
        newsByCategory[category] = [];
      }

      newsByCategory[category].push({
        title: article.title || '',
        link: article.url || '',
        og: article.urlToImage || '',
        description: article.description || '',
        source: article.source?.name || '',
        publishedAt: article.publishedAt || '',
        author: article.author || '',
        category,
      });
    });
  }

  return newsByCategory;
}

/**
 * Fetch news from NewsData.io
 */
async function fetchNewsDataNews(language: Language): Promise<NewsByCategory> {
  const { newsDataKey, newsDataUrl } = config.api;

  // If no API key, return empty result
  if (!newsDataKey) {
    return {};
  }

  const url = `${newsDataUrl}/news?apikey=${newsDataKey}&language=${language}&country=${
    language === 'de' ? 'de' : 'us'
  }`;

  const response = await fetch(url, {
    signal: AbortSignal.timeout(config.api.timeout),
  });

  if (!response.ok) {
    throw new Error(`NewsData error: ${response.statusText}`);
  }

  const data = await response.json();

  // Normalize NewsData response to our format
  const newsByCategory: NewsByCategory = {};

  if (data.results && Array.isArray(data.results)) {
    data.results.forEach((article: any) => {
      const category = article.category?.[0] || 'General';

      if (!newsByCategory[category]) {
        newsByCategory[category] = [];
      }

      newsByCategory[category].push({
        title: article.title || '',
        link: article.link || '',
        og: article.image_url || '',
        description: article.description || '',
        source: article.source_id || '',
        publishedAt: article.pubDate || '',
        author: article.creator?.[0] || '',
        category,
      });
    });
  }

  return newsByCategory;
}

/**
 * Merge multiple news sources into one
 */
function mergeNewsSources(...sources: NewsByCategory[]): NewsByCategory {
  const merged: NewsByCategory = {};

  sources.forEach(source => {
    Object.keys(source).forEach(category => {
      if (!merged[category]) {
        merged[category] = [];
      }
      merged[category].push(...source[category]);
    });
  });

  return merged;
}

/**
 * Main function to fetch news from all available sources
 */
export async function fetchNews(
  language: Language = 'en'
): Promise<NewsByCategory> {
  try {
    // Fetch from all sources in parallel
    const results = await Promise.allSettled([
      fetchOkSurfNews(),
      config.features.enableGermanNews
        ? fetchNewsApiNews(language)
        : Promise.resolve({}),
      config.features.enableGermanNews
        ? fetchNewsDataNews(language)
        : Promise.resolve({}),
    ]);

    // Collect successful results
    const successfulSources: NewsByCategory[] = [];

    results.forEach((result, index) => {
      if (
        result.status === 'fulfilled' &&
        Object.keys(result.value).length > 0
      ) {
        successfulSources.push(result.value);
      } else if (result.status === 'rejected') {
        console.warn(`News source ${index} failed:`, result.reason);
      }
    });

    // If all sources failed, throw error
    if (successfulSources.length === 0) {
      throw new Error('All news sources failed to load');
    }

    // Merge all successful sources
    return mergeNewsSources(...successfulSources);
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

const newsService = { fetchNews };
export default newsService;
