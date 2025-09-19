import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";
import { useFavorites } from "../../context/useFavorites";

interface Pokemon {
  id: number;
  name: string;
  imageUrl?: string;
  types: string[];
}

interface PokemonListProps {
  pokemons: Pokemon[];
  onSelect: (id: number) => void; // función para manejar selección
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onSelect }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Ordenamos alfabéticamente por nombre
  const sortedPokemons = [...pokemons].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useEffect(() => {
    if (pokemons.length > 0 && isInitialLoad) {
      // Remover la clase de initial load después de las animaciones
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pokemons.length, isInitialLoad]);

  if (sortedPokemons.length === 0) {
    return (
      <div className="pokemon-grid">
        <div className="pokemon-grid-empty">
          <h3>No Pokémon found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`pokemon-grid ${isInitialLoad ? 'initial-load' : ''}`}>
      {sortedPokemons.map((pokemon) => {
        const isFavorite = favorites.includes(pokemon.id);

        return (
          <div
            key={pokemon.id}
            className="pokemon-grid-item"
            onClick={() => onSelect(pokemon.id)}
          >
            <PokemonCard
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.imageUrl}
              types={pokemon.types}
            />

            <button
              className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(pokemon.id);
              }}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
