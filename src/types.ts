export type NewsItem = {
  link: string;
  og: string;
  title: string;
};

export type NewsByCategory = {
  [category: string]: NewsItem[];
};

export type NewsListProps = {
  category: string;
  newsItems: NewsItem[];
};

// App language types
export type Language = 'en' | 'de';

// Theme mode types
export type ThemeMode = 'light' | 'dark' | 'system';
