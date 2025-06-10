import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsList from './NewsList';

describe('NewsList Component', () => {
  const mockNewsItems = [
    { id: 1, title: 'Item 1', link: 'http://link1.com', og: 'http://img1.com' },
    { id: 2, title: 'Item 2', link: 'http://link2.com', og: 'http://img2.com' },
    { id: 3, title: 'Item 3', link: 'http://link3.com', og: 'http://img3.com' },
    { id: 4, title: 'Item 4', link: 'http://link4.com', og: 'http://img4.com' },
  ];

  test('renders news items and a show more button for more than three items', () => {
    render(<NewsList category="Technology" newsItems={mockNewsItems} />);

    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(3); // Using getAllByRole for anchor tags
    expect(screen.getByText(/Show More/)).toBeInTheDocument();
  });

  test('shows all items and a show less button when show more is clicked', () => {
    render(<NewsList category="Technology" newsItems={mockNewsItems} />);

    fireEvent.click(screen.getByText(/Show More/));
    expect(screen.getAllByRole('link')).toHaveLength(4); // Using getAllByRole for anchor tags
    expect(screen.getByText('Show Less')).toBeInTheDocument();
  });

  test('does not show show more/less button when items are three or less', () => {
    const lessItems = mockNewsItems.slice(0, 3);
    render(<NewsList category="Technology" newsItems={lessItems} />);

    expect(screen.queryByText(/Show More/)).not.toBeInTheDocument();
    expect(screen.queryByText('Show Less')).not.toBeInTheDocument();
  });
});
