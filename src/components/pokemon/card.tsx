import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AppIcons from '../../utility/icons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../theme/themeProviderProps';

 

interface PokemonCardProps {
  id: number;
  color: string;
  titleCode: string;
  name: string;
  image: string;
  //ability: Ability[];
  ability:string[];
}

const PokemonCard: React.FC<PokemonCardProps> = memo(({ id, color, titleCode, name, image, ability }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: color, position:'relative', overflow:'hidden'}]} 
      onPress={() => navigation.navigate('DetailsScreen', { id, name, color, ability })}
    >
      <AppIcons.Pokeball width={200} height={160} fill="white" style={{position:'absolute', right:-80}}/>
      <AppIcons.Pattern width={100}  height={100} fill="white" style={{position:'absolute', left:130, top:-40}}/>
      <View style={styles.itemDetails}>
        <Text style={[styles.titleCode, {fontWeight:theme.theme.fontWeights.bold}]}>{titleCode}</Text>
        <Text style={[styles.name,{fontWeight:theme.theme.fontWeights.extraBold}]}>{name}</Text>
        <View style={styles.itemDetailsInner}>
          {ability.map((item, index) => ( 
            <>
              {
                item == 'bug'? <AppIcons.BugType width={60} fill="white"/>:
                item == 'dark'? <AppIcons.DarkType width={60} fill="white"/>:
                item == 'dragon'? <AppIcons.DragonType width={60} fill="white"/>:
                item == 'electric'? <AppIcons.ElectricType width={60} fill="white"/>:
                item == 'fairy'? <AppIcons.FairyType width={60} fill="white"/>:
                item == 'fighting'? <AppIcons.FightingType width={60} fill="white"/>:
                item == 'fire'? <AppIcons.FireType width={60} fill="white"/>:
                item == 'flying'? <AppIcons.FlyingType width={60} fill="white"/>:
                item == 'ghost'? <AppIcons.GhostType width={60} fill="white"/>:
                item == 'grass'? <AppIcons.GrassType width={60} fill="white"/>:
                item == 'ice'? <AppIcons.IceType width={60} fill="white"/>:
                item == 'normal'? <AppIcons.NormalType width={60} fill="white"/>:
                item == 'poison'? <AppIcons.PoisonType width={60} fill="white"/>:
                item == 'psychic'? <AppIcons.PsychicType width={60} fill="white"/>: 
                item == 'rock'? <AppIcons.RockType width={60} fill="white"/>: 
                item == 'steel'? <AppIcons.SteelType width={60} fill="white"/>:
                item == 'water'? <AppIcons.WaterType width={60} fill="white"/>:  
                null
              }
            </>
          ))}
        </View>
      </View>
      <View style={styles.itemImage}>
        {image ? <Image source={{ uri: image }} style={styles.pokemonImage} /> : null}
      </View>
    </TouchableOpacity>
  );
});

export default memo(PokemonCard);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 140,
    borderRadius: 9,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 14
  },
  itemDetails: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemImage: {
    width: '40%', 
    justifyContent: 'flex-end',
    alignItems:'center',
    alignContent:'center'
  },
  pokemonImage: {
    width: 120,
    height: 110,
    resizeMode: 'cover',
    marginTop:10, 
  },
  titleCode: {
    fontSize: 13,
    fontWeight: '500',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff'
  },
  itemDetailsInner: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
  },
  abilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  abilityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});