import React, { useState } from 'react';
import styled from 'styled-components';
import { NewsItem } from '../types';

// Styled component for the wrapper around the show more/less button
const NewsItemWrapper = styled.div`
  .toggle-show {
    padding: 10px; // Padding for the button
    text-align: center; // Centers the text inside the button
    cursor: pointer; // Changes cursor to pointer to indicate it's clickable
    color: #007bff; // Sets the text color of the button
  }
`;

// TypeScript type definition for the component's props
type NewsListProps = {
  category: string; // The category of news
  newsItems: NewsItem[]; // Array of news items
};

// Functional component declaration with destructured props
const NewsList: React.FC<NewsListProps> = ({ category, newsItems }) => {
  // useState hook to manage whether all news items are shown
  const [showAll, setShowAll] = useState(false);

  // Logic to display all news items or only the first three
  const displayedNewsItems = showAll ? newsItems : newsItems.slice(0, 3);

  // Component's JSX rendering logic
  return (
    <div className="news-category">
      <h2>{category}</h2>
      {displayedNewsItems.map((item, index) => (
        // Mapping over and rendering each displayed news item
        <a key={index} href={item.link} className="news-item">
          <img src={item.og} alt={item.title} />
          <div className="title">{item.title}</div>
        </a>
      ))}
      {newsItems.length > 3 && ( // Conditionally render the toggle button
        <NewsItemWrapper>
          {showAll ? (
            // Button to show less items
            <div className="toggle-show" onClick={() => setShowAll(false)}>
              Show Less
            </div>
          ) : (
            // Button to show more items
            <div className="toggle-show" onClick={() => setShowAll(true)}>
              Show More
            </div>
          )}
        </NewsItemWrapper>
      )}
    </div>
  );
};

// Exporting the NewsList component
export default NewsList;
