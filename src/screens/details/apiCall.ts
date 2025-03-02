import { useEffect, useState } from "react";
import ApiService from "../../ApiServices";

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  species: { name: string };
  base_experience: string;
  sprites:any;
}

const getPokemonData = (pokemonId: number | undefined) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(null);
  const [pokemonDetailSpecies, setPokemonDetailSpecies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      try {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          ApiService.GetWithoutHeader(`pokemon/${pokemonId}`),
          ApiService.GetWithoutHeader(`pokemon-species/${pokemonId}`)
        ]);

        if (pokemonResponse?.data && speciesResponse?.data) {
        //   console.log("Fetched Data:", {
        //     height: pokemonResponse.data.height,
        //     id: pokemonId,
        //     species: speciesResponse.data,
        //   });

          setPokemonDetails(pokemonResponse.data);
          setPokemonDetailSpecies(speciesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]); // Re-fetch when ID changes

  return { pokemonDetails, pokemonDetailSpecies, isLoading };
};

export default getPokemonData;