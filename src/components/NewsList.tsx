import React, { useState, useCallback, memo } from 'react';
import styled from 'styled-components';
import { NewsItem } from '../types';

// Styled component for the wrapper around the show more/less button
const NewsItemWrapper = styled.div`
  .toggle-show {
    padding: 10px; // Padding for the button
    text-align: center; // Centers the text inside the button
    cursor: pointer; // Changes cursor to pointer to indicate it's clickable
    color: #007bff; // Sets the text color of the button
    transition: color 0.2s ease;
    font-weight: 500;

    &:hover {
      color: #0056b3;
      background-color: #f8f9fa;
    }
  }

  .image-placeholder {
    width: 60px;
    height: 60px;
    background-color: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;

    span {
      font-size: 24px;
      opacity: 0.6;
    }
  }
`;

// TypeScript type definition for the component's props
type NewsListProps = {
  category: string; // The category of news
  newsItems: NewsItem[]; // Array of news items
};

// Functional component declaration with destructured props
const NewsList = memo<NewsListProps>(({ category, newsItems }) => {
  // useState hook to manage whether all news items are shown
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
        // Mapping over and rendering each displayed news item
        <a
          key={index}
          href={item.link}
          className="news-item"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read more about: ${item.title}`}
        >
          {!imageErrors.has(index) ? (
            <img
              src={item.og}
              alt={item.title}
              onError={() => handleImageError(index)}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder">
              <span>📰</span>
            </div>
          )}
          <div className="title">{item.title}</div>
        </a>
      ))}
      {newsItems.length > 3 && ( // Conditionally render the toggle button
        <NewsItemWrapper>
          {showAll ? (
            // Button to show less items
            <div
              className="toggle-show"
              onClick={handleToggleShowAll}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleToggleShowAll()}
              aria-label={`Show fewer ${category} news items`}
            >
              Show Less
            </div>
          ) : (
            // Button to show more items
            <div
              className="toggle-show"
              onClick={handleToggleShowAll}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleToggleShowAll()}
              aria-label={`Show more ${category} news items`}
            >
              Show More ({newsItems.length - 3} more)
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
