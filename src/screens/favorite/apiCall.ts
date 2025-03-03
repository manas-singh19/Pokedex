import { useEffect, useState } from "react";
import ApiService from "../../ApiServices";

interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  ability: string[];
  color: string;
  titleCode: string;
}

const getFavPokemonData = (pokemonIds: number[]) => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!pokemonIds.length) return; // Return if the array is empty

    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      try {
        // Fetch all Pokémon details in parallel
        const details = await Promise.all(
          pokemonIds.map(async (id) => {
            const detailResponse = await ApiService.GetWithoutHeader(`pokemon/${id}`);

            if (!detailResponse?.data) return null; // Skip if no data

            return {
              id,
              color: detailResponse.data.types?.[0]?.type?.name || "unknown",
              titleCode: `#${id}`,
              name: detailResponse.data.name || "",
              image: detailResponse.data.sprites?.front_default || "",
              ability: detailResponse.data.types?.map((a: any) => a.type.name) || [],
            };
          })
        );

        // Remove any failed/null responses
        setPokemonList(details.filter((detail): detail is PokemonDetail => detail !== null));
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonIds]);

  return { pokemonList, isLoading };
};

export default getFavPokemonData;