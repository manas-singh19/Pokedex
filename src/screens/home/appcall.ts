import { useEffect, useState } from "react";
import ApiService from '../../ApiServices';

interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  ability: string[];
  color: string;
  titleCode: string;
}

const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [nextPagination, setNextPagination] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Pokémon list
  const fetchPokemonList = async (url: string = "pokemon") => {
    if (isLoading) return; // Prevent multiple API calls

    setIsLoading(true);
    try {
      const response = await ApiService.GetWithoutHeader(url);
      if (response?.data?.results) {
        // Extract only the query parameters from response.data.next
        const nextUrl = response.data.next;
        let nextQuery = null;

        if (nextUrl) {
          const urlParts = nextUrl.split("?"); // Split at "?"
          if (urlParts.length > 1) {
            nextQuery = urlParts[1]; // Get the query part after "?"
          }
        }

        setNextPagination(nextQuery); // Store only the query string

        // Extract IDs from URLs
        interface PokemonResult {
          name: string;
          url: string;
        }

        interface PokemonData {
          name: string;
          id: number;
        }

        const pokemonData: PokemonData[] = (response.data.results as PokemonResult[]).map((item: PokemonResult) => ({
          name: item.name,
          id: parseInt(item.url.split("/").filter(Boolean).pop() as string, 10),
        }));

        // Fetch detailed data in parallel
        const details = await Promise.all(
          pokemonData.map(async (pokemon) => {
            const detailResponse = await ApiService.GetWithoutHeader(`pokemon/${pokemon.id}`);

            interface PokemonType {
              type: {
                name: string;
              };
            }

            interface PokemonDetailResponse {
              data: {
                name: string;
                sprites: {
                  front_default: string;
                };
                types: PokemonType[];
              };
            }

            return {
              id: pokemon.id,
              color: (detailResponse as PokemonDetailResponse)?.data?.types[0]?.type?.name || "unknown",
              titleCode: `#${pokemon.id}`,
              name: (detailResponse as PokemonDetailResponse)?.data?.name || pokemon.name,
              image: (detailResponse as PokemonDetailResponse)?.data?.sprites?.front_default || "",
              ability: (detailResponse as PokemonDetailResponse)?.data?.types?.map((a) => a.type.name) || [],
            };
          })
        );

        setPokemonList((prevList) => [...prevList, ...details]); // Append new data
      }
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return { 
    pokemonList, 
    nextPagination, 
    fetchMorePokemon: () => nextPagination && fetchPokemonList(`pokemon?${nextPagination}`), 
    isLoading 
  };
};

export default usePokemonData;