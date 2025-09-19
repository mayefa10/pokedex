import React from 'react';
import { useFilters } from '../../context/useFilters';
import sortIcon from '../../img/sort.png';

const SortButton: React.FC = () => {
  const { sortBy, setSortBy } = useFilters();

  const toggleSort = () => {
    setSortBy(sortBy === 'name' ? 'id' : 'name');
  };

  return (
    <button
      onClick={toggleSort}
      className="sort-button"
      title={`Sort by ${sortBy === 'name' ? 'ID' : 'Name'}`}
      aria-label={`Currently sorting by ${sortBy}. Click to sort by ${sortBy === 'name' ? 'ID' : 'Name'}`}
    >
      <img
        src={sortIcon}
        alt="Sort"
        className="sort-icon"
      />
      <span className="sort-text">
        {sortBy === 'name' ? 'A-Z' : '#'}
      </span>
    </button>
  );
};

export default SortButton;