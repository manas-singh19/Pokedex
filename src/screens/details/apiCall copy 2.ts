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

interface EvolutionData {
  name: string;
  image: string;
}

const getPokemonData = (pokemonId: number | undefined) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(null);
  const [pokemonDetailSpecies, setPokemonDetailSpecies] = useState<any>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionData[]>([]);
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
          const evolutionData = extractEvolutionData(evolutionResponse.data);
          setEvolutionChain(evolutionData);
        }
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      }
    };

    const extractEvolutionData = (data: any): EvolutionData[] => {
      let evolutions: EvolutionData[] = [];

      const traverseEvolution = async (chain: any) => {
        if (!chain) return;

        const name = chain.species.name;
        const pokemonResponse = await ApiService.GetWithoutHeader(`pokemon/${name}`);
        const image = pokemonResponse?.data?.sprites?.other?.["official-artwork"]?.front_default || "";

        evolutions.push({ name, image });

        if (chain.evolves_to.length > 0) {
          await traverseEvolution(chain.evolves_to[0]); // Get next evolution stage
        }
      };

      traverseEvolution(data.chain);
      console.log("evolution: ",evolutions);
      return evolutions;
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  return { pokemonDetails, pokemonDetailSpecies, evolutionChain, isLoading };
};

export default getPokemonData;