import React, { useEffect, useState } from 'react';
import Container from './components/Container';
import NewsList from './components/NewsList';
import { NewsItem } from './types';

// Defining the App component as a functional component using React.FC (Functional Component) type
const App: React.FC = () => {
  // State hook for managing news data. It's initialized as an empty object.
  // The state will eventually hold a record where each key is a string and its value is an array of NewsItem objects.
  const [newsData, setNewsData] = useState<Record<string, NewsItem[]>>({});

  // useEffect hook to perform side effects (data fetching in this case).
  useEffect(() => {
    // Defining an asynchronous function inside the useEffect hook for fetching news data.
    const fetchNews = async () => {
      try {
        // Fetching data from the API endpoint. Await is used to wait for the Promise to resolve.
        const response = await fetch('https://ok.surf/api/v1/cors/news-feed');

        // Checking if the response is not OK, then throwing an error.
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parsing the JSON response and waiting for the Promise to resolve.
        const data = await response.json();

        // Updating the newsData state with the fetched data.
        setNewsData(data);
      } catch (error) {
        // Catching any errors during fetch or JSON parsing and logging them to the console.
        console.error('Error fetching news:', error);
      }
    };

    // Calling the fetchNews function.
    fetchNews();
  }, []); // The empty dependency array means this effect runs once after the first render.

  // The render method of the component.
  return (
    // Using the Container component to wrap the content.
    <Container>
      {/* // Displaying a heading */}
      <h1>Latest News</h1>
      {/* // Mapping over the keys of newsData object. Each key represents a news category. */}
      {Object.keys(newsData).map((category) => (
        // Rendering the NewsList component for each news category.
        // The 'key' prop is necessary for React to handle list rendering efficiently.
        <NewsList key={category} category={category} newsItems={newsData[category]} />
      ))}
    </Container>
  );
};

// Exporting the App component for use in other parts of the application.
export default App;
