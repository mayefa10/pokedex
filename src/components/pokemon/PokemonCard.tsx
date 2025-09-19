import React from 'react';
import './PokemonCard.css';

interface PokemonCardProps {
  id: number;
  name: string;
  image?: string;
  types?: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  image,
  types = ['normal']
}) => {
  const imageUrl = image ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const primaryType = types[0]?.toLowerCase() || 'normal';
  const formattedId = String(id).padStart(3, '0');

  return (
    <article className={`pokemon-card hover-lift type-${primaryType}`}>
      <div className="pokemon-card-header">
        <span className="pokemon-id">#{formattedId}</span>
      </div>

      <div className="pokemon-image-container">
        <img
          src={imageUrl}
          alt={name}
          className="pokemon-image"
          loading="lazy"
        />
      </div>

      <div className="pokemon-info">
        <h3 className="pokemon-name">{name}</h3>
        <div className="pokemon-types">
          {types.map((type) => (
            <span key={type} className={`type-badge type-${type.toLowerCase()}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PokemonCard;