// src/components/pokemon/PokemonDetail.tsx
import React from "react";
import { usePokemonDetail } from "../../hook/usePokemonDetail";

interface PokemonDetailProps {
  id: number;
  onBack: () => void;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ id, onBack }) => {
  const { loading, error, pokemon } = usePokemonDetail(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading details</p>;
  if (!pokemon) return <p>No details found</p>;

  return (
    <div className="pokemon-detail">
      <button onClick={ onBack } className="close-btn">
        ✖
      </button>

      <h2>{pokemon.name.toUpperCase()}</h2>
      <img src={pokemon.imageUrl} alt={pokemon.name} width={200} />

      <p>
        <strong>Generation:</strong> {pokemon.generation}
      </p>
      <p>
        <strong>Height:</strong> {pokemon.height / 10} m
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight / 10} kg
      </p>

      <div>
        <strong>Types:</strong>
        <ul>
          {pokemon.types.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;

