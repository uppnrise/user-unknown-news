import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SkipLink from './SkipLink';

export {};  // Make this a module

describe('SkipLink', () => {
  test('renders skip link with correct text', () => {
    render(<SkipLink />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
  });

  test('has correct href attribute', () => {
    render(<SkipLink />);
    const skipLink = screen.getByRole('link');
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('has correct accessibility attributes', () => {
    render(<SkipLink />);
    const skipLink = screen.getByRole('link');
    expect(skipLink).toHaveClass('skip-link');
  });

  test('becomes visible when focused', () => {
    render(<SkipLink />);
    const skipLink = screen.getByRole('link');
    
    // Initially should be visually hidden
    expect(skipLink).toHaveStyle({
      position: 'absolute',
      top: '-40px'
    });

    // Focus the link
    fireEvent.focus(skipLink);
    
    // Should become visible
    expect(skipLink).toHaveStyle({
      top: '6px'
    });
  });
});
