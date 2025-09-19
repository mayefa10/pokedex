import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../hook/usePokemonDetail";
import { useFavorites } from "../context/useFavorites";

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pokemonId = parseInt(id || '0', 10);
  const { loading, error, pokemon } = usePokemonDetail(pokemonId);
  const { favorites, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="loading-container fade-in">
        <div className="loading-spinner spin"></div>
        <p className="loading-text">Loading Pokémon details<span className="loading-dots"></span></p>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="error-container fade-in">
        <h2>Pokémon not found</h2>
        <p>Sorry, we couldn't find details for this Pokémon.</p>
        <button onClick={() => navigate('/')} className="primary">
          🏠 Back to Home
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(pokemonId);
  const formattedId = String(pokemonId).padStart(3, '0');
  const primaryType = pokemon.types[0]?.toLowerCase() || 'normal';

  return (
    <div className="pokemon-detail-page fade-in">
      <div className="detail-header">
        <button
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Go back"
        >
          ← Back
        </button>

        <button
          onClick={() => toggleFavorite(pokemonId)}
          className={`favorite-toggle ${isFavorite ? 'is-favorite' : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className={`pokemon-detail-card type-${primaryType}`}>
        <div className="pokemon-detail-header">
          <div className="pokemon-id-badge">#{formattedId}</div>
          <h1 className="pokemon-name">{pokemon.name}</h1>
        </div>

        <div className="pokemon-image-section">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="pokemon-detail-image"
          />
        </div>

        <div className="pokemon-info-grid">
          <div className="info-section">
            <h3>Basic Info</h3>
            <div className="info-item">
              <span className="info-label">Generation:</span>
              <span className="info-value">{pokemon.generation}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Height:</span>
              <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="info-item">
              <span className="info-label">Weight:</span>
              <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
          </div>

          <div className="info-section">
            <h3>Types</h3>
            <div className="type-badges">
              {pokemon.types.map((type) => (
                <span key={type} className={`type-badge type-${type.toLowerCase()}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;