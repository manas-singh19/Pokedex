import { useEffect, useState, useMemo } from "react";
import ApiService from '../../ApiServices';


interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  ability: string[];
  color:string;
  titleCode:string;
}

const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [nextPagination, setNextPagination] = useState("");
  
  // Fetch Pokémon list
  const fetchPokemonList = async (url = "pokemon") => {
    try {
      const response = await ApiService.GetWithoutHeader(url);
      if (response?.data?.results) {
        setNextPagination(response.data.next || ""); // Set next pagination URL

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

            // console.log("inner ", {
            //     id: pokemon.id,
            //     color: (detailResponse as PokemonDetailResponse)?.data?.types[0].type.name,
            //     titleCode:`#${pokemon.id}`,
            //     name: (detailResponse as PokemonDetailResponse)?.data?.name || pokemon.name,
            //     image: (detailResponse as PokemonDetailResponse)?.data?.sprites?.front_default || "", // Adjust based on API response
            //     ability: (detailResponse as PokemonDetailResponse)?.data?.types?.map((a) => a.type.name) || [],
            // });

            return {
                id: pokemon.id,
                color:(detailResponse as PokemonDetailResponse)?.data?.types[0].type.name,
                titleCode:`#${pokemon.id}`,
                name: (detailResponse as PokemonDetailResponse)?.data?.name || pokemon.name,
                image: (detailResponse as PokemonDetailResponse)?.data?.sprites?.front_default || "", // Adjust based on API response
                ability: (detailResponse as PokemonDetailResponse)?.data?.types?.map((a) => a.type.name) || [],
            };
            })
          );

        setPokemonList(details);
      }
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return { pokemonList, nextPagination, fetchPokemonList};
};

export default usePokemonData;