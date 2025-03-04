import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { useTheme } from '../../theme/themeProviderProps';
import ScreenWrapper from '../../components/screenWrapper';
import Header from '../../components/headers';
import PokemonCard from '../../components/pokemon/card';
import AppIcons from '../../utility/icons'; 
import FilterModal from '../../components/filter';
import SearchBar from '../../components/search';
import { PokemonCardBackgroundColor } from "../../utility/pokemonColor";
import usePokemonData from './apicall';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { pokemonList, fetchMorePokemon, isLoading } = usePokemonData();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<string>("");
  let filtersVar = '';
  const [search, setSearch] = useState<string>("");

  // Toggle Filter Modal
  const handleOpen = useCallback(() => setModalVisible(prev => !prev), []);

  // Handle filter selection 
  const selectedFilter = useCallback((type: string) => {
    setFilters((prevFilter) => (prevFilter === type ? "" : type)); // Toggle selection
    setModalVisible(false); // Close modal after selection
  }, []);

  // Handle search input
  const searchTextHandler = useCallback((data: any) => setSearch(data), []);

  // Memoized color function to prevent unnecessary renders
  type PokemonType = keyof typeof PokemonCardBackgroundColor;
  const getColor = useCallback((type: PokemonType) => {
    return PokemonCardBackgroundColor[type] || "orange";
  }, []);

  // Filter Pokémon list based on search & filter criteria
  const filteredPokemonList = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      const matchesSearch = search ? pokemon.name.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesFilter = filters ? pokemon.ability.includes(filters) : true;
      return matchesSearch && matchesFilter;
    });
  }, [pokemonList, search, filters]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScreenWrapper>
        <Header title="" isIcon={true} iconsType={['switch', 'fav', 'filter']} filterOpen={handleOpen} />

        <View style={styles.contentContainer}>
          {theme.isDark ? (
            <AppIcons.TitleWhite width={180} height={50} fill="white" />
          ) : (
            <AppIcons.Title width={180} height={50} fill="black" />
          )}

          <Text style={[styles.description, { color: theme.isDark ? "#fff" : "#000" }]}>
            Search for Pokémon by name or using the National Pokédex number.
          </Text>

          <SearchBar placeHolderText="What Pokémon are you looking for?" handlerFunc={searchTextHandler} />

          <FlatList
            data={filteredPokemonList} // Render only filtered results
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PokemonCard
                key={item.id}
                color={getColor(item.color as PokemonType)}
                titleCode={item.titleCode}
                name={item.name}
                image={item.image}
                ability={item.ability} 
                id={item.id} 
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onEndReached={fetchMorePokemon} // Fetch more when scrolling to the end
            onEndReachedThreshold={0.5}
            ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
            initialNumToRender={20} // Optimize FlatList initial render
            maxToRenderPerBatch={10} // Load in small chunks for better performance
            windowSize={5} // Keeps only 5 screens worth of items in memory
          />
        </View>
      </ScreenWrapper>

      <FilterModal model={modalVisible} setModalHandler={handleOpen} selectedFilter={selectedFilter} filters={filters}/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  description: {
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
});