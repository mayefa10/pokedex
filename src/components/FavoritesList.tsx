import { useFavorites } from "../context/useFavorites";
import PokemonCard from "./pokemon/PokemonCard";
import { usePokemons } from "../hook/usePokemons";

const FavoritesList = () => {
  const { favorites } = useFavorites();
  const { pokemons } = usePokemons();

  // Filtrar los Pokémon que están en favoritos
  const favoritePokemons = pokemons.filter((p) => favorites.includes(p.id));

  if (favoritePokemons.length === 0) {
    return <p>No tienes favoritos todavía ⭐</p>;
  }

  return (
    <div className="pokemon-grid">
      {favoritePokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.imageUrl}
          types={pokemon.types}
        />
      ))}
    </div>
  );
};

export default FavoritesList;

