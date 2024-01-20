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
    }

    // Styling for elements with the class 'title' within a news item
    .title {
      // Bold font weight for the title
      font-weight: bold;
    }
  }
`;

// Export the 'Container' styled component
export default Container;