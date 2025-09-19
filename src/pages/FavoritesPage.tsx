import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/useFavorites";
import { usePokemons } from "../hook/usePokemons";
import PokemonList from "../components/pokemon/PokemonList";

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const { loading, error, pokemons } = usePokemons();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="loading-container fade-in">
        <div className="loading-spinner spin"></div>
        <p className="loading-text">Loading your favorites<span className="loading-dots"></span></p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container fade-in">
        <h2>Oops! Something went wrong</h2>
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.reload()} className="primary">
          Try Again
        </button>
      </div>
    );
  }

  // Filtrar los Pokémon que están en favoritos
  const favoritePokemons = pokemons.filter((p) => favorites.includes(p.id));

  const handleSelectPokemon = (id: number) => {
    navigate(`/pokemon/${id}`);
  };

  if (favoritePokemons.length === 0) {
    return (
      <div className="favorites-page">
        <div className="empty-favorites fade-in">
          <div className="empty-icon">⭐</div>
          <h2>No favorites yet!</h2>
          <p>
            Start exploring and mark your favorite Pokémon by clicking the star button on their cards.
          </p>
          <button
            onClick={() => navigate('/')}
            className="primary"
          >
            🏠 Explore Pokémon
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="page-header fade-in">
        <h1>⭐ Your Favorite Pokémon</h1>
        <p className="favorites-count">
          You have {favoritePokemons.length} favorite{favoritePokemons.length !== 1 ? 's' : ''}
        </p>
      </div>

      <PokemonList
        pokemons={favoritePokemons}
        onSelect={handleSelectPokemon}
      />
    </div>
  );
};

export default FavoritesPage;