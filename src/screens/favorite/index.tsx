import { StyleSheet, Text, View, FlatList } from 'react-native'
import React,{useMemo} from 'react'
import ScreenWrapper from '../../components/screenWrapper';
import HeaderBack from '../../components/headers/headerBack';


import PokemonCard from '../../components/pokemon/card';
import { useTheme } from '../../theme/themeProviderProps';


const FavoriteScreen = () => {
  const {theme} = useTheme();
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
     


  return (
    <ScreenWrapper>
       <HeaderBack title="Pokemon Details" back={true} color={'#ffffff'} normal={true}/>
        <View style={[styles.container, { backgroundColor: theme.isDark?'#000':'#fff'  }]}>
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
})