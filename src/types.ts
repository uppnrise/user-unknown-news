export type NewsItem = {
  link: string;
  og: string;
  title: string;
  description?: string;
  source?: string;
  publishedAt?: string;
  author?: string;
  category?: string;
};

export type NewsByCategory = {
  [category: string]: NewsItem[];
};

export type NewsListProps = {
  category: string;
  newsItems: NewsItem[];
};

export type Language = 'en' | 'de';

export type NewsSource = 'oksurfen' | 'newsapi' | 'newsdata';

export type ThemeMode = 'light' | 'dark' | 'system';
