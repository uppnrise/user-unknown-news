/**
 * SearchBar - Search and filter news
 */

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext';

const SearchContainer = styled.div`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterChip = styled.button<{ $active?: boolean }>`
  background: ${props =>
    props.$active ? 'var(--primary-color)' : 'var(--chip-bg)'};
  color: ${props => (props.$active ? 'white' : 'var(--text-color)')};
  border: 2px solid
    ${props => (props.$active ? 'var(--primary-color)' : 'var(--border-color)')};
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (category: string | null) => void;
  categories: string[];
  selectedCategory: string | null;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterChange,
  categories,
  selectedCategory,
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleFilterClick = useCallback(
    (category: string | null) => {
      onFilterChange(category);
    },
    [onFilterChange]
  );

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder={t('search.placeholder')}
        value={query}
        onChange={handleSearchChange}
        aria-label="Search news"
      />

      {categories.length > 0 && (
        <FilterContainer>
          <FilterChip
            $active={selectedCategory === null}
            onClick={() => handleFilterClick(null)}
          >
            {t('filter.all')}
          </FilterChip>
          {categories.map(category => (
            <FilterChip
              key={category}
              $active={selectedCategory === category}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </FilterChip>
          ))}
        </FilterContainer>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
