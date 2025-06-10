import styled from 'styled-components';

const Container = styled.div`
  // Flex container with column direction, center-aligned items, and justified content
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // Minimum height of the container set to 100 viewport height units
  min-height: 100vh;

  // Padding around the container
  padding: 20px;

  // Background color set to a light gray for a gentle look
  background-color: #f0f2f5;

  // Text color set to a dark gray for better readability
  color: #333;

  // Styling for h1 within the container
  h1 {
    // Font size set to 2.5rem
    font-size: 2.5rem;

    // Text color set to a darker shade
    color: #1a202c;

    // Margin added at the bottom for spacing
    margin-bottom: 1rem;
  }

  // Styling for elements with the class 'news-category'
  .news-category {
    // Width set to 100% and maximum width set to 800px
    width: 100%;
    max-width: 800px;

    // Margin added at the bottom for spacing
    margin-bottom: 2rem;

    // White background, box shadow for depth, rounded corners, and overflow hidden
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;

    h2 {
      margin-left: 12px;
    }
  }

  // Loading container styles
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1rem;
    color: #666;

    p {
      margin-top: 1rem;
      font-size: 1.1rem;
    }
  }

  // Loading spinner animation
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  // Error container styles
  .error-container {
    background: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 8px;
    padding: 2rem;
    margin: 1rem 0;
    text-align: center;
    max-width: 600px;

    h3 {
      color: #e53e3e;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;

      &:hover {
        background: #0056b3;
      }
    }
  }

  // No news message styles
  .no-news {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    color: #666;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  // Styling for elements with the class 'news-item'
  .news-item {
    // Padding around the item
    padding: 10px 15px;

    // Border at the bottom with a light gray color
    border-bottom: 1px solid #ddd;

    // Flex container with centered items and no text decoration
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.2s ease;

    // Remove the border bottom for the last child
    &:last-child {
      border-bottom: none;
    }

    // Background color change on hover
    &:hover {
      background-color: #e9ecef;
    }

    // Styling for the image within the news item
    img {
      // Set width, height, and object-fit properties
      width: 60px;
      height: 60px;
      object-fit: cover;

      // Margin on the right for spacing
      margin-right: 15px;

      // Rounded corners for the image
      border-radius: 5px;
      flex-shrink: 0;
    }

    // Styling for elements with the class 'title' within a news item
    .title {
      // Bold font weight for the title
      font-weight: bold;
      line-height: 1.4;
      font-size: 0.95rem;
    }
  }

  // Mobile responsiveness
  @media (max-width: 768px) {
    padding: 10px;

    h1 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    .news-category {
      margin-bottom: 1.5rem;
    }

    .news-item {
      padding: 12px;

      img {
        width: 50px;
        height: 50px;
        margin-right: 12px;
      }

      .title {
        font-size: 0.9rem;
      }
    }

    .loading-container,
    .error-container,
    .no-news {
      margin: 0 10px;
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.8rem;
    }

    .news-item {
      padding: 10px;

      img {
        width: 45px;
        height: 45px;
        margin-right: 10px;
      }

      .title {
        font-size: 0.85rem;
      }
    }
  }
`;

// Export the 'Container' styled component
export default Container;
