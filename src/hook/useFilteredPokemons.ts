import { useMemo } from 'react';
import { usePokemons } from './usePokemons';
import { useFilters } from '../context/useFilters';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  types: string[];
}

export const useFilteredPokemons = () => {
  const { loading, error, pokemons } = usePokemons();
  const { searchTerm, selectedType, sortBy } = useFilters();

  const filteredAndSortedPokemons = useMemo(() => {
    if (!pokemons.length) return [];

    let filtered = pokemons;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchLower)
      );
    }

    // Filter by type
    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some(type =>
          type.toLowerCase() === selectedType.toLowerCase()
        )
      );
    }

    // Sort
    filtered.sort((a: Pokemon, b: Pokemon) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.id - b.id;
      }
    });

    return filtered;
  }, [pokemons, searchTerm, selectedType, sortBy]);

  return {
    loading,
    error,
    pokemons: filteredAndSortedPokemons,
    totalCount: pokemons.length,
    filteredCount: filteredAndSortedPokemons.length,
  };
};