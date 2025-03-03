import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React,{useMemo, useEffect, useState, useCallback} from 'react'
import ScreenWrapper from '../../components/screenWrapper';
import HeaderBack from '../../components/headers/headerBack';
import { PokemonCardBackgroundColor } from "../../utility/pokemonColor";

import PokemonCard from '../../components/pokemon/card';
import { useTheme } from '../../theme/themeProviderProps';

import AsyncStorage from '@react-native-async-storage/async-storage';

import getFavPokemonData from './apiCall';

const FavoriteScreen = () => {
  const {theme} = useTheme();

  const [favPokemon,setfavPokemon] = useState([]);

  const { pokemonList, isLoading } = getFavPokemonData(favPokemon);
  
   // Memoized color function to prevent unnecessary renders
   type PokemonType = keyof typeof PokemonCardBackgroundColor;
   const getColor = useCallback((type: PokemonType) => {
     return PokemonCardBackgroundColor[type] || "orange";
   }, []);
 
  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favoritePokemon');
      if (storedFavorites) {
        console.log("JSON.parse(storedFavorites):--- ",JSON.parse(storedFavorites));
        setfavPokemon(JSON.parse(storedFavorites));
      }
    };
    loadFavorites();
  }, []); 

  return (
    <ScreenWrapper>
       <HeaderBack title="Favourites" back={true} color={'#ffffff'} normal={true}/>
        <View style={[styles.container, { backgroundColor: theme.isDark?'#000':'#fff'  }]}>
          {
            pokemonList.length>0?
            <FlatList
              data={pokemonList}
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
               ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
            />  
            :
            <View style={styles.nodata}>
                <Text style={[{
                  fontSize:theme.fonts.b3,
                  fontWeight:theme.fontWeights.normal, 
                },theme.isDark?{color:"#fff"}:{color:'#000'}]}>No Favourites yet.</Text>
            </View>     
          }
            
        </View> 
    </ScreenWrapper>
  )
}

export default FavoriteScreen;

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1, 
    },
    listContent: { 
        padding:8,
        paddingBottom: 20,
    },
    nodata:{
      width:'100%', 
      height:60,  
      justifyContent:'center',
      alignContent: 'center',
      alignItems:'center'
    }
})