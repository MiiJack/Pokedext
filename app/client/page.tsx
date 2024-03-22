"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Pokemon, PokemonListProps } from "../type/pokemon";

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  page,
  totalPages,
  fetchPokemons,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/`} className="text-3xl font-bold mb-6">
        Pokemon List (Client)
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
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.split("/").slice(-2, -1)}.png`}
                alt={name}
                className="w-full h-auto"
              />
              <Link href={`/client/${url.split("/").slice(-2, -1)}`} passHref>
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
          <button
            onClick={() => fetchPokemons(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Previous
          </button>
        )}
        {page < totalPages && (
          <button
            onClick={() => fetchPokemons(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

const PokemonPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListProps>({
    pokemons: [],
    page: 1,
    totalPages: 1,
    fetchPokemons: () => {},
  });

  useEffect(() => {
    const fetchPokemons = async (page: number) => {
      const offset = (page - 1) * 50;
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`,
      );
      const data = await res.json();

      const pokemons: Pokemon[] = data.results;
      const totalPages = Math.ceil(data.count / 50);

      setPokemonList({ pokemons, page, totalPages, fetchPokemons });
    };

    fetchPokemons(1);
  }, []);

  return <PokemonList {...pokemonList} />;
};

export default PokemonPage;
