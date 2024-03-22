interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemons: Pokemon[];
  page: number;
  totalPages: number;
  fetchPokemons: (page: number) => void;
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  id: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      "official-artwork": { front_default: string; front_shiny: string };
    };
  };
}

export type { Pokemon, PokemonListProps, PokemonDetails };
