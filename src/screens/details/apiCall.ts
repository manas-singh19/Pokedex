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
  sprites: any;
  stats: any;
}

interface EvolutionStage {
  id: number;
  name: string;
  image: string;
  level: number | null;
}

const getPokemonData = (pokemonId: number | undefined) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(null);
  const [pokemonDetailSpecies, setPokemonDetailSpecies] = useState<any>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionStage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      try {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          ApiService.GetWithoutHeader(`pokemon/${pokemonId}`),
          ApiService.GetWithoutHeader(`pokemon-species/${pokemonId}`),
        ]);

        if (pokemonResponse?.data && speciesResponse?.data) {
          setPokemonDetails(pokemonResponse.data);
          setPokemonDetailSpecies(speciesResponse.data);

          // Fetch evolution chain
          const evolutionChainUrl = speciesResponse.data?.evolution_chain?.url;
          if (evolutionChainUrl) {
            const evolutionId = evolutionChainUrl.split("/").slice(-2, -1)[0]; // Extract ID
            fetchEvolutionChain(evolutionId);
          }
        }
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    const fetchEvolutionChain = async (evolutionId: string) => {
      try {
        const evolutionResponse = await ApiService.GetWithoutHeader(`evolution-chain/${evolutionId}`);
        if (evolutionResponse?.data) {
          const evolutionData = await extractEvolutionData(evolutionResponse.data);
          setEvolutionChain(evolutionData);
        }
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      }
    };

    const extractEvolutionData = async (data: any): Promise<EvolutionStage[]> => {
      let evolutions: EvolutionStage[] = [];
      let currentChain = data.chain;

      while (currentChain) {
        const name = currentChain.species.name;
        const level = currentChain.evolution_details?.[0]?.min_level || null;

        const pokemonResponse = await ApiService.GetWithoutHeader(`pokemon/${name}`);
        const image = pokemonResponse?.data?.sprites?.other?.["official-artwork"]?.front_default || "";
        const id = pokemonResponse?.data?.id || null;

        evolutions.push({ id, name, image, level });

        currentChain = currentChain.evolves_to?.[0] || null;
      }

      return evolutions;
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  return { pokemonDetails, pokemonDetailSpecies, evolutionChain, isLoading };
};

export default getPokemonData;