import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsItemComponent from './NewsItemComponent';
import { NewsItem } from '../types';

describe('NewsItemComponent', () => {
  const baseItem: NewsItem = {
    link: 'https://example.com/article',
    og: 'https://example.com/image.png',
    title: 'Breaking News Title',
  };

  test('renders the article title as a heading', () => {
    render(<NewsItemComponent item={baseItem} />);
    expect(
      screen.getByRole('heading', { name: baseItem.title })
    ).toBeInTheDocument();
  });

  test('renders a link with the correct href and safe target attributes', () => {
    render(<NewsItemComponent item={baseItem} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', baseItem.link);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders the preview image when og is provided', () => {
    render(<NewsItemComponent item={baseItem} />);
    const image = screen.getByRole('img', { name: baseItem.title });
    expect(image).toHaveAttribute('src', baseItem.og);
  });

  test('does not render an image when og is empty', () => {
    render(<NewsItemComponent item={{ ...baseItem, og: '' }} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
