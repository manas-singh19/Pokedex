import { useEffect, useState } from "react";
import ApiService from '../../ApiServices';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  ability: string[];
  color: string;
  titleCode: string;
}

const CACHE_KEY = "pokemonList";

const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [nextPagination, setNextPagination] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Track internet status

  useEffect(() => {
    // Subscribe to internet connection changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    loadCachedData(); // Load data from cache initially

    return () => unsubscribe(); // Cleanup
  }, []);

  // Load cached Pokémon data when offline
  const loadCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        setPokemonList(JSON.parse(cachedData));
      }
    } catch (error) {
      console.error("Error loading cached Pokémon data:", error);
    }
  };

  // Fetch Pokémon list
  const fetchPokemonList = async (url: string = "pokemon") => {
    if (isLoading || !isConnected) return; // Prevent API calls if offline

    setIsLoading(true);
    try {
      const response = await ApiService.GetWithoutHeader(url);
      if (response?.data?.results) {
        const nextUrl = response.data.next;
        let nextQuery = nextUrl ? nextUrl.split("?")[1] : null;
        setNextPagination(nextQuery); 

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

        // Update state and cache new data
        const updatedList = [...pokemonList, ...details];
        setPokemonList(updatedList);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(updatedList)); // Cache data
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
    isLoading, 
    isConnected
  };
};

export default usePokemonData;