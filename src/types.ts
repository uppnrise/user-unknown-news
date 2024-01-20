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
