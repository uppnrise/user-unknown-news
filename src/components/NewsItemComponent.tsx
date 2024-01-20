// src/components/NewsItemComponent.tsx
import React from 'react';
import { NewsItem } from '../types';

interface NewsItemComponentProps {
  item: NewsItem;
}

const NewsItemComponent: React.FC<NewsItemComponentProps> = ({ item }) => (
  <div>
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      <h3>{item.title}</h3>
      {item.og && <img src={item.og} alt={item.title} />}
    </a>
  </div>
);

export default NewsItemComponent;
