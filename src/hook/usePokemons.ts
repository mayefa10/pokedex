import { useQuery } from "@apollo/client/react";
import { GET_POKEMONS } from "../services/pokemonQueries";
import { validatePokemonData } from "../utils/validation";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  types: string[];
}

interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemontypes: PokemonType[];
}

interface QueryData {
  pokemon_v2_pokemon: RawPokemon[];
}

export const usePokemons = () => {
  const { loading, error, data } = useQuery<QueryData>(GET_POKEMONS);

  if (loading) return { loading, error: null, pokemons: [] };
  if (error) return { loading: false, error, pokemons: [] };

  // 🔹 Transformamos los datos de la API en un formato limpio con validación
  const pokemons: Pokemon[] = (data?.pokemon_v2_pokemon || [])
    .map((poke: RawPokemon) => ({
      id: poke.id,
      name: poke.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`,
      height: poke.height,
      weight: poke.weight,
      types: poke.pokemon_v2_pokemontypes.map(
        (t: PokemonType) => t.pokemon_v2_type.name
      ),
    }))
    // 🔹 Validamos cada Pokémon antes de incluirlo
    .filter((pokemon: Pokemon) => {
      const validation = validatePokemonData(pokemon);
      if (!validation.isValid) {
        console.warn(`Invalid Pokemon data for ${pokemon.name}:`, validation.error);
        return false;
      }
      return true;
    })
    // 🔹 Ordenamos alfabéticamente
    .sort((a: Pokemon, b: Pokemon) => a.name.localeCompare(b.name));

  return { loading: false, error: null, pokemons };
};
