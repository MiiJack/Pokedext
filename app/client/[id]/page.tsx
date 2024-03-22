"use client";

import React from "react";
import { PokemonDetails } from "../../type/pokemon";
import Image from "next/image";

const PokemonDetail: React.FC<{ pokemon: PokemonDetails }> = ({ pokemon }) => {
  const { name, height, weight, types, id, sprites } = pokemon;

  return (
    <div className="mx-auto max-w-md p-4">
      <button
        onClick={() => history.back()}
        className="text-2xl text-transform capitalize font-bold mb-4"
      >
        {name}
      </button>
      <Image
        width={400}
        height={400}
        src={sprites.other["official-artwork"].front_default}
        alt={name}
        className="mb-4"
      />
      <p className="mb-2">Height: {height / 10}m</p>
      <p className="mb-2">Weight: {weight / 10}kg</p>
      <p className="mb-2 text-transform capitalize">
        Types: {types.map(({ type }) => type.name).join(", ")}
      </p>
      <p className="mb-2">National Pokedex Number: {id}</p>
    </div>
  );
};

export default async function PokemonPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: PokemonDetails = await res.json();

  return pokemon ? <PokemonDetail pokemon={pokemon} /> : <div>Loading...</div>;
}
