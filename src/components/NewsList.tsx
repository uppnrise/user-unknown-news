import React, { useState, useCallback, memo } from 'react';
import styled from 'styled-components';
import { NewsItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

// Styled component for the wrapper around the show more/less button
const NewsItemWrapper = styled.div`
  .toggle-show {
    padding: 10px;
    text-align: center;
    cursor: pointer;
    color: var(--primary-color);
    transition: all 0.2s ease;
    font-weight: 500;
    border-radius: 8px;

    &:hover {
      background-color: var(--hover-bg);
    }
  }

  .image-placeholder {
    width: 80px;
    height: 80px;
    background-color: var(--bg-secondary);
    border: 2px dashed var(--border-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    span {
      font-size: 32px;
      opacity: 0.6;
    }
  }

  @media (max-width: 768px) {
    .image-placeholder {
      width: 60px;
      height: 60px;

      span {
        font-size: 24px;
      }
    }
  }
`;

// TypeScript type definition for the component's props
type NewsListProps = {
  category: string;
  newsItems: NewsItem[];
};

// Functional component declaration with destructured props
const NewsList = memo<NewsListProps>(({ category, newsItems }) => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Handle image load errors with useCallback for performance
  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  }, []);

  // Toggle show all with useCallback
  const handleToggleShowAll = useCallback(() => {
    setShowAll(prev => !prev);
  }, []);

  // Logic to display all news items or only the first three
  const displayedNewsItems = showAll ? newsItems : newsItems.slice(0, 3);

  // Component's JSX rendering logic
  return (
    <div className="news-category">
      <h2>{category}</h2>
      {displayedNewsItems.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="news-item"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t('news.readMore')} ${item.title}`}
        >
          {!imageErrors.has(index) && item.og ? (
            <img
              src={item.og}
              alt={item.title}
              onError={() => handleImageError(index)}
              loading="lazy"
            />
          ) : (
            <NewsItemWrapper>
              <div className="image-placeholder">
                <span>📰</span>
              </div>
            </NewsItemWrapper>
          )}
          <div className="title">{item.title}</div>
        </a>
      ))}
      {newsItems.length > 3 && (
        <NewsItemWrapper>
          {showAll ? (
            <div
              className="toggle-show"
              onClick={handleToggleShowAll}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleToggleShowAll()}
              aria-label={`Show fewer ${category} news items`}
            >
              {t('news.showLess')}
            </div>
          ) : (
            <div
              className="toggle-show"
              onClick={handleToggleShowAll}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleToggleShowAll()}
              aria-label={`Show more ${category} news items`}
            >
              {t('news.showMore')} ({newsItems.length - 3} more)
            </div>
          )}
        </NewsItemWrapper>
      )}
    </div>
  );
});

// Add display name for debugging
NewsList.displayName = 'NewsList';

// Exporting the NewsList component
export default NewsList;
