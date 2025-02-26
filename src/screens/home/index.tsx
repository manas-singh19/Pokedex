import { StyleSheet, Text, View, FlatList } from 'react-native';
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
      ability: [{ title: "water", color: "#4A90DA", abilityIcon:"water"  }]
    },
    {
      id: 2,
      color: "#8BBE8A",
      titleCode: "#002",
      name: "Venusaur",
      image: "https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_1280.png",
      ability: [{ title: "gress", color: "#62B957",abilityIcon:"gress" }, { title: "Poison", color: "#A552CC", abilityIcon:"posion" }]
    }, 
    {
      id: 4,
      color: "#FFA756",
      titleCode: "#004",
      name: "Pikachu",
      image: "https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_1280.png",
      ability: [{ title: "Electric", color: "#FD7D24", abilityIcon:"electric" }]
    }, 
  ]);


  

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScreenWrapper>
        <Header title="" isIcon={true} iconsType={['filter', 'search']} />
        <View style={styles.contentContainer}>
          <AppIcons.Title width={180} height={50} fill="black" />
          <Text style={styles.description}>
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