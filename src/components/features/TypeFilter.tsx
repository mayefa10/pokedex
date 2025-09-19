import React from 'react';
import { useFilters } from '../../context/useFilters';

const POKEMON_TYPES = [
  'all',
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water'
];

const TypeFilter: React.FC = () => {
  const { selectedType, setSelectedType } = useFilters();

  return (
    <div className="type-filter">
      <label htmlFor="type-select" className="filter-label">
        Filter by Type:
      </label>
      <select
        id="type-select"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="type-select"
      >
        {POKEMON_TYPES.map((type) => (
          <option key={type} value={type}>
            {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;