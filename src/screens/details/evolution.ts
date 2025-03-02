import { useEffect, useState } from "react";
import ApiService from "../../ApiServices";

interface EvolutionData {
  name: string;
  image: string;
}

const getEvolutionChain = (pokemonId: number | undefined) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchEvolutionChain = async () => {
      setIsLoading(true);
      try {
        // 1. Get Pokémon species
        const speciesResponse = await ApiService.GetWithoutHeader(`pokemon-species/${pokemonId}`);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

        // Extract Evolution Chain ID
        const evolutionChainId = evolutionChainUrl.split("/").slice(-2, -1)[0];

        // 2. Get Evolution Chain
        const evolutionResponse = await ApiService.GetWithoutHeader(`evolution-chain/${evolutionChainId}`);
        const chain = evolutionResponse.data.chain;

        // 3. Extract evolution data recursively
        const extractEvolutions = async (chain: any) => {
          const evolutions: EvolutionData[] = [];

          while (chain) {
            const pokemonName = chain.species.name;

            // 4. Fetch Pokémon image
            const pokemonData = await ApiService.GetWithoutHeader(`pokemon/${pokemonName}`);
            const imageUrl = pokemonData.data.sprites.other["official-artwork"].front_default;

            evolutions.push({ name: pokemonName, image: imageUrl });

            // Check for next evolution stage
            if (chain.evolves_to.length > 0) {
              chain = chain.evolves_to[0];
            } else {
              break;
            }
          }
          return evolutions;
        };

        const evolutions = await extractEvolutions(chain);
        setEvolutionChain(evolutions);
        console.log("evolutionChain inner: ",evolutionChain);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemonId]);

  return { evolutionChain, isLoading };
};

export default getEvolutionChain;