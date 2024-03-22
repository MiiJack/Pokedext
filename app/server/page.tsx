import React from "react";
import Link from "next/link";
import { Pokemon, PokemonListProps } from "../type/pokemon";
import Image from "next/image";

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  page,
  totalPages,
  fetchPokemons,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/`} className="text-3xl font-bold mb-6">
        Pokemon List (Server)
      </Link>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map(({ name, url }, index) => (
          <li
            key={index}
            className="bg-slate-800  rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 backdrop-blur-sm">
              <span className="text-lg text-rose-600 text-transform capitalize font-semibold mb-2">
                {name}
              </span>
              <Image
                width={192}
                height={192}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${url.split("/").slice(-2, -1)}.png`}
                alt={name}
                className="w-full h-auto"
              />
              <Link href={`/server/${url.split("/").slice(-2, -1)}`} passHref>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2">
                  Details
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        Page {page} of {totalPages}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        {page > 1 && (
          <Link href={`/server?page=${page - 1}`} passHref>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Previous
            </button>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/server?page=${page + 1}`} passHref>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Next
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

const fetchPokemons = async (page: number) => {
  const offset = (page - 1) * 50;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`,
  );
  const data = await res.json();

  const pokemons: Pokemon[] = data.results;
  const totalPages = Math.ceil(data.count / 50);

  return { pokemons, page, totalPages };
};

export default async function PokemonPage(props: any) {
  const page = props.searchParams.page ? parseInt(props.searchParams.page) : 1;
  const offset = (page - 1) * 50;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`,
  );
  const data = await res.json();

  const pokemons: Pokemon[] = data.results;
  const totalPages = Math.ceil(data.count / 50);

  return (
    <PokemonList
      pokemons={pokemons}
      page={page}
      totalPages={totalPages}
      fetchPokemons={fetchPokemons}
    />
  );
}
