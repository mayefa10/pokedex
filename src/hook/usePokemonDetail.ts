// src/hooks/usePokemonDetail.ts
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      pokemon_v2_pokemonspecy {
        pokemon_v2_generation {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

// 🔹 Respuesta directa de la API
interface PokemonDetailData {
  pokemon_v2_pokemon_by_pk: {
    id: number;
    name: string;
    height: number;
    weight: number;
    pokemon_v2_pokemonspecy?: {
      pokemon_v2_generation?: { name: string } | null;
    } | null;
    pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[];
  } | null;
}

// 🔹 Variables que recibe la query
interface PokemonDetailVars {
  id: number;
}

// 🔹 Objeto transformado que retorna el hook
export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  generation: string;
  types: string[];
}

export const usePokemonDetail = (id: number) => {
  const { loading, error, data } = useQuery<PokemonDetailData, PokemonDetailVars>(
    GET_POKEMON_DETAIL,
    {
      variables: { id },
      skip: !id, // evita ejecutar si no hay id
    }
  );

  if (loading) return { loading, error: null, pokemon: null };
  if (error) return { loading: false, error, pokemon: null };

  const poke = data?.pokemon_v2_pokemon_by_pk;
  if (!poke) return { loading: false, error: null, pokemon: null };

  const pokemon: Pokemon = {
    id: poke.id,
    name: poke.name,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`,
    height: poke.height,
    weight: poke.weight,
    generation: poke.pokemon_v2_pokemonspecy?.pokemon_v2_generation?.name || "unknown",
    types: poke.pokemon_v2_pokemontypes.map((t) => t.pokemon_v2_type.name),
  };

  return { loading: false, error: null, pokemon };
};
