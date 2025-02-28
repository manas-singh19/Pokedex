import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useTheme } from '../../theme/themeProviderProps';
import ScreenWrapper from '../../components/screenWrapper';
import Header from '../../components/headers';
import PokemonCard from '../../components/pokemon/card';
import AppIcons from '../../utility/icons'; 
import FilterModal from '../../components/filter';

import SearchBar from '../../components/search';

import { PokemonCardBackgroundColor } from "../../utility/pokemonColor";
  

import usePokemonData from './appcall';

const HomeScreen = () => {
  const { theme } = useTheme();
  
  const { pokemonList, fetchPokemonList } = usePokemonData();

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
   
  
   
  useEffect(()=>{
    console.log("pokemonList: ", pokemonList); 
  },[]);  


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
            data={pokemonList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PokemonCard
                color={
                  item.color ==='bug'?
                  PokemonCardBackgroundColor.bug:
                  item.color ==='dark'?
                  PokemonCardBackgroundColor.dark:
                  item.color ==='dragon'?
                  PokemonCardBackgroundColor.dragon:
                  item.color ==='electric'?
                  PokemonCardBackgroundColor.electric:
                  item.color ==='fairy'?
                  PokemonCardBackgroundColor.fairy:
                  item.color ==='fighting'?
                  PokemonCardBackgroundColor.fighting:
                  item.color ==='fire'?
                  PokemonCardBackgroundColor.fire:
                  item.color ==='flying'?
                  PokemonCardBackgroundColor.flying:
                  item.color ==='ghost'?
                  PokemonCardBackgroundColor.ghost:
                  item.color ==='grass'?
                  PokemonCardBackgroundColor.grass:
                  item.color ==='ground'?
                  PokemonCardBackgroundColor.ground:
                  item.color ==='ice'?
                  PokemonCardBackgroundColor.ice:
                  item.color ==='normal'?
                  PokemonCardBackgroundColor.normal:
                  item.color ==='poison'?
                  PokemonCardBackgroundColor.poison:
                  item.color ==='psychic'?
                  PokemonCardBackgroundColor.psychic:
                  item.color ==='rock'?
                  PokemonCardBackgroundColor.rock:
                  item.color ==='steel'?
                  PokemonCardBackgroundColor.steel:
                  item.color ==='water'?
                  PokemonCardBackgroundColor.water:
                  'orange'
                }
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