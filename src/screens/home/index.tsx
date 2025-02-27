import { StyleSheet, Text, View, FlatList,Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../theme/themeProviderProps';
import ScreenWrapper from '../../components/screenWrapper';
import Header from '../../components/headers';
import PokemonCard from '../../components/pokemon/card';
import AppIcons from '../../utility/icons';

const HomeScreen = () => {
  const { theme } = useTheme();

  const [pokemonData, setPokemonData] = useState([
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
      ability: ['grass','poison']
    }, 
    {
      id: 4,
      color: "#F2CB55",
      titleCode: "#004",
      name: "Pikachu",
      image: "https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_1280.png", 
      ability:['electric']
    }, 
  ]);


  

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScreenWrapper>
        <Header title="" isIcon={true} iconsType={['switch', 'sort', 'filter', ]} />
        <View style={styles.contentContainer}> 
          {
            theme.isDark?
            <AppIcons.TitleWhite width={180} height={50} fill="black" />
            :
            <AppIcons.Title width={180} height={50} fill="black" />
          }
          <Text style={[styles.description,{color:theme.isDark?"#fff":'#000'}]}>
            Search for Pokémon by name or using the National Pokédex number.
          </Text>
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
      
        

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the full height
    width:'100%',
    height:'100%',
    backgroundColor:'red'
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  description: {
    color: '#000000',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20, // Adds space at the bottom for better scrolling experience
  }
});