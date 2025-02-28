import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useTheme } from '../../theme/themeProviderProps';
import ScreenWrapper from '../../components/screenWrapper';
import Header from '../../components/headers';
import PokemonCard from '../../components/pokemon/card';
import AppIcons from '../../utility/icons'; 
import FilterModal from '../../components/filter';

import SearchBar from '../../components/search';

const HomeScreen = () => {
  const { theme } = useTheme();
  

  const pokemonData = useMemo(
    () => [
      {
        id: 1,
        color: "#58ABF6",
        titleCode: "#001",
        name: "Wartortle",
        image: "https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_1280.png", 
        ability: ['water']
      },
      {
        id: 2,
        color: "#8BBE8A",
        titleCode: "#002",
        name: "Venusaur",
        image: "https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_1280.png", 
        ability: ['grass', 'poison']
      }, 
      {
        id: 3,
        color: "#F2CB55",
        titleCode: "#004",
        name: "Pikachu",
        image: "https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_1280.png", 
        ability: ['electric']
      } 
    ],
    []
  );


  const [model,setmodal] = useState<boolean>(false);
  const handleOpen = ()=>{
    setmodal(!model);
  }

  const [filters,setFilters] = useState<string>("");
  const selectedFilter = (data:any)=>{
    setFilters(data);
    setmodal(false);
  }

  const [search,setSearch] = useState('');
  const searchTextHandler = (data:any)=>{
    setSearch(data);
  }

  


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScreenWrapper>
        <Header title="" isIcon={true} iconsType={['switch', 'fav', 'filter']} filterOpen={handleOpen}/>

        <View style={styles.contentContainer}>
          {theme.isDark ? (
            <AppIcons.TitleWhite width={180} height={50} fill="white" />
          ) : (
            <AppIcons.Title width={180} height={50} fill="black" />
          )}

          <Text style={[styles.description, { color: theme.isDark ? "#fff" : "#000" }]}>
           Search for Pokémon by name or using the National Pokédex number.
          </Text>

          <SearchBar placeHolderText="What Pokémon are you looking for?" handlerFunc={searchTextHandler}/>

          <FlatList
            data={pokemonData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PokemonCard
                color={item.color}
                titleCode={item.titleCode}
                name={item.name}
                image={item.image}
                ability={item.ability} 
                id={item.id} 
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScreenWrapper>

      <FilterModal model={model} setModalHandler={handleOpen} selectedFilter={selectedFilter}/>

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
  sheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});