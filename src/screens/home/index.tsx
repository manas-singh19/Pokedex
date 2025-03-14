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
  const { pokemonList, fetchMorePokemon, isLoading, isConnected } = usePokemonData();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleOpen = useCallback(() => setModalVisible(prev => !prev), []);
 
  const selectedFilter = useCallback((type: string) => {
    setFilters(prevFilter => (prevFilter === type ? "" : type));
    setModalVisible(false);
  }, []);
  const searchTextHandler = useCallback((data: any) => setSearch(data), []);
  
  type PokemonType = keyof typeof PokemonCardBackgroundColor;
  const getColor = useCallback((type: PokemonType) => {
    return PokemonCardBackgroundColor[type] || "orange";
  }, []);

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

        {!isConnected && (
          <View style={styles.offlineBanner}>
            <View style={styles.offlineBannerItem}>
                <Text style={styles.offlineText}>You are offline. Showing cached data.</Text>
            </View> 
          </View>
        )}

        <SearchBar placeHolderText="What Pokémon are you looking for?" handlerFunc={searchTextHandler} />

        <FlatList
          data={filteredPokemonList}
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
          onEndReached={fetchMorePokemon}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
        />
      </ScreenWrapper>
      <FilterModal model={modalVisible} setModalHandler={handleOpen} selectedFilter={selectedFilter} filters={filters}/>
    </View>
  );
};

const styles = StyleSheet.create({
  offlineBanner: { 
    position:"absolute",
    bottom:6, 
    zIndex:999, 
    padding:10,
    width:'100%',
    height:65, 
    justifyContent:'center',
    alignContent:'center', 
    alignItems: "center",
  },
  offlineBannerItem:{
    width:"95%",
    height:'100%',
    backgroundColor:'#fff', 
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:9,
    borderWidth:1,
    borderColor:'#dddddd'
  },
  offlineText: {
    color: "red",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingHorizontal:12
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

export default HomeScreen;