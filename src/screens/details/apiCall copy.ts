import { useEffect, useRef, useState } from "react";
import ApiService from '../../ApiServices';

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  // Add more fields as needed  
  abilities: { ability: { name: string } }[];
  species: { name: string };
  base_experience:string;
}

const getPokemonData = (pokemonId: number | undefined) => {
  const pokemonDetailsRef = useRef<PokemonDetail | null>(null); // Using useRef instead of useState
  const pokemonDetailSpeciesRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true); // Start with loading = true

  useEffect(() => {
    if (!pokemonId) return;

    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.GetWithoutHeader(`pokemon/${pokemonId}`);
        if (response?.data) {
          console.log("response.data.height",{
            data:response.data.height,
            id:pokemonId
          });

          const speciesResponse = await ApiService.GetWithoutHeader(`pokemon-species/${pokemonId}`)
          pokemonDetailSpeciesRef.current = speciesResponse.data;
          console.log("pokemonDetailSpecies: inner ", speciesResponse.data)

          pokemonDetailsRef.current = response.data; // Update the ref value
        }
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]); // Re-fetch when ID changes

  return { pokemonDetails: pokemonDetailsRef.current, pokemonDetailSpecies: pokemonDetailSpeciesRef.current, isLoading };
};

export default getPokemonData;