import React from "react";
import { useNavigate } from "react-router-dom";
import { useFilteredPokemons } from "../hook/useFilteredPokemons";
import { useFilters } from "../context/useFilters";
import PokemonList from "../components/pokemon/PokemonList";

const Home: React.FC = () => {
  const { loading, error, pokemons, totalCount, filteredCount } = useFilteredPokemons();
  const { searchTerm, selectedType, clearFilters } = useFilters();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="loading-container fade-in">
        <div className="loading-spinner spin"></div>
        <p className="loading-text">Loading Pokémon<span className="loading-dots"></span></p>
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

  const handleSelectPokemon = (id: number) => {
    navigate(`/pokemon/${id}`);
  };

  const hasActiveFilters = searchTerm.trim() || selectedType !== 'all';

  return (
    <div className="home-page">
      {/* Filter Info */}
      {hasActiveFilters && (
        <div className="filter-info fade-in">
          <div className="filter-summary">
            <span className="results-count">
              Showing {filteredCount} of {totalCount} Pokémon
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="clear-filters-btn"
              >
                Clear Filters
              </button>
            )}
          </div>

          {searchTerm.trim() && (
            <div className="active-filter">
              Search: <strong>"{searchTerm}"</strong>
            </div>
          )}

          {selectedType !== 'all' && (
            <div className="active-filter">
              Type: <strong className={`type-${selectedType}`}>{selectedType}</strong>
            </div>
          )}
        </div>
      )}

      {/* Pokemon List */}
      {pokemons.length === 0 && !loading ? (
        <div className="no-results fade-in">
          <div className="no-results-icon">🔍</div>
          <h3>No Pokémon found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button onClick={clearFilters} className="primary">
            Show All Pokémon
          </button>
        </div>
      ) : (
        <PokemonList
          pokemons={pokemons}
          onSelect={handleSelectPokemon}
        />
      )}
    </div>
  );
};

export default Home;